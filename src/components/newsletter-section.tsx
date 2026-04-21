"use client";

import { FormEvent, useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setEmail("");
    }, 2200);
  };

  return (
    <section className="section-padding bg-pastel-blue/40">
      <div className="content-max-width">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold md:text-4xl">Sumate al Club Plateritos</h2>
          <p className="mt-3 text-base text-[var(--ink-soft)]">
            Recibi novedades, descuentos exclusivos y promociones especiales.
          </p>
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Tu email"
              className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3.5 outline-none focus:border-[var(--primary)]"
              required
            />
            <button
              type="submit"
              className={`rounded-xl px-6 py-3.5 font-semibold text-white ${
                done ? "bg-emerald-500" : "bg-[var(--primary)] hover:bg-[var(--primary-dark)]"
              }`}
            >
              {done ? "Suscrito" : "Suscribirme"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
