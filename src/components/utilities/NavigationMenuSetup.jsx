'use strict'

import React, { forwardRef } from 'react'
import Link from 'next/link'

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuList } from '../ui/navigation-menu'
import { cn } from '@/lib/utils'

import { Settings } from 'lucide-react'

const setupMenu = [
  {
    title: 'Accounts',
    href: '/accounts'
  },
  {
    title: 'Container',
    href: '/containers'
  },
  {
    title: 'Avatar Container',
    href: '/avatarContainer'
  },
  {
    title: 'Users',
    href: '/users'
  }
]

export default function NavigationMenuSetup() {

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-success hover:text-white focus:bg-success focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-success data-[active]:text-white data-[state=open]:bg-success data-[state=open]:text-white dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50 dark:data-[active]:bg-slate-800/50 dark:data-[state=open]:bg-slate-800/50 gap-2" style={{'width' : '170px'}}><Settings size={27} className='text-orange-500 font-bold' />Setup</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='font-medium w-[170px]'>
                {
                  setupMenu.map((setup) => (
                    <ListItem
                      key={setup.title}
                      title={setup.title}
                      href={setup.href}
                      className={'hover:bg-success hover:text-white'}
                    >

                    </ListItem>
                  ))
                }
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}

const ListItem = forwardRef((props, ref) => {
  // console.log(props, ref)
  const { className, title, ...restProps } = props
  // console.log(...restProps)
  return (
    <>
      <li>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-green-500 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...restProps}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </li>
    </>
  )
})

ListItem.displayName = "ListItem";