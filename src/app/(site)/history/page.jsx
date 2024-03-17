'use client'

import React from 'react'


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useFormik } from 'formik'

import { Search } from 'lucide-react'

export default function HistoryPage() {

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    onSubmit: async (values) => {
      console.log(values)
    }
  })
  return (
    <main>
      <div className='container py-5 shadow-lg my-4 border rounded-sm'>
        {/* Detail, Total Account, Select Container, Search (if added) */}
        <section className=''>
          <div>
            <h1 className='text-2xl font-semibold'>Accounts History</h1>
            <div className='flex justify-between'>
              {/* Total Account */}
              <p className='text-md font-normal mt-3'>Total: 0 account</p>
              {/* Search Components */}
              <form className='relative' onSubmit={formik.handleSubmit}>
                <Input id='search' name='search' type='text' className="border-solid border-2 border-gray-500 rounded-lg mt-3 mx-3 px-2" style={{'height' : '2.25rem'}} placeholder='search..' value={formik.values.search} onChange={formik.handleChange} />
                <Search size={20} className='absolute top-5 end-1 cursor-pointer' onClick={formik.handleSubmit} />
              </form>
            </div>
          </div>
          {/* Select Container Components */}
          <div className='flex flex-wrap gap-2 mt-3'>
            <Select onValueChange={() => console.log('valuee ke ganti containernya')}>
              <SelectTrigger className='w-auto'>
                <SelectValue placeholder="All Container" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Container</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>
        {/* Table */}
        <section>
            <Table className="rounded-md border my-5">
              <TableHeader className="text-center items-center bg-primary">
                <TableRow>
                  <TableHead className="text-white">Container ID</TableHead>
                  <TableHead className="text-white">Phone Number</TableHead>
                  <TableHead className="text-white">Account Number</TableHead>
                  <TableHead className="text-white">Success Blast</TableHead>
                  <TableHead className="text-white">Last Blast</TableHead>
                  <TableHead className="text-white">Inactive Date</TableHead>
                  <TableHead className="text-white">Reason</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
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