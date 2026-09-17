"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "../../lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      window.location.assign("/dashboard");
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="authPage">
      <div className="authPanel">
        <Link href="/" className="authBrand"><span className="brandMark">N</span><span>NOVA CAPITAL</span></Link>
        <div className="authCard">
          <p className="eyebrow">PRIVATE CLIENT ACCESS</p>
          <h1>Welcome back</h1>
          <p className="authIntro">Sign in to access your Nova Capital account.</p>

          <form onSubmit={handleSubmit} className="authForm">
            <label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></label>
            <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></label>
            {error && <p className="authError" role="alert">{error}</p>}
            <button className="goldBtn authSubmit" type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
          </form>

          <p className="authSwitch">Don't have an account? <Link href="/register">Open an account</Link></p>
          <Link href="/" className="backLink">← Back to Nova Capital</Link>
        </div>
      </div>
    </main>
  );
}
