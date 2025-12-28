"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";


import { getDashboardData } from "@/actions/dashboard";
import DashboardCard from "@/components/ui/dashboard-card";
import Loader from "@/components/ui/loader";
import PageTitle from "@/components/ui/page-title";
import usersGlobalStore, {IUsersGlobalStore} from "@/store/users-global-store";


function DashboardPage() {

  const initialData = {
    totalAppointments: 0,
    cancelledAppointments: 0,
    completedAppointments: 0,
    upcomingAppointments: 0,
  };
  
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);


  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: any = await getDashboardData(user?.id!, "user");
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      setData(initialData);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);
  return (
    <div>
      <PageTitle title="Dashboard" />

      {loading && <Loader />}

      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
          <DashboardCard
            title="Total Appointments"
            value={data.totalAppointments}
            caption="Total Appointments Booked"
          />
          <DashboardCard
            title="Cancelled Appointments"
            value={data.cancelledAppointments}
            caption="Cancelled Appointments "
          />
          <DashboardCard
            title="Completed Appointments"
            value={data.completedAppointments}
            caption="Completed Appointments"
          />
          <DashboardCard
            title="Upcoming Appointments"
            value={data.upcomingAppointments}
            caption="Upcoming Appointments"
          />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;