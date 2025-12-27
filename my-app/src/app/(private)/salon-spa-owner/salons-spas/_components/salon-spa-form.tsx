"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-global-store";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { workingDays } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { createNewSalonSpa, editSalonSpaById } from "@/actions/salon-spas";
import LocationSelection from "./location-selection";


interface SalonFormProps {
  initialValues?: any;
  formType?: "add" | "edit";
}

const offerStatuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];


const SalonSpaForm = ({ initialValues, formType }: SalonFormProps) => {

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { user } = usersGlobalStore() as IUsersGlobalStore;


  const formSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    address: z.string().nonempty(),
    city: z.string().nonempty(),
    state: z.string().nonempty(),
    zip: z.string().nonempty(),
    working_days: z.array(z.string().nonempty()),
    start_time: z.string().nonempty(),
    end_time: z.string().nonempty(),
    break_start_time: z.string().nonempty(),
    break_end_time: z.string().nonempty(),
    minimum_service_price: z.number(),
    maximum_service_price: z.number(),
    offer_status: z.string().nonempty(),
    slot_duration: z.number(),
    max_bookings_per_slot: z.number(),
    location_name: z.string(),
    latitude: z.string(),
    longitude: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      working_days: [],
      start_time: "",
      end_time: "",
      break_start_time: "",
      break_end_time: "",
      minimum_service_price: 0,
      maximum_service_price: 0,
      offer_status: "inactive",
      slot_duration: 0,
      max_bookings_per_slot: 0,
      location_name: "",
      latitude: "",
      longitude: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
        setLoading(true)
        
        let response = null

        if (formType === "add"){
            response = await createNewSalonSpa({
              ...values,
              owner_id: user?.id,
            })
        } else {
            response = await editSalonSpaById({
            id: initialValues.id,
            payload: values,
        }); // Will be implemented in future
      }  

      if (response.success) {
        toast.success(response.message);
        router.push("/salon-spa-owner/salons-spas");
      } else {
        toast.error(response.message);
      }

    }catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }


  const onWorkingDayChange = (day: string) => {
    try {
      const prevValues = form.getValues("working_days");
      if (prevValues.includes(day)) {
        form.setValue(
          "working_days",
          prevValues.filter((d) => d !== day)
        );
      } else {
        form.setValue("working_days", [...prevValues, day]);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };


   useEffect(() => {
    if (initialValues) {
      Object.keys(initialValues).forEach((key: any) => {
        form.setValue(key, initialValues[key]);
      });

      form.setValue("zip", initialValues.zip.toString());
    }
  }, [initialValues]);

  return (
      <div className="mt-7">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>)}/>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>)}/>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minimum_service_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Service Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="number"
                      {...field}
                      onChange={(e) => {
                        form.setValue(
                          "minimum_service_price",
                          parseInt(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maximum_service_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Service Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="number"
                      {...field}
                      onChange={(e) => {
                        form.setValue(
                          "maximum_service_price",
                          parseInt(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="offer_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offer status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="select offer status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {offerStatuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="p-5 border border-gray-300 rounded-md flex flex-col gap-5">
            <h1 className="text-sm! font-semibold! text-gray-600">
              Working Days
            </h1>

            <div className="flex flex-wrap gap-10">
              {workingDays.map((day) => {
                const prevValues = form.watch("working_days");
                const isChecked = prevValues.includes(day.value);

                return (
                  <div className="flex gap-2 items-center" key={day.value}>
                    <h1 className="text-sm">{day.label}</h1>
                    <Checkbox
                      onCheckedChange={() => onWorkingDayChange(day.value)}
                      checked={isChecked}/>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} type="time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} type="time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="break_start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Break Start Time</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} type="time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="break_end_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Break End Time</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} type="time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slot_duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slot Duration</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="number"
                        {...field}
                        onChange={(e) => {
                          form.setValue(
                            "slot_duration",
                            parseInt(e.target.value)
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="max_bookings_per_slot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Bookings Per Slot</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="number"
                        {...field}
                        onChange={(e) => {
                          form.setValue(
                            "max_bookings_per_slot",
                            parseInt(e.target.value)
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

         <div className="p-5 border border-gray-300 rounded-md flex flex-col gap-5">
            <h1>Location</h1>

            <LocationSelection
              selectedLocationObject={{
                lat: form.watch("latitude"),
                lon: form.watch("longitude"),
                display_name: form.watch("location_name"),
              }}
              setSelectedLocationObject={(location:any) => {
                form.setValue("latitude", location.lat);
                form.setValue("longitude", location.lon);
                form.setValue("location_name", location.display_name);
              }}
            />
          </div>

          <div className="flex justify-end gap-5">
            <Button
              type="button"
              variant={"outline"}
              disabled={loading}
              onClick={() => router.push("/salon-spa-owner/salons-spas")}>
              Cancel
            </Button>

            <Button className="cursor-pointer" type="submit" disabled={loading}>
              {formType === "add" ? "Add" : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SalonSpaForm