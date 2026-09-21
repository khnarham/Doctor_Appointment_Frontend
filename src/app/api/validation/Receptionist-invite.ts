import { api } from "@/lib/axios";
import { InviteReceptionistRequest } from "@/lib/schema/receptionist-invite";


export async function SendReceptionistInviteApi(payload: InviteReceptionistRequest) {
  const response = await api.post("/auth/Receptionist-invite" , payload);
  
   if (response.data.success === false){
    throw new Error(response.data.message || "Failed to send invite to the Receptionist")
   }
  return response.data.data;
}
