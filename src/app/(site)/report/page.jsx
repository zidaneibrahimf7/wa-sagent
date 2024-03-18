'use client'

import React from 'react'

import FilterData from '@/components/FilterData'
import APIUserSelection from '@/components/APIUserSelection'

import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {HardDriveDownload} from 'lucide-react'
import { Input } from '@/components/ui/input'



export default function ReportPage() {

  return (
    <>
      <main>
        {/* Form Menu */}
        <form method="POST" className='flex gap-3 mt-10 items-start ms-10'>
          {/* Filter Data */}
          <div>
            <Label htmlFor="range-data" className="text-md mb-3">Filter Data By</Label>
            <FilterData id="filterData" onChange={() => console.log('aku ke change')} />
          </div>
          {/* Date Range */}
          <div>
            <Label htmlFor="date-range" className="text-md">Date Range</Label>

          </div>
          {/* API User */}
          <div>
            <Label htmlFor="api-user" className="text-md">API User</Label>
            <APIUserSelection id='apiUser' onChange={() => console.log('ganti api user')} />
          </div>
          {/* Message */}
          <div>
            <Label htmlFor="message" className="text-md">Message</Label>
            
          </div>
        </form>
        {/* Table Total Blast by APIUser and Message */}
        <section className='flex w-full justify-center'>
          {/* Total Blast By API User */}
          <div className='grow w-5 rounded-sm py-3 m-5 text-primary items-center shadow-xl'>
            <h1 className='text-xl font-semibold my-5 mx-3'>Total Blast By API User</h1>
            <>
              <div className='rounded-md border mx-4 my-5'>
                <Table>
                  <TableHeader className='text-center items-center bg-primary'>
                    <TableRow>
                      <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success">API User</Button></TableHead>
                      <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success">Total Blast</Button></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      {/* <TableCell></TableCell> */}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
                {/* Pagination API User */}
              <div className='flex justify-end mt-4 mx-4'>
                {/*  */}
              </div>
            </>
          </div>
          {/* Total Blast by Message */}
          <div className='grow w-5 rounded-sm py-3 m-5 text-primary items-center shadow-xl'>
            <h1 className='text-xl font-semibold my-5 mx-3'>Total Blast by Message</h1>
            <>
              <div className='rounded-md border mx-4 my-5'>
                <Table>
                  <TableHeader className="text-center items-center bg-primary">
                    <TableRow>
                      <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success">Date Time</Button></TableHead>
                      <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success">Content-Type</Button></TableHead>
                      <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success">Message</Button></TableHead>
                      <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success">Total Blast</Button></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      {/* <TableCell></TableCell> */}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              {/* Pagination Message Blast */}
              <div className='flex justify-end mt-4 mx-4'>
                {/*  */}
              </div>
            </>
          </div>
        </section>
        {/* Summary */}
        <section>
          <div className='rounded-md py-3 m-5 text-black items-center shadow-xl'>
            <h1 className='text-xl font-semibold my-5 mx-3'>Summary</h1>
            <div className='flex gap-3 justify-center mx-4 mb-3'>
              <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                <CardHeader>
                  <CardTitle className="font-normal flex justify-center items-center text-center text-sm xl:text-base">Total Blast</CardTitle>
                  <CardContent className="text-3xl pt-2 text-center">0</CardContent>
                </CardHeader>
              </Card>
              <Card className="bg-success w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                  <CardHeader>
                    <CardTitle className='font-normal flex justify-center items-center text-center text-sm text-white xl:text-base'>Success Blast</CardTitle>
                    <CardContent className="text-3xl pb-0 pt-2 text-white text-center">0</CardContent>
                  </CardHeader>
              </Card>
              <Card className="bg-destructive w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                  <CardHeader>
                    <CardTitle className='font-normal flex justify-center items-center text-center text-sm text-white xl:text-base'>Failed Blast</CardTitle>
                    <CardContent className="text-3xl pb-0 pt-2 text-white text-center">0</CardContent>
                  </CardHeader>
              </Card>
              <Card className="bg-yellow-500 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 flex flex-col">
                  <CardHeader>
                    <CardTitle className='font-normal flex justify-center items-center text-center text-sm text-white xl:text-base'>Not WA Account</CardTitle>
                    <CardContent className="flex-1 text-3xl pb-0 pt-2 text-white text-center overflow-hidden">0
                      {/* {numeral(summary.notWa).format('0,0').replaceAll(',', '.')} */}
                    </CardContent>
                  </CardHeader>
                </Card>
                <Card className="bg-blue-500 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                  <CardHeader>
                    <CardTitle className='font-normal flex justify-center items-center text-center text-sm text-white xl:text-base'>In Progress</CardTitle>
                    <CardContent className="text-3xl pb-0 pt-2 text-white text-center">0</CardContent>
                  </CardHeader>
              </Card>
              <Card className="bg-orange-500 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                  <CardHeader>
                    <CardTitle className='font-normal flex justify-center items-center text-center text-sm text-white xl:text-base'>Paused</CardTitle>
                    <CardContent className="text-3xl pb-0 pt-2 text-white text-center">0</CardContent>
                  </CardHeader>
              </Card>
              <Card className="bg-success-hover w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                <CardHeader>
                  <CardTitle className='font-normal flex justify-center items-center text-center text-sm text-white xl:text-base'>Success Rate</CardTitle>
                  <CardContent className="text-3xl pb-0 pt-2 text-white text-center">0%</CardContent>
                </CardHeader>
            </Card>
            </div>
          </div>
        </section>
        {/* Raw Data Table */}
        <section className='rounded-sm py-3 m-5 text-primary items-center shadow-xl'>
          <div className='flex flex-wrap justify-between'>
            <h1 className='text-xl font-semibold my-5 mx-3'>Raw Data</h1>
            {/* Button Download Report */}
            <>
              <Button className="bg-success flex flex-wrap p-2 pb-4 mt-4 mr-3 gap-1 text-md hover:bg-success-hover" style={{ 'height': '40px', 'width': '169px', 'marginRight': '24px' }}>
              <HardDriveDownload size={19} className='' />
              Download report
              </Button>
            </>
          </div>
          <>
            {/* Search */}
            <div className='flex items-center justify-end px-3 mx-3'>
              <form onSubmit={(e) => console.log(e.target.value)}>
                <Input
                  type='text'
                  placeholder="Search and then press enter"
                  onChange={(event) =>
                    console.log(event.target.value)
                  }
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      console.log(event.target.value)
                    }
                  }}
                  className="ml-3"
                  style={{ 'width': '13rem' }}
                />
              </form>
            </div>
          </>
          {/* Table */}
          <div className='rounded-md border mx-4 my-5'>
            <Table>
              <TableHeader className="text-center items-center bg-primary">
                <TableRow>
                  <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-black items-center gap-1 hover:text-success">Date Create</Button></TableHead>
                  <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-black items-center gap-1 hover:text-success">Content Type</Button></TableHead>
                  <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-black items-center gap-1 hover:text-success">Message</Button></TableHead>
                  <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-black items-center gap-1 hover:text-success">API User</Button></TableHead>
                  <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-black items-center gap-1 hover:text-success">Destination Number</Button></TableHead>
                  <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-black items-center gap-1 hover:text-success">Status</Button></TableHead>
                  <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-black items-center gap-1 hover:text-success">Delivered</Button></TableHead>
                  <TableHead className="text-primary-foreground"><Button className="flex justify-center bg-black items-center gap-1 hover:text-success">Seen</Button></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  {/* <TableCell></TableCell> */}
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {/* Pagination */}
          <div className='flex justify-end mt-4 mx-4'>
            {/*  */}
          </div>
        </section>
      </main>
    </>
  )
}