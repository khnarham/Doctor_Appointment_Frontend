import { api } from "@/lib/axios";
import { DoctorRegistrationFormValues } from "@/lib/schema/doctor-registration";

export async function RegisterDoctorApi(data: DoctorRegistrationFormValues) {
  
  const payload = {
    token: data.token,
    name: data.name,
    password: data.password,
    gender: data.gender,
    license_number: data.license_number,
    consultation_fee: Number(data.consultation_fee), // Must be a JSON Number, not string
  };

  const res = await api.post("/auth/accept-invite", payload);
  console.log("data",res.data);
  
  if (res.data.success === false){
    throw new Error(res.data.message || "Failed to register")
  }

  return res.data.data
}