import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: true,
    });

    const [showPass, setShowPass] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const canSubmit = useMemo(() => {
        return /^\S+@\S+\.\S+$/.test(form.email) && form.password.length >= 1;
    }, [form.email, form.password]);

    const onChange = (e) => {
        const { name, type, checked, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
        setServerMessage("");
    };

    const submit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});
        setServerMessage("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                }),
            });

            if (res.status === 422) {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
                if (data?.message) setServerMessage(data.message);
                return;
            }

            if (!res.ok) {
                const text = await res.text();
                console.error(text);
                setServerMessage("Something went wrong. Please try again.");
                return;
            }

            const data = await res.json();

            if (data?.token) {
                localStorage.setItem("auth_token", data.token);
            }

            window.location.href = "/dashboard";
        } catch (err) {
            console.error(err);
            setServerMessage("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const FieldError = ({ name }) => {
        if (!errors?.[name]?.length) return null;
        return (
            <div className="mt-1 text-xs font-semibold text-rose-600">
                {errors[name][0]}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
                <div className="absolute top-24 -right-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-200/30 blur-3xl" />
            </div>

            <div className="relative mx-auto flex max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
                <div className="absolute left-4 top-6 sm:left-6">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-white/70 hover:text-slate-900 hover:ring-1 hover:ring-slate-200"
                    >
                        <span aria-hidden>←</span>
                        Back
                    </Link>
                </div>
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2"
                        >
                            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                                💰
                            </span>
                        </Link>
                        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                            Welcome back
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Sign in to continue tracking your budget.
                        </p>
                    </div>

                    <div className="rounded-[2rem] bg-white/80 p-6 shadow-lg ring-1 ring-slate-200 backdrop-blur sm:p-8">
                        {serverMessage ? (
                            <div className="mb-4 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700 ring-1 ring-rose-200">
                                {serverMessage}
                            </div>
                        ) : null}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={onChange}
                                    placeholder="you@example.com"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-200/50"
                                    autoComplete="email"
                                />
                                <FieldError name="email" />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Password
                                </label>
                                <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 focus-within:border-slate-300 focus-within:ring-4 focus-within:ring-slate-200/50">
                                    <input
                                        type={showPass ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={onChange}
                                        placeholder="Your password"
                                        className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass((v) => !v)}
                                        className="rounded-xl px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                    >
                                        {showPass ? "Hide" : "Show"}
                                    </button>
                                </div>
                                <FieldError name="password" />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={form.remember}
                                        onChange={onChange}
                                        className="h-4 w-4 rounded border-slate-300"
                                    />
                                    Remember me
                                </label>

                                <a
                                    href="/forgot-password"
                                    className="text-sm font-semibold text-slate-900 hover:underline"
                                >
                                    Forgot?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={!canSubmit || submitting}
                                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {submitting ? "Signing in..." : "Sign in"}
                            </button>

                            <div className="pt-2 text-center text-sm text-slate-600">
                                New here?{" "}
                                <Link
                                    to="/register"
                                    className="font-semibold text-slate-900 hover:underline"
                                >
                                    Create an account
                                </Link>
                            </div>

                            <div className="flex items-center gap-3 py-2">
                                <div className="h-px flex-1 bg-slate-200" />
                                <span className="text-xs font-semibold text-slate-500">
                                    or
                                </span>
                                <div className="h-px flex-1 bg-slate-200" />
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setServerMessage(
                                        "Google login is not enabled yet.",
                                    )
                                }
                                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 active:scale-[0.99]"
                            >
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill="#EA4335"
                                        d="M24 9.5c3.54 0 6.7 1.23 9.2 3.25l6.9-6.9C35.9 2.3 30.3 0 24 0 14.7 0 6.7 5.4 2.8 13.2l8.4 6.5C13.3 13.1 18.2 9.5 24 9.5z"
                                    />
                                    <path
                                        fill="#4285F4"
                                        d="M46.1 24.5c0-1.6-.14-2.8-.44-4.1H24v7.8h12.7c-.26 2.1-1.7 5.3-4.9 7.4l7.6 5.9c4.4-4.1 6.7-10.1 6.7-17z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M11.2 28.3c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8L2.8 12.2C1 15.7 0 19.7 0 24s1 8.3 2.8 11.8l8.4-6.5z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M24 48c6.3 0 11.6-2.1 15.5-5.7l-7.6-5.9c-2 1.4-4.7 2.4-7.9 2.4-5.8 0-10.7-3.6-12.5-8.6l-8.4 6.5C6.7 42.6 14.7 48 24 48z"
                                    />
                                </svg>
                                Continue with Google
                            </button>

                            <div className="pt-2 text-center text-xs text-slate-500">
                                Tip: we’ll store your session token securely for
                                this device.
                            </div>
                        </form>
                    </div>

                    <div className="mt-6 text-center text-xs text-slate-500">
                        © {new Date().getFullYear()} BudgetBuddy
                    </div>
                </div>
            </div>
        </div>
    );
}
