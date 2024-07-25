import React from 'react'
import { Avatar } from './BlogCard'

const Appbar = () => {
  return (
    <div className='border-b flex justify-between px-10 py-2 items-center'>
        <div className='text-3xl font-bold font-[serif]'>
            Medium
        </div>
        <div>
            <Avatar size= "big" name="Harkirat Singh"/>
        </div>
    </div>
  )
}

export default Appbar