'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { filters } from './app-sidebar'

export function ResetFiltersButton() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCount = Array.from(searchParams.keys()).filter((key) =>
    Object.keys(filters).includes(key)
  ).length

  const showCount = activeCount > 0

  if (!showCount) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        router.replace(pathname)
      }}
      aria-label="Wyczyść filtry"
      className="text-muted-foreground hover:text-foreground"
    >
      <X className="mr-1 size-4" />
      Wyczyść
      {showCount && <span className="ml-1 text-xs">({activeCount})</span>}
    </Button>
  )
}

export default ResetFiltersButton
