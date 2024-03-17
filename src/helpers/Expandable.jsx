'use client'

import React, { useState }  from 'react'

const Expandable = ({ children, maxChars = 220 }) => {
  
  const [expanded, setExpanded] = useState(true)

  if (children.length <= maxChars) return <p>{children}</p>

  let textSpace = expanded ? children.substring(0, maxChars) : children

  return (
    <section className='flex flex-wrap'>
      {
        expanded ? <p>{textSpace}...</p> : <p>{textSpace}</p>
      }
      {/* <p>{textSpace}...</p> */}
      <button className='px-1 mx-2 rounded-lg bg-black text-white hover:bg-slate-500 hover:text-black' onClick={ () => setExpanded(!expanded)}>{expanded ? 'Read More' : 'Read Less' }</button>
    </section>
  )
}

export default Expandable
