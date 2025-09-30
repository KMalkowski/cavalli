'use client'

import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useState, useCallback } from 'react'

/**
 * Hook for managing favorites with optimistic updates
 */
export function useFavorites() {
  const favorites = useQuery(api.favorites.getUserFavorites, {}) || []
  const toggleFavorite = useMutation(api.favorites.toggle)

  // Optimistic state for immediate UI updates
  const [optimisticFavorites, setOptimisticFavorites] = useState<
    Set<Id<'horses'>>
  >(new Set())
  const [pendingToggles, setPendingToggles] = useState<Set<Id<'horses'>>>(
    new Set()
  )

  // Create a set of favorite horse IDs for fast lookup
  const favoriteIds = new Set([
    ...(favorites
      ?.filter((horse) => horse !== null)
      .map((horse) => horse._id) || []),
    ...optimisticFavorites,
  ])

  const toggleFavoriteOptimistic = useCallback(
    async (horseId: Id<'horses'>) => {
      const isCurrentlyFavorite = favoriteIds.has(horseId)

      // Optimistic update
      if (isCurrentlyFavorite) {
        setOptimisticFavorites((prev) => {
          const newSet = new Set(prev)
          newSet.delete(horseId)
          return newSet
        })
      } else {
        setOptimisticFavorites((prev) => new Set([...prev, horseId]))
      }

      setPendingToggles((prev) => new Set([...prev, horseId]))

      try {
        const newFavoriteState = await toggleFavorite({ horseId })

        // If the optimistic update was wrong, correct it
        if (newFavoriteState !== !isCurrentlyFavorite) {
          setOptimisticFavorites((prev) => {
            const newSet = new Set(prev)
            if (newFavoriteState) {
              newSet.add(horseId)
            } else {
              newSet.delete(horseId)
            }
            return newSet
          })
        }
      } catch (error) {
        console.error('Failed to toggle favorite:', error)
        // Revert optimistic update on error
        setOptimisticFavorites((prev) => {
          const newSet = new Set(prev)
          if (isCurrentlyFavorite) {
            newSet.add(horseId)
          } else {
            newSet.delete(horseId)
          }
          return newSet
        })

        // If it's an authentication error, you might want to redirect to login
        if (error instanceof Error && error.message.includes('authenticated')) {
          // Optionally show a toast or redirect to login
          console.warn('Please log in to add favorites')
        }
      } finally {
        setPendingToggles((prev) => {
          const newSet = new Set(prev)
          newSet.delete(horseId)
          return newSet
        })
      }
    },
    [favorites, toggleFavorite, favoriteIds]
  )

  const isFavorite = useCallback(
    (horseId: Id<'horses'>) => {
      return favoriteIds.has(horseId)
    },
    [favoriteIds]
  )

  const isPending = useCallback(
    (horseId: Id<'horses'>) => {
      return pendingToggles.has(horseId)
    },
    [pendingToggles]
  )

  return {
    favorites,
    isFavorite,
    toggleFavorite: toggleFavoriteOptimistic,
    isPending,
    favoritesCount: favoriteIds.size,
  }
}
