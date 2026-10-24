import { api } from "@/lib/axios";
import { CreateScheduleRequest } from "@/lib/schema/doctor-schedule";

export async function CreateDoctorScheduleApi(payload: CreateScheduleRequest) {
  const response = await api.post("/schedules" , payload)
    
  if (response.data.success === false){
    throw new Error(response.data.message || "Failed to create Schedule")
  }

  response.data.data
}