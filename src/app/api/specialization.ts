import { api } from "@/lib/axios";
import { Specialization, SpecializationFormValues } from "@/lib/schema/specialization";

export async function createSpecialization(
  payload: SpecializationFormValues
): Promise<Specialization> {

  const response = await api.post("/auth/create-specialization", payload);

  if (response.data.success ===  false) { 
    throw new Error(response.data.message || "Failed to create specialization");
  }

  return response.data.data as Specialization;
}
export async function ListSpecialization(): Promise<Specialization[]> {
   
  const response = await api.get("/auth/list-specialization");

  if (!response.data.success){
    throw new Error(response.data.message || "Failed to Get Specialziation")
  }

  return response.data.data as Specialization[]

}


// 1. Update Specialization
export async function UpdateSpecialization(
  id: string, 
  data: SpecializationFormValues
): Promise<Specialization> {
  const response = await api.put(`/auth/specialization/update/${id}`, data);
  if (!response.data.success == false){
    throw new Error(response.data.message || "Failed to update ")
  }
  return response.data.data as Specialization;
}

export async function DeleteSpecialization(id: string) {
  const res = await api.delete(`/auth/specialization/delete/${id}`);
    
  if (!res.data.success === false){
    throw new Error(res.data.message || "Failed to delete the specilization")
  }

}



