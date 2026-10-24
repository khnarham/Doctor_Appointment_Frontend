import { api } from "@/lib/axios";
import { AcceptInvitationRequest } from "@/lib/schema/receptionist-register";

export async function AcceptReceptionistInviteApi(payload: AcceptInvitationRequest) {
  const response = await api.post("/auth/Receptionist-accept" , payload)

  if (response.data.success === false){
    return new Error("Failed to register Receptionst");
  }

  return response.data.data;
}