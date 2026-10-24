import { api } from "@/lib/axios";
import { DoctorInvitationFormValues, DoctorInvitationResponse } from "@/lib/schema/doctor-invitation";

export async function SendDoctorInvitationApi(
  data: DoctorInvitationFormValues
): Promise<DoctorInvitationResponse> {
  const response = await api.post("/auth/Invitation" , data);
   console.log("response_Data",  response.data);
   
   if(response.data.success === false){
    throw new Error(response.data.message || "Failed to create Invitation")
   }

  return response.data.data as DoctorInvitationResponse;
}
