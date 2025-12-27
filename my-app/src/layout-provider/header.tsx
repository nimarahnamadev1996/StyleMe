'use client'
import React, { useState } from 'react'


import usersGlobalStore, { IUsersGlobalStore } from '@/store/users-global-store';
import { Menu } from 'lucide-react';
import MenuItems from './menu-items';


const Header = () => {

  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const [openMenuItems, setOpenMenuItems] = useState(false);

  return (
    <div className="bg-primary p-5 md:p-8 text-white flex justify-between items-center">
      <h1 className="font-bold! text-white text-xl md:text-2xl">StyleMe</h1>

      <div className="flex gap-5 items-center">
        <h1 className="text-sm!">{user?.name}</h1>

        <Menu
          className="text-orange-500 cursor-pointer"
          size={15}
          onClick={() => setOpenMenuItems(true)}/>
      </div>

      {openMenuItems && (
        <MenuItems
          openMenuItems={openMenuItems}
          setOpenMenuItems={setOpenMenuItems}
        />
      )}
    </div>
  )
}

export default Header