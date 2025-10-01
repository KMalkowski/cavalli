'use client'
import * as React from 'react'
import { Check, ChevronRight } from 'lucide-react'
import { parseAsFloat, parseAsInteger, useQueryState } from 'nuqs'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'

type SidebarRangeFilterProps = {
  name: string
  minParamKey: string
  maxParamKey: string
  placeholderMin?: string
  placeholderMax?: string
  defaultOpen?: boolean
  integer?: boolean
}

export function SidebarRangeFilter({
  name,
  minParamKey,
  maxParamKey,
  placeholderMin,
  placeholderMax,
  defaultOpen = false,
  integer = true,
}: SidebarRangeFilterProps) {
  const [minValue, setMinValue] = useQueryState(
    minParamKey,
    (integer ? parseAsInteger : parseAsFloat).withDefault(0)
  )
  const [maxValue, setMaxValue] = useQueryState(
    maxParamKey,
    (integer ? parseAsInteger : parseAsFloat).withDefault(0)
  )
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const onChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.trim()
    if (raw === '') {
      setMinValue(null)
      if (page > 1) {
        setPage(1)
      }
      return
    }
    const parsed = Number(raw)
    if (!Number.isNaN(parsed)) {
      setMinValue(parsed)
      if (page > 1) {
        setPage(1)
      }
    }
  }

  const onChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.trim()
    if (raw === '') {
      setMaxValue(0)
      setPage(1)
      return
    }
    const parsed = Number(raw)
    if (!Number.isNaN(parsed)) {
      setMaxValue(parsed)
      if (page > 1) {
        setPage(1)
      }
    }
  }

  const anyActive = minValue !== 0 || maxValue !== 0

  return (
    <>
      <SidebarGroup className="py-0">
        <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
          <SidebarGroupLabel className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm">
            <div className="flex w-full items-center gap-2">
              <CollapsibleTrigger className="flex flex-1 items-center">
                <span>{name}</span>
                {anyActive && (
                  <span className="text-muted-foreground ml-2 text-xs">
                    <Check className="mb-0.5 inline size-3" />
                  </span>
                )}
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </div>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div className="flex w-full items-center gap-2">
                    <Input
                      inputMode={integer ? 'numeric' : 'decimal'}
                      type="text"
                      placeholder={placeholderMin ?? 'Min'}
                      value={minValue ?? ''}
                      onChange={onChangeMin}
                      aria-label={`${name} min`}
                    />
                    <span className="text-muted-foreground text-xs">—</span>
                    <Input
                      inputMode={integer ? 'numeric' : 'decimal'}
                      type="text"
                      placeholder={placeholderMax ?? 'Max'}
                      value={maxValue ?? ''}
                      onChange={onChangeMax}
                      aria-label={`${name} max`}
                    />
                  </div>
                </SidebarMenuItem>
                {anyActive && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => {
                        setMinValue(0)
                        setMaxValue(0)
                        if (page > 1) {
                          setPage(1)
                        }
                      }}
                    >
                      Wyczyść
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>
      <SidebarSeparator className="mx-0" />
    </>
  )
}
