'use client'

import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/use-favorites'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog'
import { Auth } from '@/components/auth/auth'
import { useState } from 'react'

interface HeartButtonProps {
  horseId: Id<'horses'>
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showCount?: boolean
}

export function HeartButton({
  horseId,
  variant = 'outline',
  size = 'icon',
  className,
  showCount = false,
}: HeartButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const currentUser = useQuery(api.auth.getCurrentUser)
  const { isFavorite, toggleFavorite, isPending } = useFavorites()

  const isHorseFavorite = isFavorite(horseId)
  const isHorsePending = isPending(horseId)
  const isAuthenticated = !!currentUser

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      setIsDialogOpen(true)
      return
    }

    toggleFavorite(horseId)
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        disabled={isAuthenticated && isHorsePending}
        className={cn(
          'transition-all duration-200',
          isAuthenticated &&
            isHorseFavorite &&
            'border-red-500 text-red-500 hover:bg-red-50',
          isAuthenticated && isHorsePending && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <Heart
          className={cn(
            'h-4 w-4 transition-all duration-200',
            isAuthenticated && isHorseFavorite && 'fill-current'
          )}
        />
        {showCount && isAuthenticated && isHorseFavorite && (
          <span className="ml-1 text-xs">
            {/* This could show a count if needed */}
          </span>
        )}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent showCloseButton={false}>
          <DialogTitle className="sr-only">Zaloguj się</DialogTitle>
          <DialogDescription className="sr-only">
            Zaloguj się, aby dodać konia do ulubionych
          </DialogDescription>
          <Auth />
        </DialogContent>
      </Dialog>
    </>
  )
}
