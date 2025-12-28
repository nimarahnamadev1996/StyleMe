export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "user" | "salon-spa-owner";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ISalon_Spa {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  working_days: string[];
  start_time: string;
  end_time: string;
  break_start_time: string;
  break_end_time: string;
  minimum_service_price: number;
  maximum_service_price: number;
  offer_status: "active" | "inactive";
  slot_duration: number;
  max_bookings_per_slot: number;
  location_name: string;
  latitude: number;
  longitude: number;
  owner_id: number;
  created_at: string;
  updated_at: string;
}


export interface IAppointment {
  id: number;
  user_id: number;
  salon_spa_id: number;
  owner_id: number;
  date: string;
  time: string;
  status: "booked" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;

  // run time properties
  user_data: IUser;
  salon_spa_data: ISalon_Spa;
}