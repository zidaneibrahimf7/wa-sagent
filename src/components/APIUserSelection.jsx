'use client'

import React, { useState, useEffect } from 'react'

import Select from 'react-select'

export default function APIUserSelection({filterData, id, onChange}) {
  const [apiUser, setApiUser] = useState([])

  const getApiUser = async () => {
    filterData = !filterData ? 'dateCreate' : filterData



  }


  return (
      <Select
      styles={{
        control: (baseStyles, state) => ({
            ...baseStyles,
            maxWidth: '310px',
            width: '240px',
            paddingTop: '2px',
            borderRadius: '7px',
            borderColor: 'none',
            fontFamily: 'sans-serif'
            
          }),
        }}
      id={id}
      options={apiUser}
      isMulti
      placeholder="select API User"
      onChange={onChange}
      required
      isSearchable
      aria-activedescendant
      />
  )
}