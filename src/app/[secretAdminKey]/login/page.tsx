"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  signInSchema,
  SignInInput,
} from "@/lib/validations/auth";
import { api } from "@/lib/axios";
import { InputField } from "@/components/ui/InputFeild";
import { useRouter, notFound } from "next/navigation";

interface AdminLoginPageProps {
  params: Promise<{
    secretAdminKey: string;
  }>;
}

export default function AdminLoginPage({ params }: AdminLoginPageProps) {
  // Unwrap route params in Next.js App Router
  const resolvedParams = use(params);
  const secretAdminKey = resolvedParams.secretAdminKey;

  // Environment variable se match karo (agar match nahi hota, toh 404 throw kar do)
  const expectedSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY || "x9k2m-secret-admin";
  if (secretAdminKey !== expectedSecret) {
    notFound();
  }

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const signInForm = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const { errors: signInErrors } = signInForm.formState;

  // Dedicated Admin Login Handler hitting backend /auth/admin/login
  const onSignInSubmit = async (data: SignInInput) => {
    setLoading(true);
    setServerError(null);
    setSuccessMessage(null);
    try {
      const response = await api.post("/auth/admin/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data?.success) {
        setSuccessMessage("Admin authenticated successfully. Redirecting...");
        setTimeout(() => {
          router.push("/admin/dashboard");
          router.refresh();
        }, 800);
      } else {
        throw new Error(response.data?.message || "Admin login failed.");
      }
    } catch (err: any) {
      setLoading(false);
      setServerError(
        err.response?.data?.message || err.message || "Invalid admin credentials."
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col lg:flex-row font-sans overflow-x-hidden text-zinc-900">
      
      {/* LEFT SIDE: White & Red Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-white border-r border-zinc-200 z-10">
        
        {/* Header Logo */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-zinc-900 leading-tight">
                Vortex Admin
              </span>
              <span className="text-[10px] font-semibold text-rose-600 tracking-widest uppercase">
                Restricted Gateway
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-200 rounded-full text-xs font-medium text-rose-700">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
            <span>Secure Tunnel</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="my-auto py-8 max-w-md w-full mx-auto">
          <div className="mb-8 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              Admin Portal Login
            </h1>
            <p className="text-sm text-zinc-600 font-normal">
              Enter your authorized administrator credentials to access the command center.
            </p>
          </div>

          {/* Global Alert Banners */}
          {serverError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
              <span>{serverError}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-xs sm:text-sm">
              <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ADMIN SIGN IN FORM */}
          <form
            noValidate
            onSubmit={signInForm.handleSubmit(onSignInSubmit)}
            className="space-y-4"
          >
            <InputField
              label="Admin Email"
              type="email"
              placeholder="admin@vortexcodelabs.com"
              icon={<Mail className="w-4 h-4 text-zinc-400" />}
              error={signInErrors.email?.message}
              {...signInForm.register("email")}
            />

            <InputField
              label="Master Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4 text-zinc-400" />}
              error={signInErrors.password?.message}
              {...signInForm.register("password")}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-xs hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer pt-3 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating Admin...
                </>
              ) : (
                <>
                  Access Control Panel
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="text-xs text-zinc-500 text-center lg:text-left">
          Authorized personnel only. All access attempts are logged and monitored.
        </div>

      </div>

      {/* RIGHT SIDE: White & Red Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-rose-950 text-white relative flex-col justify-between p-12 lg:p-16 overflow-hidden border-l border-rose-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="relative z-10 flex items-center gap-2 bg-rose-900/60 border border-rose-800 px-4 py-2 rounded-full w-max text-xs font-medium text-rose-200 backdrop-blur-md">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Zero-Trust Architecture Enforced</span>
        </div>

        <div className="relative z-10 mt-10 mb-auto w-full max-w-lg mx-auto flex flex-col items-center text-center space-y-6">
          <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-rose-800/80 shadow-2xl bg-rose-900/40 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#fda4af_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
            <div className="relative z-10 p-8 space-y-4">
              <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto text-white">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">System Core Safeguarded</h3>
              <p className="text-xs text-rose-200/80 max-w-xs mx-auto">
                Direct route concealment prevents automated bot enumeration and brute-force intrusion vectors.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Command & Control Center.
            </h2>
            <p className="text-rose-200/80 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Supervise clinical operations, manage practitioner permissions, and audit appointment metrics.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-rose-900/80 flex items-center justify-between text-xs text-rose-300/80">
          <div>
            <span className="block font-bold text-lg text-white">RBAC</span>
            <span>Role Based Access</span>
          </div>
          <div>
            <span className="block font-bold text-lg text-white">SHA-256</span>
            <span>Token Security</span>
          </div>
          <div>
            <span className="block font-bold text-lg text-white">24/7</span>
            <span>Audit Logging</span>
          </div>
        </div>
      </div>

    </div>
  );
}