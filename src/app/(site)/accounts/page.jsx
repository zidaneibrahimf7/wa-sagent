'use client'

import React from "react"
import { useRouter } from 'next/navigation'

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

import { History, UserPlus } from 'lucide-react'
import { Label } from "@/components/ui/label"

export default function AccountsPages() {
  const router = useRouter()

  const handleHistoryButton = () => {
    router.push('/history')
  }

  return (
    <main>
      <div className="container py-5 shadow-lg my-4 border rounded-sm">
        {/* Select, Detail, History Button, Add Account Button */}
        <section className="flex justify-between mb-2">
          <div>
            <h1 className="text-2xl font-semibold">Accounts</h1>
            {/* Select Container */}
            <div className="flex flex-wrap gap-2">
              <Select onValueChange={() => console.log('aku value change select')}>
                <SelectTrigger className="w-auto mt-4"><SelectValue placeholder="All Container" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All" key="All">All Container</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* History Button */}
            <>
              <Button variant="secondary" onClick={handleHistoryButton} className="bg-warning text-white text-md gap-1 hover:bg-warning-hover"><History size={22} />History</Button>
            </>
            {/* Add Account Button */}
            <>
              <Dialog onOpenChange={() => console.log('aku ke open dialog')}>
                <DialogTrigger asChild>
                  <Button className="bg-success hover:bg-success-hover text-white gap-1 pb-2 text-md"><UserPlus size={22} />Add Account</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Account</DialogTitle>
                  </DialogHeader>
                  <Label htmlFor="selectContainer">Containers</Label>
                  <Select name='selectContainer' onValueChange={() => console.log('aku keselectt containers')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose container for new account" />
                      <SelectContent className="max-h-[210px] overflow-y-scroll" data-scrollable>
                        <SelectItem value={'ContainerXIX'} key={'ContainerX'}>Container XIX</SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </DialogContent>
              </Dialog>
            </>
          </div>
        </section>
        {/* Total Account */}
        <>
          <p className="text-md font-normal mt-3">Total: 0 account</p>
        </>
        {/*Table  */}
        <section>
          <Table className="rounded-md border my-5">
            <TableHeader className="text-center items-center bg-primary">
              <TableRow>
                <TableHead className="text-white">Account Name</TableHead>
                <TableHead className="text-white">Phone Number</TableHead>
                <TableHead className="text-white">Container ID</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Success Blast</TableHead>
                <TableHead className="text-white">Last Blast</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-slate-300">
                {/* <TableCell></TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
        </section>
          {/* Pagination */}
        <div>
          
        </div>
      </div>
    </main>
  )
}