'use client'

import dayjs from 'dayjs'
import React from 'react'


import usersGlobalStore, { IUsersGlobalStore } from '@/store/users-global-store'

function ProfileCard() {

    const {user} = usersGlobalStore() as IUsersGlobalStore

    const renderProperty = (label: string, value: any) => (
        <div className='flex flex-col gap-1'>
            <span className='text-xs text-gray-700'>{label}</span>
            <span className='text-sm font-bold!'>{value}</span>
        </div>
    )
  return (
    <div className='mt-7 p-5 border border-gray-300 rounded grid grid-cols-1 lg:grid-cols-3 gap-7'>
        {renderProperty('Name', user?.name)}
        {renderProperty('Email', user?.email)}
        {renderProperty('ID', user?.id)}
        {renderProperty('Role', user?.role.toUpperCase())}
        {renderProperty('Created At', dayjs(user?.created_at).format('MMM DD, YYYY hh:mm A'))}
    </div>
  )
}

export default ProfileCard