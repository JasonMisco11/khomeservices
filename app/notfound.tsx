"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <span className="text-[150px] font-bold text-slate-100 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-brand-orange/10 flex items-center justify-center">
                <Search className="w-10 h-10 text-brand-orange" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-semibold text-brand-navy mb-3">
          Page not found
        </h1>
        <p className="text-slate-600 mb-8 max-w-sm mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved, deleted, or never existed.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors w-full sm:w-auto cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-navy text-white text-sm font-medium rounded-xl hover:shadow-[0_20px_50px_rgba(25,31,34,0.3)] transition-colors w-full sm:w-auto"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Help Link */}
        <p className="mt-8 text-sm text-slate-500">
          Need help?{" "}
          <a
            href="mailto:support@homeserv.com"
            className="text-brand-orange hover:text-brand-purple font-medium transition-colors"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
