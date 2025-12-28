'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';


import { getAllSalonSpas } from '@/actions/salon-spas';
import Loader from '@/components/ui/loader';
import PageTitle from '@/components/ui/page-title';
import { ISalon_Spa } from '@/interfaces';

const ScheduleAppointment = () => {

    const [loading = false, setLoading] = useState<boolean>(false);
    const [salonSpas = [],setSalonSpas] = useState([])
    const [allSalonsSpas = [], setAllSalonsSpas] = useState([]);

    const router = useRouter() 

    const fetchData = async() => {
      try{

        setLoading(true)

        const response: any = await getAllSalonSpas()

        if (!response.success) {
          throw new Error(response.message);
       }

       setSalonSpas(response.data)
       setAllSalonsSpas(response.data)

      }catch (error) {
      toast.error("Failed to fetch salon spas");
    } finally {
      setLoading(false);
    }
    }


    useEffect(() => {
        fetchData()
    },[])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <PageTitle title="Schedule Appointment" />

        <div>
            <h1 className="text-sm">Sort / Filter</h1>

            <select>
                <option value="">All</option>
                <option value="nearby">Nearby</option>
                <option value="price-low-to-high">Price : Low to high</option>
                <option value="price-high-to-low">Price : High to low</option>
                <option value="with-offers">With Offers</option>
            </select>
        </div>
      </div>

       {loading && <Loader/>}

        {!loading && salonSpas.length > 0 && (
        <div className="flex flex-col gap-7 mt-7">
          {salonSpas.map((salonSpa: ISalon_Spa) => (
            <div
              key={salonSpa.id}
              className="border border-gray-300 p-5 rounded cursor-pointer hover:border-gray-600"
              onClick={() =>
                router.push(`/user/schedule-appointment/${salonSpa.id}`)
              }
            >
              <h1 className="text-sm font-bold! text-gray-800">
                {salonSpa.name}
              </h1>
              <p className="text-xs text-gray-600">
                {salonSpa.address}, {salonSpa.city}, {salonSpa.state}
              </p>

              <div className="mt-5">
                <span className="text-xs font-semibold!">
                  Minimum Price: $ {salonSpa.minimum_service_price}
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold!">
                  Active Offers:{" "}
                  {salonSpa.offer_status === "active" ? "Yes" : "No"}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default ScheduleAppointment