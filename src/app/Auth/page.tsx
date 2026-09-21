"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  Loader2,
  UserCheck,
  AlertCircle,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import {
  signUpSchema,
  signInSchema,
  SignUpInput,
  SignInInput,
} from "@/lib/validations/auth";
import { AuthService } from "@/services/Service";
import { InputField } from "@/components/ui/InputFeild";
import { loginAction } from "../actions/route";
import { useRouter } from "next/navigation"; 

export default function AuthPage() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const signUpForm = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date_of_birth: "",
      password: "",
      gender: undefined,
    },
  });

  const { errors: signUpErrors } = signUpForm.formState;

  const signInForm = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const { errors: signInErrors } = signInForm.formState;

  const handleModeSwitch = (newMode: "signup" | "signin") => {
    setServerError(null);
    setSuccessMessage(null);
    signUpForm.reset();
    signInForm.reset();
    setMode(newMode);
  };

  const onSignUpSubmit = async (data: SignUpInput) => {
    setLoading(true)
    setServerError(null);
    setSuccessMessage(null);
    try {
      const response = await AuthService.signUp(data);
      setSuccessMessage(response.message);
      setLoading(false)
      signUpForm.reset();
    } catch (err: any) {
      setLoading(false)
      setServerError(err.message || "An error occurred during sign up.");
    }
  };

  const onSignInSubmit = async (data: SignInInput) => {
    setLoading(true)
    setServerError(null);
    setSuccessMessage(null);
    try {
      const response = await AuthService.signIn(data);
      setSuccessMessage(response.message);
      router.push("/")
      router.refresh()
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      setServerError(err.message || "Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col lg:flex-row font-sans overflow-x-hidden">
      
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-white z-10">
        
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-zinc-900 leading-tight">
                Aria Health
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 tracking-widest uppercase">
                Primary Care
              </span>
            </div>
          </Link>

          {/* Mode Switcher Toggle */}
          <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200/80">
            <button
              onClick={() => handleModeSwitch("signup")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                mode === "signup"
                  ? "bg-white text-emerald-700 shadow-2xs"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => handleModeSwitch("signin")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                mode === "signin"
                  ? "bg-white text-emerald-700 shadow-2xs"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="my-auto py-8 max-w-md w-full mx-auto">
          
          <div className="mb-8 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight transition-all">
              {mode === "signup" ? "Create Your Account" : "Welcome Back"}
            </h1>
            <p className="text-sm text-zinc-600 font-normal">
              {mode === "signup"
                ? "Enter your credentials to book doctor appointments effortlessly."
                : "Sign in to access your consultations and appointment history."}
            </p>
          </div>

          {/* Global Alert Banners */}
          {serverError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200/80 flex items-start gap-3 text-red-700 text-xs sm:text-sm animate-in fade-in-50">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
              <span>{serverError}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3 text-emerald-800 text-xs sm:text-sm animate-in fade-in-50">
              <UserCheck className="w-5 h-5 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* SIGN UP FORM */}
          {mode === "signup" && (
            <form
              noValidate
              onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
              className="space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300"
            >
              <InputField
                label="Full Name"
                type="text"
                placeholder="Arham Khan"
                icon={<User className="w-4 h-4" />}
                error={signUpErrors.name?.message}
                {...signUpForm.register("name")}
              />

              <InputField
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                icon={<Mail className="w-4 h-4" />}
                error={signUpErrors.email?.message}
                {...signUpForm.register("email")}
              />

              <InputField
                label="Phone Number"
                type="tel"
                placeholder="03001234567"
                icon={<Phone className="w-4 h-4" />}
                error={signUpErrors.phone?.message}
                {...signUpForm.register("phone")}
              />

              <InputField
                label="Date of Birth"
                type="date"
                icon={<Calendar className="w-4 h-4" />}
                error={signUpErrors.date_of_birth?.message}
                {...signUpForm.register("date_of_birth")}
              />

              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                error={signUpErrors.password?.message}
                {...signUpForm.register("password")}
              />

              {/* Gender Radio Group */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "Male", label: "Male" },
                    { id: "Female", label: "Female" },
                    { id: "Other", label: "Other" },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className="relative flex items-center justify-center p-3 border rounded-xl cursor-pointer text-xs font-semibold text-zinc-800 bg-white hover:bg-zinc-50 border-zinc-200 has-checked:border-emerald-600 has-checked:bg-emerald-50/60 has-checked:text-emerald-800 transition-all duration-200"
                    >
                      <input
                        type="radio"
                        value={item.id}
                        className="sr-only"
                        {...signUpForm.register("gender")}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
                {signUpErrors.gender?.message && (
                  <p className="text-xs font-semibold text-red-500 pl-1 mt-1 block">
                    {signUpErrors.gender.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={signUpForm.formState.isSubmitting}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-xs hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer pt-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* SIGN IN FORM */}
          {mode === "signin" && (
            <form
              noValidate
              onSubmit={signInForm.handleSubmit(onSignInSubmit)}
              className="space-y-4 animate-in fade-in-50 slide-in-from-right-4 duration-300"
            >
              <InputField
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                icon={<Mail className="w-4 h-4" />}
                error={signInErrors.email?.message}
                {...signInForm.register("email")}
              />

              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                error={signInErrors.password?.message}
                {...signInForm.register("password")}
              />

              <button
                type="submit"
                disabled={signInForm.formState.isSubmitting}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-xs hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer pt-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Footer info */}
        <div className="text-xs text-zinc-500 text-center lg:text-left">
          By continuing, you agree to Aria Health's{" "}
          <span className="text-zinc-700 font-semibold cursor-pointer underline">Terms</span> &{" "}
          <span className="text-zinc-700 font-semibold cursor-pointer underline">Privacy Policy</span>.
        </div>

      </div>

      {/* RIGHT SIDE: Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-950 text-white relative flex-col justify-between p-12 lg:p-16 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="relative z-10 flex items-center gap-2 bg-emerald-900/60 border border-emerald-800/80 px-4 py-2 rounded-full w-max text-xs font-medium text-emerald-300 backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Verified Primary Care Clinic</span>
        </div>

        <div className="relative z-10 mt-10 mb-auto w-full max-w-lg mx-auto flex flex-col items-center text-center space-y-6">
          <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-emerald-800/60 shadow-2xl bg-emerald-900/30 transition-transform duration-1000 ease-in-out hover:scale-[1.01]">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop"
              alt="Medical Consultation"
              className="w-full h-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Your Health, Simplified.
            </h2>
            <p className="text-emerald-200/80 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Connect with leading healthcare specialists and manage your appointments seamlessly in one place.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-emerald-900/80 flex items-center justify-between text-xs text-emerald-300/80">
          <div>
            <span className="block font-bold text-lg text-white">10,000+</span>
            <span>Happy Patients</span>
          </div>
          <div>
            <span className="block font-bold text-lg text-white">4.9/5.0</span>
            <span>Patient Rating</span>
          </div>
          <div>
            <span className="block font-bold text-lg text-white">100%</span>
            <span>Verified Doctors</span>
          </div>
        </div>
      </div>

    </div>
  );
}