"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";



import {getAppointmentsByOwnerId,updateAppointmentStatus} from "@/actions/appointments";
import PageTitle from "@/components/ui/page-title";
import { IAppointment, ISalon_Spa } from "@/interfaces";
import usersGlobalStore, {IUsersGlobalStore} from "@/store/users-global-store";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ErrorMessage from "@/components/ui/error-message";
import Loader from "@/components/ui/loader";
import { appointmentStatuses } from "@/constants";
import Filters from "./_components/filters";
import { getSalonsByOwner } from "@/actions/salon-spas";

function AppointmentsList() {

  const { user } = usersGlobalStore() as IUsersGlobalStore;


  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [salonSpas, setSalonSpas] = useState<ISalon_Spa[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSalon, setSelectedSalon] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filtersCleared , setFiltersCleared] = useState<boolean>(false);


  const fetchData = async () => {
    try {
      setLoading(true);
      const response: any = await getAppointmentsByOwnerId(user?.id!, {
        salon_spa_id: selectedSalon,
        status: selectedStatus,
        date: selectedDate,
      });
      if (response.success) {
        setAppointments(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error fetching appointments");
    } finally {
      setLoading(false);
    }
  };

  const fetchSalonSpas = async () => {
    try {
      const response: any = await getSalonsByOwner(user?.id!);
      if (!response.success) throw new Error(response.message);
      setSalonSpas(response.data);
    } catch (error) {
      toast.error("Error fetching salon/spas");
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
      fetchSalonSpas();
    }
  }, [user]);

  useEffect(() => {
    if (filtersCleared) {
      fetchData();
      setFiltersCleared(false);
    }
  }, [filtersCleared]);

  const updateStatusHandler = async (id: number, status: string) => {
    try {
      setLoading(true);
      const response = await updateAppointmentStatus(id, status);
      if (!response.success) throw new Error(response.message);

      toast.success(response.message);
      const updatedAppointments: any = appointments.map((appointment) => {
        if (appointment.id === id) {
          return { ...appointment, status };
        }
        return appointment;
      });
      setAppointments(updatedAppointments);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    "Id",
    "Salon/Spa Name",
    "Customer Name",
    "Date",
    "Time",
    "Booked On",
    "Status",
  ];
  return (
    <div>
      <PageTitle title="Appointments" />

      {loading && <Loader />}

      {!loading && (
        <Filters
          salonsSpas={salonSpas}
          selectedSalon={selectedSalon}
          setSelectedSalon={setSelectedSalon}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onFilter={fetchData}
          onClearFilter={() => {
            setSelectedSalon(null);
            setSelectedStatus(null);
            setSelectedDate(null);
            setFiltersCleared(true);
          }}
        />
      )}

      {!loading && appointments.length === 0 && (
        <ErrorMessage error="No appointments found" />
      )}

      {!loading && appointments.length > 0 && (
        <div>
          {" "}
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                {columns.map((column) => (
                  <TableHead key={column} className="font-bold!">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((item: IAppointment) => (
                <TableRow key={item.id} className="p-2">
                  <TableCell data-label="Id">{item.id}</TableCell>
                  <TableCell data-label="Salon/Spa Name">
                    {item?.salon_spa_data?.name}
                  </TableCell>
                  <TableCell data-label="Customer Name">
                    {item?.user_data?.name}
                  </TableCell>
                  <TableCell data-label="Date">{item.date}</TableCell>
                  <TableCell data-label="Time">{item.time}</TableCell>
                  <TableCell data-label="Booked On">
                    {dayjs(item.created_at).format("MMM DD, YYYY hh:mm A")}
                  </TableCell>
                  <TableCell data-label="Status">
                    <select
                      value={item.status}
                      className={`border border-gray-400 rounded-md p-1 ${
                        item.status === "cancelled"
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                      onChange={(e) =>
                        updateStatusHandler(item.id, e.target.value)
                      }
                      disabled={
                        dayjs(item.date).isBefore(dayjs(), "day") ||
                        item.status === "cancelled"
                      }
                    >
                      {appointmentStatuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}

                      <option value="completed">Completed</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default AppointmentsList;