"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Stethoscope,
  Edit3,
  ShieldCheck,
  History,
} from "lucide-react";
import { ProfileService, PatientProfile } from "@/services/profileServices";
import { profileUpdateSchema, ProfileUpdateInput } from "@/lib/validations/profile";
import { InputField } from "@/components/ui/InputFeild";

export default function ProfilePage() {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const data = await ProfileService.getProfile();
        setProfile(data);
        reset({
          name: data.user.name,
          gender: data.user.gender as "male" | "female" | "other",
        });
      } catch (err) {
        setStatusMessage({ type: "error", text: "Failed to load profile details." });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [reset]);

  const onUpdateSubmit = async (data: ProfileUpdateInput) => {
    setStatusMessage(null);
    try {
      const res = await ProfileService.updateProfile(data);
      if (res.success && profile) {
        setProfile({
          ...profile,
          user: res.user,
        });
        setIsEditing(false);
        setStatusMessage({ type: "success", text: "Profile details updated successfully!" });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Could not update profile." });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-emerald-700 font-semibold text-sm">
          <Loader2 className="w-5 h-5 animate-spin" />
          Fetching Patient Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between border-b border-zinc-200 pb-5">
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Patient Dashboard</h1>
            <p className="text-xs text-zinc-500 mt-1">Manage your health records and medical consultations</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Account
          </span>
        </div>

        {statusMessage && (
          <div
            className={`p-4 rounded-xl flex items-center gap-3 text-xs sm:text-sm font-medium ${
              statusMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-6 h-fit">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" /> Patient Info
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 text-xl font-extrabold flex items-center justify-center border-2 border-emerald-500/20">
                  {profile?.user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Full Name</label>
                  <p className="text-sm font-bold text-zinc-900">{profile?.user.name}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Email Address</label>
                  <p className="text-sm font-medium text-zinc-600">{profile?.user.email}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Gender</label>
                  <p className="text-sm font-semibold text-zinc-800 capitalize">{profile?.user.gender}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onUpdateSubmit)} noValidate className="space-y-4">
                <InputField
                  label="Full Name"
                  type="text"
                  error={errors.name?.message}
                  {...register("name")}
                />

                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                    Gender
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "male", label: "Male" },
                      { id: "female", label: "Female" },
                      { id: "other", label: "Other" },
                    ].map((item) => (
                      <label
                        key={item.id}
                        className="relative flex items-center justify-center p-2.5 border rounded-xl cursor-pointer text-xs font-semibold text-zinc-800 bg-white hover:bg-zinc-50 border-zinc-200 has-checked:border-emerald-600 has-checked:bg-emerald-50/60 has-checked:text-emerald-800 transition-all"
                      >
                        <input
                          type="radio"
                          value={item.id}
                          className="sr-only"
                          {...register("gender")}
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gender?.message && (
                    <p className="text-xs font-semibold text-red-500 pl-1 mt-1">{errors.gender.message}</p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      reset({
                        name: profile?.user.name,
                        gender: profile?.user.gender as "male" | "female" | "other",
                      });
                    }}
                    className="px-3 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" /> Next Upcoming Consultation
                </h2>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
                  Confirmed
                </span>
              </div>

              {profile?.upcomingAppointment ? (
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-emerald-600 shrink-0" />
                      <h3 className="text-base font-extrabold text-zinc-900">
                        {profile.upcomingAppointment.doctorName}
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-emerald-700 pl-6">
                      {profile.upcomingAppointment.specialization}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-4 text-xs text-zinc-500 pl-6">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        {profile.upcomingAppointment.date}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        {profile.upcomingAppointment.time}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 pl-6 flex items-center gap-1 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      {profile.upcomingAppointment.location}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-zinc-500 italic py-4">No upcoming appointments scheduled.</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-100 pb-3">
                <History className="w-4 h-4 text-emerald-600" /> Past Consultations Record
              </h2>

              <div className="divide-y divide-zinc-100">
                {profile?.history.map((apt) => (
                  <div key={apt.id} className="py-3.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-zinc-900 text-sm">{apt.doctorName}</p>
                      <p className="text-zinc-500 font-medium">{apt.specialization} • {apt.date}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-zinc-100 text-zinc-600">
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}