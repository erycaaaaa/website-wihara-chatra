// app/beranda/Newsletter.tsx
"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    // TODO: kirim ke API / service newsletter kamu
    setStatus("success");
  };

  return (
    <section className="py-16 border-t border-zinc-100">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-8 md:p-12 text-center">
          <h3 className="text-2xl font-semibold">
            Get Your Travel Inspiration Straight to Your Inbox
          </h3>
          <p className="text-zinc-600 mt-2">
            Subscribe for new stories, curated guides, and exclusive promos.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-6 mx-auto max-w-xl grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-11 rounded-full border border-zinc-300 px-4 outline-none focus:ring-2 focus:ring-black/10"
            />
            <button
              className="h-11 rounded-full bg-black text-white px-6 text-sm font-medium hover:bg-zinc-800"
              type="submit"
            >
              Subscribe
            </button>
          </form>

          <p className="text-xs text-zinc-500 mt-3">
            By subscribing, you agree to receive emails and accept our{" "}
            <a className="underline" href="#">
              Privacy Policy
            </a>
            .
          </p>

          {status === "success" && (
            <p className="mt-3 text-sm text-green-700">Thanks for subscribing!</p>
          )}
        </div>
      </div>
    </section>
  );
}
