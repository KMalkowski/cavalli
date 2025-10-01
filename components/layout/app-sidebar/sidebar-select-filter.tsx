'use client'
import * as React from 'react'
import { Check, ChevronRight } from 'lucide-react'
import {
  parseAsArrayOf,
  parseAsString,
  parseAsInteger,
  useQueryState,
} from 'nuqs'

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

type SidebarSelectFilterProps = {
  name: string
  items: string[]
  paramKey: string
  defaultOpen?: boolean
}

export function SidebarSelectFilter({
  name,
  items,
  paramKey,
  defaultOpen = false,
}: SidebarSelectFilterProps) {
  const [selected, setSelected] = useQueryState(
    paramKey,
    parseAsArrayOf(parseAsString).withDefault([])
  )
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const selectedCount = selected.length

  const toggleItem = React.useCallback(
    (value: string) => {
      setSelected((current) =>
        (current ?? []).includes(value)
          ? (current ?? []).filter((v) => v !== value)
          : [...(current ?? []), value]
      )
      if (page > 1) {
        setPage(1)
      }
    },
    [setSelected, setPage, page]
  )

  return (
    <>
      <SidebarGroup className="py-0">
        <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
          <SidebarGroupLabel className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm">
            <div className="flex w-full items-center gap-2">
              <CollapsibleTrigger className="flex flex-1 items-center">
                <span>{name}</span>
                {selectedCount > 0 && (
                  <span className="text-muted-foreground ml-2 text-xs">
                    ({selectedCount})
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
                  <SidebarMenuButton
                    onClick={() => {
                      setSelected([])
                      if (page > 1) {
                        setPage(1)
                      }
                    }}
                    data-active={selectedCount === 0}
                    aria-pressed={selectedCount === 0}
                  >
                    <div
                      data-active={selectedCount === 0}
                      className="group/calendar-item border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border"
                    >
                      <Check className="hidden size-3 group-data-[active=true]/calendar-item:block" />
                    </div>
                    Wszystkie
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {items.map((item) => {
                  const isActive = selected.includes(item)
                  return (
                    <SidebarMenuItem key={item}>
                      <SidebarMenuButton
                        onClick={() => toggleItem(item)}
                        data-active={isActive}
                        aria-pressed={isActive}
                      >
                        <div
                          data-active={isActive}
                          className="group/calendar-item border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border"
                        >
                          <Check className="hidden size-3 group-data-[active=true]/calendar-item:block" />
                        </div>
                        {item}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>
      <SidebarSeparator className="mx-0" />
    </>
  )
}
