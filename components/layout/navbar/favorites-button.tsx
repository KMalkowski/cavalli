'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/use-favorites'
import { Authenticated, Unauthenticated } from 'convex/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Auth } from '@/components/auth/auth'
import { useState } from 'react'

function AuthenticatedFavoritesButton() {
  const { favoritesCount } = useFavorites()

  return (
    <Link href="/favorites">
      <Button variant="outline" size="icon" className="relative">
        <Heart className="h-4 w-4" />
        {favoritesCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {favoritesCount > 99 ? '99+' : favoritesCount}
          </span>
        )}
      </Button>
    </Link>
  )
}

function UnauthenticatedFavoritesButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Heart className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogTitle className="sr-only">Zaloguj się</DialogTitle>
        <DialogDescription className="sr-only">
          Zaloguj się, aby przeglądać swoje ulubione konie
        </DialogDescription>
        <Auth />
      </DialogContent>
    </Dialog>
  )
}

export function FavoritesButton() {
  return (
    <>
      <Authenticated>
        <AuthenticatedFavoritesButton />
      </Authenticated>
      <Unauthenticated>
        <UnauthenticatedFavoritesButton />
      </Unauthenticated>
    </>
  )
}
