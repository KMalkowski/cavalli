'use client'

import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/use-favorites'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
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

interface HeartButtonProps {
  horseId: Id<'horses'>
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showCount?: boolean
}

function AuthenticatedHeartButton({
  horseId,
  variant = 'outline',
  size = 'icon',
  className,
  showCount = false,
}: HeartButtonProps) {
  const { isFavorite, toggleFavorite, isPending } = useFavorites()

  const isHorseFavorite = isFavorite(horseId)
  const isHorsePending = isPending(horseId)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(horseId)
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isHorsePending}
      className={cn(
        'cursor-pointer transition-all duration-200',
        isHorseFavorite && 'border-red-500 text-red-500 hover:bg-red-50',
        isHorsePending && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <Heart
        className={cn(
          'h-4 w-4 transition-all duration-200',
          isHorseFavorite && 'fill-current'
        )}
      />
      {showCount && isHorseFavorite && (
        <span className="ml-1 text-xs">
          {/* This could show a count if needed */}
        </span>
      )}
    </Button>
  )
}

function UnauthenticatedHeartButton({
  variant = 'outline',
  size = 'icon',
  className,
}: Omit<HeartButtonProps, 'horseId' | 'showCount'>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            'cursor-pointer transition-all duration-200',
            className
          )}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogTitle className="sr-only">Zaloguj się</DialogTitle>
        <DialogDescription className="sr-only">
          Zaloguj się, aby dodać konia do ulubionych
        </DialogDescription>
        <Auth />
      </DialogContent>
    </Dialog>
  )
}

export function HeartButton(props: HeartButtonProps) {
  return (
    <>
      <Authenticated>
        <AuthenticatedHeartButton {...props} />
      </Authenticated>
      <Unauthenticated>
        <UnauthenticatedHeartButton
          variant={props.variant}
          size={props.size}
          className={props.className}
        />
      </Unauthenticated>
    </>
  )
}
