'use client'

import Link from 'next/link'
import { LayoutGrid, LogOut, Plus, User, FileText, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function NavbarAuthControls() {
  const { user, logout } = useAuth()
  const createTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)

  return (
    <>
      {createTasks.length ? (
        <div className="pointer-events-none fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-[100] sm:right-6 sm:bottom-[max(2rem,env(safe-area-inset-bottom))]">
          <div className="pointer-events-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  aria-label="Create new post"
                  className="h-14 w-14 rounded-full border border-black/10 bg-[#ff4d2e] text-white shadow-[0_12px_40px_rgba(255,77,46,0.45)] transition hover:bg-[#e63e22] hover:shadow-[0_16px_48px_rgba(255,77,46,0.5)] focus-visible:ring-2 focus-visible:ring-[#ff4d2e]/40"
                >
                  <Plus className="h-7 w-7" strokeWidth={2.25} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end" sideOffset={10} className="w-56">
                {createTasks.map((task) => {
                  const Icon = taskIcons[task.key] || LayoutGrid
                  return (
                    <DropdownMenuItem key={task.key} asChild>
                      <Link href={`/create/${task.key}`}>
                        <Icon className="mr-2 h-4 w-4" />
                        Create {task.label}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : null}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full text-foreground hover:bg-muted">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Account menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center gap-3 p-3">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium">{user?.name}</span>
              <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              logout()
            }}
            className="cursor-pointer font-medium text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
