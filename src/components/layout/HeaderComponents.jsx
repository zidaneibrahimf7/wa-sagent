'use client'

import React from 'react'
import Image from 'next/image'

import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

import numeral from 'numeral'

import { RotateCcw, LogOut, Power } from 'lucide-react'

const handleRetry = () => {
  console.log('aku ke retryy')
}

export default function HeaderComponents() {

  return (
    <>
    <main className='w-full flex flex-wrap justify-between items-center py-2 shadow-sm shadow-slate-500'>
      <div className='flex flex-wrap gap-2 p-1 px-3 mx-3 py-3'>
          <Image
            src="/whatsapp-social-media.svg"
            alt="whatsapp sagent"
            width={33}
            height={24}
            priority
          />
          <h4 className='text-xl font-semibold mt-0.5'>SAGENT Account Management</h4>
      </div>
      <div className='flex flex-wrap gap-5 mx-3'>
          <div className=''>
            <div className='flex flex-wrap gap-2 justify-center items-center'>
              <p className='text-sm'>Total Blast in progress:</p>
              {/* <span className='bg-success px-2 mb-1 mt-1 rounded-lg text-sm text-white justify-center'>{numeral(summary.inProgress || 0).format('0,0').replaceAll(',', '.')}</span> */}
              <span className='bg-success px-2 mb-1 mt-1 rounded-lg text-sm text-white justify-center'>90</span>
              <button className="text-black px-2 mb-1 mt-1 rounded-lg bg-white font-bold hover:bg-slate-300 hover:text-white" onClick={handleRetry}><RotateCcw size={15} className='flex-none my-1 text-sky-900' /></button>
            </div>
            <span className='text-xs text-slate-400 mb-1'>Delay between messages: 90 - 90 seconds </span> 
          </div>
          <div className='flex justify-center gap-2 pr-3 mr-1'>
            <p className='mb-3 mt-2 font-light'>Administrator</p>
            <Popover>
              <Avatar>
                <PopoverTrigger asChild className='cursor-printer'>
                  <AvatarImage src="/profile-min.png" alt="MKI" />
                </PopoverTrigger>
                <PopoverContent className="w-[7rem]">
                  <AlertDialog>
                    <AlertDialogTrigger asChild><Button variant="destructive" className="mb-1 rounded-lg px-3 text-sm flex gap-1">Logout</Button></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure want to logout?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone and will permanently close from your account.
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <Button variant="destructive" className="" onClick={() => console.log('aku ke klikk')}>Logout</Button>
                        </AlertDialogFooter>
                      </AlertDialogHeader>
                    </AlertDialogContent>
                  </AlertDialog>
                </PopoverContent>
                <AvatarFallback>MKI</AvatarFallback>
              </Avatar>
            </Popover>
          </div>
      </div>  
    </main>
    </>
  )
}