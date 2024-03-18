'use client'

import React, { useState, useEffect, useReducer} from 'react'


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import Loading from '@/components/Loading'
import Pagination from '@/components/utilities/Pagination'

import { useFormik } from 'formik'

import { Search } from 'lucide-react'

import numeral from 'numeral'
import moment from 'moment'

import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'


const actionType = {
  accountList:  'getAccountList',
  totalAccount: 'totalAccount',
  updatePage: 'updatePage',
  containerList: 'containerList',
  changeContainer: 'changeContainer',
  selectedContainer: 'selectedContainer',
  search: 'search',
  sort: 'sort',
}

function reducer(state, action) {
  const { type, payload } = action
  console.log(type, payload, state)

  switch (type) {
    case actionType.accountList:
      return { ...state, accountList: payload }
    case actionType.totalAccount:
      return { ...state, totalAccount: payload }
    case actionType.updatePage:
      return { ...state, currentPage: payload }
    case actionType.containerList:
      return { ...state, containerList: payload }
    case actionType.changeContainer:
      return { ...state, containerFilter: payload }
    case actionType.selectedContainer:
      return { ...state, containerId: payload}
    case actionType.search:
      return { ...state, search: payload }
    case actionType.sort:
      return {...state, sort: payload}
  }
}

const initialState = {
  accountList: [], 
  containerList: [],
  containerFilter: null,
  containerId: null,
  currentPage: 1,
  totalAccount: 0,
  search: '',
  sort: {
    dateUpdate: -1
  }
}



export default function HistoryPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [limit, setLimit] = useState(25)
  const [inActive, setInActive] = useState(true)
  // const [valuePlaceho]

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    onSubmit: async (values) => {
      // console.log(values)
      dispatch({ 'type': actionType.search, payload: values.search })
    }
  })

  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const [sortedAccountList, setSortedAccountList] = useState([]);
  const [sortKeyValue, setSortKeyValue] = useState('')
  const [valueSort, setValueSort] = useState(1)

  const handleSorter = async (sortKey) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    // console.log(newSortOrder)
    setSortOrder(newSortOrder);
    // console.log(sortKey)
    setSortKeyValue(sortKey)
    
    const sortValue = newSortOrder === 'asc' ? 1 : -1;
    setValueSort(sortValue)

    dispatch({ 'type': actionType.sort, payload: {sortKey} })

    await getAccountList(state.currentPage, sortKey, sortValue);

  }

  const getAccountList = async (page, sortKey, sortValue) => {
    if (!page) page = state.currentPage
    
    let offset = (page === 1) ? 0 : ((page - 1) * limit)
    // let response = await fetch('/api/Dashboard?act=list&offset=' + offset + '&limit=' + limit + '&inActive=' + inActive + ((sortValue ? '&sort=' + sortKey + '&sortType=' + sortValue : '&sort=dateUpdate&sortType=-1' )) + ((state.instanceFilter) ? '&instanceId=' + state.instanceFilter : '') + ((state.search) ? '&search=' + state.search : ''))
    let response = await fetch('/api/Dashboard?act=list&offset=' + offset + '&limit=' + limit + '&inActive=' + inActive + ((sortValue ? '&sort=' + sortKey + '&sortType=' + sortValue : '&sort=dateUpdate&sortType=-1' )) + ((state.containerFilter) ? '&containerId=' + state.containerFilter : '') + ((state.search) ? '&search=' + state.search : ''))
    const data = await response.json()
    // console.log(data, 'datss')

    if (state.containerFilter || state.search) {
      let response = await fetch('/api/Dashboard?act=list&offset=0' + '&limit=' + limit + '&inActive=' + inActive + ((state.containerFilter) ? '&containerId=' + state.containerFilter : '') + ((state.search) ? '&search=' + state.search : ''))
      const data = await response.json()
    
      const { code, content } = data
  
      dispatch({"type": actionType.accountList, "payload": content.results });
      dispatch({"type": actionType.totalAccount, payload: content.count});
      dispatch({"type" : actionType.updatePage, payload: page})
      
      if (code === 0 && content.count) return content.results
    }

    const { code, content } = data
    
    dispatch({"type": actionType.accountList, "payload": content.results });
    dispatch({"type": actionType.totalAccount, payload: content.count});
    dispatch({"type" : actionType.updatePage, payload: page})
      
    if (code === 0 && content.count) return content.results
  }


  useEffect(() => {
    getAccountList()
  }, [state.search, state.containerFilter])
  return (
    <main>
      <div className='container py-5 shadow-lg my-4 border rounded-sm'>
        {/* Detail, Total Account, Select Container, Search (if added) */}
        <section className=''>
          <div>
            <h1 className='text-2xl font-semibold'>Accounts History</h1>
            <div className='flex justify-between'>
              {/* Total Account */}
              {
                  state.totalAccount ?
                    <>
                    {
                      state.totalAccount === 1 ?
                      <p className='text-md font-normal mt-3'>Total: {state.totalAccount} account</p>
                      :   
                      <p className='text-md font-normal mt-3'>Total: {numeral(state.totalAccount).format('0,0').replaceAll(',', '.')} accounts</p>    
                    }
                    </>
                    :
                  <p className='text-md font-normal mt-3'>Total: 0 account</p>
              }  
              {/* Search Components */}
              <form className='relative' onSubmit={formik.handleSubmit}>
                <Input id='search' name='search' type='text' className="border-solid border-2 border-gray-500 rounded-lg mt-3 mx-3 px-2" style={{'height' : '2.25rem'}} placeholder='search..' value={formik.values.search} onChange={formik.handleChange} />
                <Search size={20} className='absolute top-5 end-1 cursor-pointer' onClick={formik.handleSubmit} />
              </form>
            </div>
          </div>
          {/* Select Container Components */}
          {/* <div className='flex flex-wrap gap-2 mt-3'>
            <Select onValueChange={() => console.log('valuee ke ganti containernya')}>
              <SelectTrigger className='w-auto'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Container</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </section>
        {/* Table */}
        <section>
            <Table className="rounded-md border my-5">
              <TableHeader className="text-center items-center bg-primary">
                <TableRow>
                  <TableHead className="text-white"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorter('containerId')}>Container ID {sortKeyValue === 'containerId' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                  <TableHead className="text-white"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorter('me')}>Phone Number {sortKeyValue === 'me' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                  <TableHead className="text-white"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorter('pushname')}>Account Name {sortKeyValue === 'pushname' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                  <TableHead className="text-white"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorter('totalSuccessBlast')}>Success blast {sortKeyValue === 'totalSuccessBlast' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                  <TableHead className="text-white"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorter('lastBlast')}>Last Blast {sortKeyValue === 'lastBlast' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                  <TableHead className="text-white"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorter('dateUpdate')}>Inactive Date {sortKeyValue === 'containerId' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                  <TableHead className="text-white">Reason</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {
                state.accountList.map((value, index) => {
                  // console.log(value, index)
                  return (
                    <TableRow className="hover:bg-slate-300" key={index}>
                      <TableCell><div className='px-1 mx-3'>{value?.containerId}</div></TableCell>
                      <TableCell><div className='px-1 mx-3'>{value?.me?.user}</div></TableCell>
                      <TableCell><div className='px-1 mx-3'>{value?.pushname}</div></TableCell>
                      <TableCell><div className='' style={{'marginLeft' : '3rem'}}>{value?.totalSuccessBlast}</div></TableCell>
                      {/* <TableCell>{value.dateCreate ? <div className='mx-3'>{moment.utc(value.dateCreate).format('YYYY-MM-DD HH:mm')}</div> : ''}</TableCell> */}
                      <TableCell><div className=''>{moment.utc(value?.lastBlast).format('YYYY-MM-DD HH:mm')}</div></TableCell>
                      <TableCell><div className=''>{moment.utc(value?.dateUpdate).format('YYYY-MM-DD hh:mm')}</div></TableCell>
                      <TableCell>{value.status === 0 ? <div className='font-semibold'>UNPAIRED</div> : ''}</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </section>
          {/* Pagination */}
          <div className='flex justify-end mt-4 mx-4'>
              <Pagination length={state.totalAccount} limit={limit} page={state.currentPage} callback={(pageNumber) => getAccountList(pageNumber, (sortKeyValue ? sortKeyValue : 'dateUpdate'), valueSort)} />
          </div>  
      </div>
    </main>
  )
}