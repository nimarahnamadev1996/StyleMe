'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";


import usersGlobalStore, { IUsersGlobalStore } from '@/store/users-global-store';
import { getCurrentUser } from '@/actions/users';
import toast from 'react-hot-toast';
import Loader from '@/components/ui/loader';
import ErrorMessage from '@/components/ui/error-message';
import Header from './header';



const PrivateLayout = ({ children }: { children: React.ReactNode }) => {

    const [loading,setLoading] = useState(false)
    const [error, setError] = useState(null);

    const { user, setUser } = usersGlobalStore() as IUsersGlobalStore

    const router = useRouter()


    const fetchData = async() => {
      try{

        setLoading(true)

        const token = Cookies.get('token')

        const response = await getCurrentUser(token)

         if (response.success){
            setUser(response.data)
         } else {
          setError(response.message);
        }

      }catch(error: any){
        Cookies.remove("token");
        toast.error(error.message);
        router.push("/login");
        setError(error.message);
      }finally{
        setLoading(false)
      }
    }


    useEffect(() => {
      fetchData()
    },[])


     if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader/>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div>
      <Header/>
      <div className="p-5">{children}</div>
    </div>
  )
}

export default PrivateLayout