'use client'

import { useRouter } from 'next/navigation'
import React from 'react'



import { Button } from '@/components/ui/button'


const HomePage = () => {

  const router = useRouter()

  return (
    <div className="flex flex-col">

      <div className='flex justify-between items-center bg-gray-200 p-5 md:px-14 md:py-8'>
        <h1 className="font-bold! text-xl text-black md:text-3xl">StyleMe</h1>
        <Button onClick={() => router.push('/login')}>Login</Button>
      </div>


      <div className='bg-white mt-20 grid gap-10 items-center grid-cols-1 lg:grid-cols-2 px-20 min-h-[70vh] '>

        <div className='col-span-1'>
          <div className='flex flex-col gap-5'>
            <h1 className="text-2xl font-bold!">Welcome to StyleMe</h1>
            <p className="text-sm text-gray-600">
              StyleMe is a platform that connects barbers with customers.
              It helps customers find barbers near them and book appointments
              with them.
            </p>
            <Button className="w-max">Find a Salon</Button>
          </div>
        </div>

        <div className='col-span-1 flex justify-end items-center'>
          <img
            src="https://img.freepik.com/premium-vector/man-hair-salon-logo-vector-illustration-white-background_1023984-42155.jpg"
            className="h-96"/>
        </div>
      </div>
    </div>
  )
}

export default HomePage