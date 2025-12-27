"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";



import { deleteSalonSpaById, getSalonsByOwner } from "@/actions/salon-spas";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/page-title";
import usersGlobalStore, {IUsersGlobalStore } from "@/store/users-global-store";
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
import { ISalon_Spa } from "@/interfaces";
import ErrorMessage from "@/components/ui/error-message";

function SalonsSpasList() {
    
  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const [salonsSpas, setSalonsSpas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: any = await getSalonsByOwner(user?.id!);
      if (!response.success) throw new Error(response.message);
      console.log(response.data);
      setSalonsSpas(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSalonSpaHandler = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteSalonSpaById(id);
      if (!response.success) throw new Error(response.message);
      toast.success(response.message);
      setSalonsSpas((prev) => prev.filter((item) => item.id !== id));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const columns = [
    "Id",
    "Name",
    "City",
    "State",
    "Zip",
    "Min Service Price",
    "Max Service Price",
    "Offer status",
    "Created At",
    "Actions",
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Salons & Spas" />
        <Button>
          <Link href="/salon-spa-owner/salons-spas/add">Add Salon/Spa</Link>
        </Button>
      </div>

      {loading && <Loader />}

      {!loading && salonsSpas.length > 0 && (
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
            {salonsSpas.map((item: ISalon_Spa) => (
              <TableRow key={item.id} className="p-2">
                <TableCell data-label="Id">{item.id}</TableCell>
                <TableCell data-label="Name">{item.name}</TableCell>
                <TableCell data-label="City">{item.city}</TableCell>
                <TableCell data-label="State">{item.state}</TableCell>
                <TableCell data-label="Zip">{item.zip}</TableCell>
                <TableCell data-label="Min Service Price">
                  $ {item.minimum_service_price}
                </TableCell>
                <TableCell data-label="Max Service Price">
                  $ {item.maximum_service_price}
                </TableCell>

                <TableCell data-label="Offer status">
                  {item.offer_status}
                </TableCell>

                <TableCell data-label="Created At">
                  {dayjs(item.created_at).format("MMM DD, YYYY hh:mm A")}
                </TableCell>

                <TableCell
                  data-label="actions"
                  className="flex gap-5 items-center"
                >
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => deleteSalonSpaHandler(item.id)}>
                    <Trash2 size={14} />
                  </Button>

                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() =>
                      router.push(
                        `/salon-spa-owner/salons-spas/edit/${item.id}`
                      )
                    }
                  >
                    <Edit2 size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {!loading && salonsSpas.length === 0 && (
        <ErrorMessage error="No salons/spas found" />
      )}
    </div>
  );
}

export default SalonsSpasList;