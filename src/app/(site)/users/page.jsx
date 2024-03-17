'use client'

import React from 'react'
import { useFormik } from 'formik'

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { RefreshCcw, UserPlus } from 'lucide-react'

export default function UsersPage() {
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
      <div className='container py-5 shadow-lg my-4 border rounded-md'>
        {/* Detail, Search Field, Total */}
        <section className=''>
          <div>
            {/* Header and Add, Refresh Button */}
            <div className='flex justify-between'>
              <h1 className='text-2xl font-semibold'>Users</h1> 
              {/* Add and Refresh Button */}
              <div className='flex gap-2'>
                <Button className="gap-2 text-md" onClick={() => console.log('aku ke refresh nih ')}><RefreshCcw size={22} />Refresh</Button>
                <Button className="gap-2 text-md bg-success hover:bg-success-hover" onClick={() => console.log('aku ke add nih')}><UserPlus size={22} />Add Users</Button>
              </div>
            </div>
            {/* Total Account and Search */}
            <div className='flex justify-between'>
              {/* Total Account in Users */}
              <p className='text-md font-normal mt-3 pt-3'>Total: 0 users</p>
              {/* Search Components */}
              <form className='relative mt-3 pt-1' onSubmit={formik.handleSubmit}>
                <Input id='search' name='search' type='text' className="border-solid border-2  border-gray-500 rounded-lg mt-3 mx-3 px-2" style={{'height' : '2.25rem'}} placeholder='search and then press enter...' value={formik.values.search} onChange={formik.handleChange} />
              </form>
            </div>
          </div>
        </section>
        {/* Table */}
        <section>
          <Table className="rounded-md border my-5">
            <TableHeader className="text-center items-center bg-primary">
              <TableRow>
                <TableHead className="text-primary-foreground">Name</TableHead>
                <TableHead className="text-primary-foreground">Username</TableHead>
                <TableHead className="text-primary-foreground">Status</TableHead>
                <TableHead className="text-primary-foreground">Containers</TableHead>
                <TableHead className="text-primary-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {/* <TableCell></TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </div>
    </main>
  )
}