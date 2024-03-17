'use client'

import HeaderComponents from "@/components/layout/HeaderComponents"
import NavbarComponents from "@/components/layout/NavbarComponents"

export default function DashboardLayout({ children }) {
  
  return (
    <>
      <HeaderComponents />
      <NavbarComponents />
      {children}
    </>
  )
}