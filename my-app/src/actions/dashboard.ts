"use server";

import supabase from "@/config/supabase-config";

export const getDashboardData = async (id: number, type: "user" | "owner") => {
  try {
    let qry = supabase.from("appointments").select("*");

    if (type === "user") {
      qry = qry.eq("user_id", id);
    } else {
      qry = qry.eq("owner_id", id);
    }

    const { data, error } = await qry;
    if (error) throw new Error(error.message);
    const responseData = {
      totalAppointments: data.length,
      cancelledAppointments: data.filter(
        (appointment: any) => appointment.status === "cancelled"
      ).length,
      completedAppointments: data.filter(
        (appointment: any) => appointment.status === "completed"
      ).length,
      upcomingAppointments: data.filter(
        (appointment: any) => appointment.status === "booked"
      ).length,
    };

    return {
      success: true,
      data: responseData,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};