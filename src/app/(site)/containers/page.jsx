'use client'

import React, {useState, useEffect} from "react"
import { useFormik } from "formik"

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'

import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react"

import moment from 'moment'

import Loading from "@/components/Loading"

export default function ContainersPage() {
  const [container, setContainer] = useState({})
  const [count, setCount] = useState(1)
  const [currentPage, setPage] = useState(1)
  const [limit, setLimit] = useState(20)

  const [searchAccountListContainer, setSearchAccountListContainer] = useState('')

  const getContainerList = async (page) => {
    if (!page) page = currentPage
    
    let offset = (page === 1) ? 0 : ((page - 1) * limit)
    let response = await fetch('/api/Container?act=list&offset=' + (searchAccountListContainer ? 0 : offset) + '&limit=' + limit)
    const data = await response.json()
    
    // console.log(data, 'datss')
    const { code, content } = data
    
    if (code === 0 && content.count) {
      setContainer(content.results)
      setCount(content.count)
      return content.results
    }

    setPage(prev => prev ? page : prev)
  }

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    onSubmit: async (values) => {
      console.log(values)
    }
  })

  useEffect(() => {
    getContainerList()
  }, [])

  return (
    <main>
      <div className="container py-5 shadow-lg my-4 border rounded-md">
        {/* Detail, Search Field, Total */}
        <section className="">
          <div>
            <h1 className="text-2xl font-semibold">Containers</h1>
            {
              container.length ? 
                <>
                
                </>
                :
                <>
                  {
                    instance.length === 0 ?
                      <div className='flex items-center justify-center'>Data is not available</div>
                      :
                      <div className='flex items-center justify-center'><Loading /></div>
                  }
                {/* <div className='flex items-center justify-center'><Loading /></div> */}
                </>
            }
            <div className="flex justify-between">
              {/* Total Account in Containers */}
              <p className="text-md font-normal mt-3 pt-3">Total: 0 results</p>
              {/* Search Components */}
              <form className="relative" onSubmit={formik.handleSubmit}>
                <Input id='search' name='search' type='text' className="border-solid border-2 border-gray-500 rounded-lg mt-3 mx-3 px-2" style={{'height' : '2.25rem'}} placeholder='search and then press enter...' value={formik.values.search} onChange={formik.handleChange} />
              </form>
            </div>
          </div>
        </section>
        {/* Table */}
        <section>
          <Table className="rounded-md border my-5">
            <TableHeader className="text-center items-center bg-primary">
              <TableRow>
                <TableHead className="text-white">Container Name</TableHead>
                <TableHead className="text-white">Total Account</TableHead>
                <TableHead className="text-white">Date Update</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Action</TableHead>
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