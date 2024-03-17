'use client'

import React, { forwardRef } from "react"
import Link from 'next/link'

import {cn} from '@/lib/utils'

import { Send } from 'lucide-react'

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuList } from '../ui/navigation-menu'


const blastMenu = [ 
  {
    title: 'Analytics',
    href: '/analytics'
  },
  {
    title: 'Report',
    href: '/report'
  }
]

export default function NavigationMenuBlast() {

  return (
    <>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-success hover:text-white focus:bg-success focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-success data-[active]:text-white data-[state=open]:bg-success data-[state=open]:text-white dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50 dark:data-[active]:bg-slate-800/50 dark:data-[state=open]:bg-slate-800/50 gap-2" style={{'width' : '170px'}}><Send size={27} className='text-orange-900 font-bold' />Setup</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='font-medium w-[170px]'>
              {
                blastMenu.map((blast) => (
                  <ListItem
                    key={blast.title}
                    title={blast.title}
                    href={blast.href}
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
  const { className, title, ...restProps } = props
  
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

ListItem.displayName = 'ListItem'