import React, { useMemo, useState } from "react";
import { Link } from "@inertiajs/react";
import logo from "@/assets/images/logo.webp";

export default function Register() {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        contact_number: "",
        password: "",
        password_confirmation: "",
    });

    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const canSubmit = useMemo(() => {
        return (
            form.full_name.trim().length >= 2 &&
            /^\S+@\S+\.\S+$/.test(form.email) &&
            form.contact_number.trim().length >= 7 &&
            form.password.length >= 8 &&
            form.password === form.password_confirmation
        );
    }, [form]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
        setServerMessage("");
    };

    const submit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});
        setServerMessage("");

        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
                body: JSON.stringify({
                    full_name: form.full_name,
                    email: form.email,
                    contact_number: form.contact_number,
                    password: form.password,
                    password_confirmation: form.password_confirmation,
                }),
            });

            if (res.status === 422) {
                const data = await res.json();
                setErrors(data?.errors || {});
                return;
            }

            if (!res.ok) {
                const text = await res.text();
                setServerMessage("Something went wrong. Please try again.");
                console.error(text);
                return;
            }

            window.location.href = "/login";
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
                        href={route("landing")}
                        className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-white/70 hover:text-slate-900 hover:ring-1 hover:ring-slate-200"
                    >
                        <span aria-hidden>←</span>
                        Back
                    </Link>
                </div>
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <Link
                            href={route("landing")}
                            className="inline-flex items-center justify-center gap-2"
                        >
                            <span className="flex items-center transition group-hover:-rotate-3">
                                <img
                                    src={logo}
                                    alt="BudgetBuddy Logo"
                                    className="h-12 w-auto object-contain sm:h-24"
                                />
                            </span>
                        </Link>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">
                            Create your account
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Start tracking your budget in a cute, simple way.
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
                                    Full name
                                </label>
                                <input
                                    name="full_name"
                                    value={form.full_name}
                                    onChange={onChange}
                                    placeholder="e.g., Juan Dela Cruz"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-200/50"
                                />
                                <FieldError name="full_name" />
                            </div>
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
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-200/50"
                                />
                                <FieldError name="email" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Contact number
                                </label>
                                <input
                                    name="contact_number"
                                    value={form.contact_number}
                                    onChange={onChange}
                                    placeholder="e.g., 09xxxxxxxxx"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-200/50"
                                />
                                <div className="mt-1 text-xs text-slate-500">
                                    Tip: include country code if needed (e.g.
                                    +63).
                                </div>
                                <FieldError name="contact_number" />
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
                                        placeholder="Minimum 8 characters"
                                        className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
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
                            <div>
                                <label className="text-sm font-semibold text-slate-700">
                                    Confirm password
                                </label>
                                <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 focus-within:border-slate-300 focus-within:ring-4 focus-within:ring-slate-200/50">
                                    <input
                                        type={showPass2 ? "text" : "password"}
                                        name="password_confirmation"
                                        value={form.password_confirmation}
                                        onChange={onChange}
                                        placeholder="Re-type your password"
                                        className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass2((v) => !v)}
                                        className="rounded-xl px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                    >
                                        {showPass2 ? "Hide" : "Show"}
                                    </button>
                                </div>

                                {form.password_confirmation.length > 0 &&
                                form.password !== form.password_confirmation ? (
                                    <div className="mt-1 text-xs font-semibold text-rose-600">
                                        Passwords do not match.
                                    </div>
                                ) : null}

                                <FieldError name="password_confirmation" />
                            </div>

                            <button
                                type="submit"
                                disabled={!canSubmit || submitting}
                                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {submitting ? "Creating..." : "Create account"}
                            </button>

                            <div className="pt-2 text-center text-sm text-slate-600">
                                Already have an account?{" "}
                                <Link
                                    href={route("login")}
                                    className="font-semibold text-slate-900 hover:underline"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="mt-6 text-center text-xs text-slate-500">
                        By creating an account, you agree to our Terms &
                        Privacy.
                    </div>
                </div>
            </div>
        </div>
    );
}
