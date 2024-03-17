'use client'

import React from 'react'
import NavigationMenuSetup from '../utilities/NavigationMenuSetup'
import NavigationMenuBlast from '../utilities/NavigationMenuBlast'


export default function NavbarComponents() {
  return (
    <>
      <section className='shadow-md shadow-zinc-600/60 px-5 py-3 flex flex-wrap w-full'>
        <NavigationMenuSetup />
        <NavigationMenuBlast />

      </section>

    </>
  )
  
}