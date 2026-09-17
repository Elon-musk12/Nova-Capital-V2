"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "../../lib/supabase-browser";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session) {
        window.location.assign("/dashboard");
      } else {
        setMessage("Account created. Check your email to confirm your address, then sign in.");
      }
    } catch {
      setError("Unable to create your account right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="authPage">
      <div className="authPanel">
        <Link href="/" className="authBrand"><span className="brandMark">N</span><span>NOVA CAPITAL</span></Link>
        <div className="authCard">
          <p className="eyebrow">PRIVATE CLIENT ONBOARDING</p>
          <h1>Open an account</h1>
          <p className="authIntro">Create your Nova Capital account to get started.</p>

          <form onSubmit={handleSubmit} className="authForm">
            <label>Full name<input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" required /></label>
            <label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></label>
            <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" minLength={8} required /></label>
            <label>Confirm password<input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" minLength={8} required /></label>
            {error && <p className="authError" role="alert">{error}</p>}
            {message && <p className="authSuccess" role="status">{message}</p>}
            <button className="goldBtn authSubmit" type="submit" disabled={loading}>{loading ? "Creating account…" : "Create account"}</button>
          </form>

          <p className="authSwitch">Already have an account? <Link href="/login">Sign in</Link></p>
          <Link href="/" className="backLink">← Back to Nova Capital</Link>
        </div>
      </div>
    </main>
  );
}
