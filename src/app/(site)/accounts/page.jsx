'use client'

import React, {useEffect, useReducer, useState} from "react"
import { useRouter } from 'next/navigation'

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

import { History, UserPlus } from 'lucide-react'
import { Label } from "@/components/ui/label"
import moment from "moment"

import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'

import Loading from "@/components/Loading"
import Pagination from "@/components/utilities/Pagination"

import QRCode from 'react-qr-code'


const actionType = {
  accountList: 'getAccountList',
  totalAccount: 'totalAccount',
  updatePage: 'updatePage',
  containerList: 'containerList',
  changeContainer: 'changeContainer',
  selectedContainer: 'selectedContainer',
  totalSuccessBlast: 'totalSuccessBlast',
  sort: 'sort',
  qrCode: 'qrCode'
}

function reducer(state, action) {
  const { type, payload } = action
  console.log(type, payload, state)


  switch (type) {
    case actionType.accountList:
      return {...state, accountList: payload}
    case actionType.totalAccount:
      return {...state, totalAccount: payload}
    case actionType.updatePage:
      return { ...state, currentPage: payload }
    case actionType.containerList:
      return { ...state, containerList: payload }
    case actionType.changeContainer:
      return { ...state, containerFilter: payload }
    case actionType.selectedContainer:
      return { ...state, containerId: payload }
    case actionType.totalSuccessBlast:
      return { ...state, accountId: payload }
    case actionType.sort:
      return { ...state, sort: payload }
    case actionType.qrCode:
      return { ...state, qrCode: payload }
    default:
      return state
  }
}

const initialState = {
  accountList: [],
  containerList: [],
  containerFilter: null,
  containerId: null,
  limit: 25,
  currentPage: 1,
  totalAccount: 0,
  totalSuccessBlast: 0,
  sort: {
    dateCreate: -1
  },
  qrCode: null
}

export default function AccountsPages() {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [timeOutQr, setTimeoutQr] = useState(null)

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
    if (state.containerId) return false

    if (!page) page = state.currentPage
    let offset = (page == 1) ? 0 : ((page - 1) * state.limit)
    
    // let response = await fetch('/api/Dashboard?act=list&offset=' + offset + '&limit=' + state.limit + ((state.containerFilter) ? '&containerId=' + state.containerFilter : ''))
    // console.log(response)

    // console.log(data)
    
    let apiUrl = `/api/Dashboard?act=list&offset=${offset}&limit=${state.limit}${sortValue ? `&sort=${sortKey}&sortType=${sortValue}` : `&sort=dateCreate&sortType=-1`}${state.instanceFilter ? `&instanceId=${state.instanceFilter}` : ''}`;
    
    let response = await fetch(apiUrl)

    if (state.containerFilter) {
      let response = await fetch('/api/Dashboard?act=list&offset=0' + '&limit=' + state.limit + ((state.containerFilter) ? '&instanceId=' + state.containerFilter : ''))
      const data = await response.json()

      const { code, content } = data
  
      dispatch({"type": actionType.accountList, "payload": content.results });
      dispatch({"type": actionType.totalAccount, payload: content.count});
      dispatch({ "type": actionType.updatePage, payload: page })
      // dispatch({'type': actionType.sort, payload: sortValue  })
      
      if (code === 0 && content.count) return content.results
    }
    
    const data = await response?.json()

    const { code, content } = data

    // getAccountSuccessSummary(content.results)

    dispatch({ "type": actionType.accountList, "payload": content.results })
    dispatch({ "type": actionType.totalAccount, payload: content.count })
    dispatch({ "type": actionType.updatePage, payload: page })
    
    if(code === 0 && content.count) return content.results
  }


  const getAvailableContainer = async () => {
    if (state.containerFilter || state.containerId) return false
    
    let response = await fetch('/api/Container?act=available&offset=0&limit=' + state.limit);
    const data = await response?.json()

    // console.log(data, 'containerrr')

    const { code, content } = data

    dispatch({ "type": actionType.containerList, "payload": content.results })
    
    if(code === 0 && content.count) return content.results
  }

  const changedContainer = (containerId) => {
    dispatch({"type": actionType.changeContainer, "payload": containerId})
  }

  const selectedContainer = (containerId) => {
    dispatch({'type' : actionType.selectedContainer, 'payload': containerId})
  }

  const getQrCode = async (isLoaded, requestId) => {
    if (!state.containerId) return false
    
    const response = await fetch('/api/WebHook?act=getQr&containerId=' + state.containerId + 'requestId=' + requestId)
    const data = await response.json()

    const { code, content } = data
    let timeOut;

    if (code === 0 && content) {
      dispatch({ 'type': actionType.qrCode, 'payload': content })
      
      timeOut = setTimeout(async () => await getQrCode(true, requestId), 10000)
    } else {
      (isLoaded) ? setTimeout(() => window.location.reload(), 3000) : timeOut = setTimeout(async () => await getQrCode(false, requestId), 5000)
    }

    setTimeoutQr(timeOut)

  }

  const submitQrCode = async () => {
    if (!state.containerId) return false;

    let response = await fetch('/api/WebHook?act=submitQr&containerId=' + state.containerId)
    const data = await response.json()

    const { code, content } = data

    if (code === 0 && content) {
      await getQrCode(false, content)
      return content;
    } else {
      setTimeout(() => window.location.reload(), 3000)
    }
  }
  
  const handleHistoryButton = () => {
    router.push('/history')
  }

  const dialogHandle = (isOpen) => {
    if (!isOpen) {
       selectedContainer(null)
       dispatch({ 'type': actionType.qrCode, 'payload': null})
    }
    setTimeoutQr(prev => clearTimeout(prev))

    }

  useEffect(() => {
    getAccountList()
    getAvailableContainer()
    submitQrCode()
    // getAccountSuccessSummary(state.accountList._id)
  }, [state.containerFilter, state.containerId])

  return (
    <main>
      <div className="container py-5 shadow-lg my-4 border rounded-sm">
        {/* Select, Detail, History Button, Add Account Button */}
        <section className="flex justify-between mb-2">
          <div>
            <h1 className="text-2xl font-semibold">Accounts</h1>
            {/* Select Container */}
            <div className="flex flex-wrap gap-2">
              <Select onValueChange={changedContainer}>
                <SelectTrigger className="w-auto mt-4"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem>All Container</SelectItem>
                  {
                    state.containerList && state.containerList.length ? 
                      state.containerList.map((value, index) => (
                        // console.log(value, 'valuuu')
                        <SelectItem value={value._id} key={index}>{value._id.charAt(0).toUpperCase() + value._id.slice(1)}</SelectItem>
                      ))
                      :
                      false
                  }
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
              <Dialog onOpenChange={(isOpen) => {dialogHandle(isOpen)}}>
                <DialogTrigger asChild>
                  <Button className="bg-success hover:bg-success-hover text-white gap-1 pb-2 text-md"><UserPlus size={22} />Add Account</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Account</DialogTitle>
                  </DialogHeader>
                  <Label htmlFor="selectContainer">Containers</Label>
                  <Select name='selectContainer' onValueChange={selectedContainer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose container for new account" />
                      <SelectContent className="max-h-[210px] overflow-y-scroll" data-scrollable>
                        {
                          state.containerList && state.containerList.length ? 
                            state.containerList.map((value, index) => (
                              <>
                                <SelectItem value={value._id} key={index}>{value._id.charAt(0).toUpperCase() + value._id.slice(1)}</SelectItem>
                              </>
                            ))
                            :
                            false
                        }
                      </SelectContent>
                    </SelectTrigger>
                    {
                      state.qrCode ? 
                      <div style={{ height: "auto", margin: "0 auto", maxWidth: 245, width: "100%" }}>
                        <QRCode
                        size={256}
                        style={{ height: "257px", maxWidth: "100%", width: "257px" }}
                        value={state.qrCode}
                        viewBox={`0 0 257 257`}
                        />
                        </div> 
                        :
                        state.instanceId ? 
                          <div className='flex justify-center'><Loading /></div>
                          :
                          false
                    }
                  </Select>
                </DialogContent>
              </Dialog>
            </>
          </div>
        </section>
        {/* Total Account */}
        {
          state.totalAccount ?
            <>
              {
                state.totalAccount > 1 ? 
                  <p className="text-md font-normal mt-3">Total: {state.totalAccount} accounts</p>
                  :
                  <p className="text-md font-normal mt-3">Total: {state.totalAccount} account</p>
              }
          </>
            :
            <p className="text-md font-normal mt-3">Total: 0 account</p>
        }
        {/*Table  */}
        {
        state.accountList ? 
        <section>
          <div>
            <Table className="rounded-md border my-5">
              <TableHeader className="text-center items-center bg-primary">
                <TableRow>
                  <TableHead className="text-white"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorter('pushname')}>Account Name {sortKeyValue === 'pushname' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                  <TableHead className="text-white"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorter('me')}>Phone Number {sortKeyValue === 'me' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                  <TableHead className="text-white"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorter('containerId')}>Container ID {sortKeyValue === 'containerId' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorter('totalSuccessBlast')}>Success Blast {sortKeyValue === 'totalSuccessBlast' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                  <TableHead className="text-white"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorter('lastBlast')}>Last Blast {sortKeyValue === 'lastBlast' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {
                      state.accountList.map((value, index) => {
                        return (
                          <TableRow className="hover:bg-slate-300">
                            <TableCell><div className="px-1 mx-1">{value.pushname}</div></TableCell>
                            <TableCell><div className="px-1 mx-2">{value.me.user}</div></TableCell>
                            <TableCell><div className="px-1 mx-2">{value.containerId.charAt(0).toUpperCase() + value.containerId.slice(1)}</div></TableCell>
                            <TableCell>
                              {
                              value.totalUser > 0 ?  <span className='bg-success rounded-sm p-1 text-white text-sm'>Ready</span> : <span className=''></span>
                              }
                            </TableCell>
                            <TableCell><div className="px-1 mx-3" style={{'marginLeft': '3rem'}}>{value.totalSuccessBlast}</div></TableCell>
                            <TableCell>{moment.utc(value.lastBlast).format('YYYY-MM-DD HH:mm')}</TableCell>
                          </TableRow>
                      )
                    })
                  }
              </TableBody>
            </Table>
          </div>
            {/* Pagination */}
          <div className="flex justify-end">
          <Pagination length={state.totalAccount} limit={state.limit} page={state.currentPage} callback={(pageNumber) => getAccountList(pageNumber, (sortKeyValue ? sortKeyValue : 'pushname'), valueSort)} />
          </div>
        </section>
            :
            (
            state.accountList?.length !== undefined ?
            <div className="flex justify-center"><Loading /></div>
              :
            <div className='flex justify-center'>Data is not found</div>
            )
        }
      </div>
    </main>
  )
}