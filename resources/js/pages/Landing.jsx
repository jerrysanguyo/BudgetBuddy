import React from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import logo from "@/assets/images/logo.webp";

const features = [
    {
        title: "Track spending in seconds",
        desc: "Add income & expenses fast, then let your dashboard do the thinking.",
        icon: "💸",
    },
    {
        title: "Smart categories",
        desc: "Food, bills, fun, savings—customize categories that match your lifestyle.",
        icon: "🧩",
    },
    {
        title: "Goals that feel achievable",
        desc: "Set targets and watch progress climb with friendly nudges.",
        icon: "🎯",
    },
    {
        title: "Simple insights",
        desc: "Clear charts and summaries, designed for humans—not accountants.",
        icon: "📊",
    },
];

const stats = [
    { label: "Avg. time to add a transaction", value: "< 10 sec" },
    { label: "Budget categories supported", value: "Unlimited" },
    { label: "Monthly overview", value: "One glance" },
];

export default function Landing() {
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;

        el.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
                <div className="absolute top-24 -right-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-200/30 blur-3xl" />
            </div>

            <header className="relative">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
                    <Link
                        href={route("landing")}
                        className="group inline-flex items-center gap-2"
                    >
                        <span className="flex items-center transition group-hover:-rotate-3">
                            <img
                                src={logo}
                                alt="BudgetBuddy Logo"
                                className="h-12 w-auto object-contain sm:h-24"
                            />
                        </span>
                        <div className="leading-tight">
                            <div className="text-base font-extrabold tracking-tight">
                                BudgetBuddy
                            </div>
                            <div className="text-xs text-slate-500">
                                Playful budget tracking
                            </div>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
                        <button
                            type="button"
                            onClick={() => scrollToSection("features")}
                            className="hover:text-slate-900"
                        >
                            Features
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection("how")}
                            className="hover:text-slate-900"
                        >
                            How it works
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection("faq")}
                            className="hover:text-slate-900"
                        >
                            FAQ
                        </button>

                        <div className="ml-2 flex items-center gap-3">
                            <Link
                                href={route("login")}
                                className="rounded-full px-4 py-2 hover:bg-slate-100"
                            >
                                Sign in
                            </Link>
                            <Link
                                href={route("register")}
                                className="rounded-full bg-slate-900 px-4 py-2 font-semibold text-white shadow-sm hover:bg-slate-800"
                            >
                                Get started
                            </Link>
                        </div>
                    </nav>

                    <Link
                        href={route("register")}
                        className="sm:hidden rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm"
                    >
                        Start
                    </Link>
                </div>
            </header>

            <main className="relative">
                <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
                    <div className="grid items-center gap-10 lg:grid-cols-2">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-100">
                                    ✨
                                </span>
                                Your money, but make it cute.
                            </div>

                            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
                                Budgeting that feels like a{" "}
                                <span className="relative">
                                    game
                                    <span className="absolute -bottom-1 left-0 h-3 w-full rounded-full bg-rose-200/70 -z-10" />
                                </span>
                                , not a chore.
                            </h1>

                            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                                Track expenses, set goals, and understand your
                                spending with a clean dashboard, playful UI, and
                                zero overwhelm.
                            </p>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Link
                                    href={route("register")}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                                >
                                    Create your budget
                                    <span aria-hidden>→</span>
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => scrollToSection("features")}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                                >
                                    See what you get
                                    <span aria-hidden>👀</span>
                                </button>
                            </div>

                            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {stats.map((s) => (
                                    <div
                                        key={s.label}
                                        className="rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200 backdrop-blur"
                                    >
                                        <div className="text-sm font-extrabold">
                                            {s.value}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-500">
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-[2rem] bg-white/80 p-5 shadow-lg ring-1 ring-slate-200 backdrop-blur">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-semibold text-slate-700">
                                            Monthly Overview
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            February
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                                        <span>🟢</span> On track
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                                        <div className="text-xs text-slate-500">
                                            Income
                                        </div>
                                        <div className="mt-1 text-2xl font-black tracking-tight">
                                            ₱52,000
                                        </div>
                                        <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
                                            <div className="h-2 w-4/5 rounded-full bg-emerald-400" />
                                        </div>
                                        <div className="mt-2 text-xs text-slate-500">
                                            +5% vs last month
                                        </div>
                                    </div>

                                    <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                                        <div className="text-xs text-slate-500">
                                            Spent
                                        </div>
                                        <div className="mt-1 text-2xl font-black tracking-tight">
                                            ₱31,450
                                        </div>
                                        <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
                                            <div className="h-2 w-3/5 rounded-full bg-rose-400" />
                                        </div>
                                        <div className="mt-2 text-xs text-slate-500">
                                            60% of budget
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm font-semibold">
                                            Top categories
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            This month
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-3">
                                        {[
                                            {
                                                name: "Food & Drinks",
                                                pct: 42,
                                                emoji: "🍜",
                                            },
                                            {
                                                name: "Bills",
                                                pct: 28,
                                                emoji: "🧾",
                                            },
                                            {
                                                name: "Transport",
                                                pct: 18,
                                                emoji: "🚌",
                                            },
                                        ].map((c) => (
                                            <div
                                                key={c.name}
                                                className="flex items-center gap-3"
                                            >
                                                <div className="grid h-9 w-9 place-items-center rounded-2xl bg-white ring-1 ring-slate-200">
                                                    {c.emoji}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="font-semibold">
                                                            {c.name}
                                                        </span>
                                                        <span className="text-slate-500">
                                                            {c.pct}%
                                                        </span>
                                                    </div>
                                                    <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                                                        <div
                                                            className="h-2 rounded-full bg-indigo-400"
                                                            style={{
                                                                width: `${c.pct}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                    {[
                                        "No spreadsheets",
                                        "No stress",
                                        "Cute insights",
                                        "Fast input",
                                    ].map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="absolute -bottom-6 left-6 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                                🐣 Tip: Start with just 3 categories.
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="features"
                    className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">
                                Everything you need, nothing you don’t
                            </h2>
                            <p className="mt-2 max-w-2xl text-slate-600">
                                Clean flows, friendly visuals, and focus on what
                                matters: clarity.
                            </p>
                        </div>
                        <Link
                            href={route("register")}
                            className="inline-flex w-fit items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                        >
                            Try it free →
                        </Link>
                    </div>

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="group rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-slate-200 backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm transition group-hover:-rotate-6">
                                    <span className="text-xl">{f.icon}</span>
                                </div>
                                <div className="mt-4 text-lg font-extrabold">
                                    {f.title}
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section
                    id="how"
                    className="mx-auto max-w-6xl px-4 pb-16 sm:px-6"
                >
                    <div className="rounded-[2rem] bg-white/80 p-8 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                        <h2 className="text-3xl font-black tracking-tight">
                            How it works
                        </h2>
                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            {[
                                {
                                    step: "1",
                                    title: "Create categories",
                                    desc: "Pick the buckets you actually use: bills, food, savings, and fun.",
                                    emoji: "🧺",
                                },
                                {
                                    step: "2",
                                    title: "Add transactions",
                                    desc: "Income or expense—quick entry, no complicated forms.",
                                    emoji: "⚡",
                                },
                                {
                                    step: "3",
                                    title: "See the story",
                                    desc: "Your dashboard shows trends and helps you adjust with confidence.",
                                    emoji: "🧠",
                                },
                            ].map((s) => (
                                <div
                                    key={s.step}
                                    className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white font-black">
                                            {s.step}
                                        </div>
                                        <div className="text-2xl">
                                            {s.emoji}
                                        </div>
                                    </div>
                                    <div className="mt-4 text-lg font-extrabold">
                                        {s.title}
                                    </div>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                        {s.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    id="faq"
                    className="mx-auto max-w-6xl px-4 pb-24 sm:px-6"
                >
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-[2rem] bg-white/80 p-8 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                            <h2 className="text-3xl font-black tracking-tight">
                                FAQ
                            </h2>
                            <div className="mt-6 space-y-4">
                                {[
                                    {
                                        q: "Can I use it on mobile?",
                                        a: "Yes—this layout is responsive by default. Your app UI can follow the same approach.",
                                    },
                                    {
                                        q: "Is this connected to banks?",
                                        a: "Not by default. Start manual for clarity. You can add integrations later if you want.",
                                    },
                                    {
                                        q: "Can I export reports?",
                                        a: "Absolutely. In Laravel, you can integrate exports (CSV/Excel) later as a feature.",
                                    },
                                ].map((x) => (
                                    <div
                                        key={x.q}
                                        className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200"
                                    >
                                        <div className="font-extrabold">
                                            {x.q}
                                        </div>
                                        <p className="mt-1 text-sm text-slate-600">
                                            {x.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-sm">
                            <h3 className="text-2xl font-black tracking-tight">
                                Ready to make budgeting feel easy?
                            </h3>
                            <p className="mt-3 text-white/80">
                                Start small. Track for a week. You’ll be
                                surprised how much clarity you get.
                            </p>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href={route("register")}
                                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
                                >
                                    Create account →
                                </Link>
                                <Link
                                    href={route("login")}
                                    className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
                                >
                                    I already have one
                                </Link>
                            </div>

                            <div className="mt-8 rounded-3xl bg-white/10 p-5 ring-1 ring-white/15">
                                <div className="text-sm font-semibold">
                                    Pro tip
                                </div>
                                <p className="mt-1 text-sm text-white/80">
                                    Build your MVP with: Categories →
                                    Transactions → Monthly Summary. Everything
                                    else can be added later.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="relative border-t border-slate-200/70 bg-white/70 backdrop-blur">
                    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                            {/* Brand */}
                            <div className="flex items-center gap-3">
                                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                                    💰
                                </span>

                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-slate-900">
                                        BudgetBuddy
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        © {new Date().getFullYear()} • All
                                        rights reserved
                                    </span>
                                </div>
                            </div>

                            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                                <button
                                    type="button"
                                    onClick={() => scrollToSection("features")}
                                    className="transition hover:text-slate-900"
                                >
                                    Features
                                </button>

                                <button
                                    type="button"
                                    onClick={() => scrollToSection("how")}
                                    className="transition hover:text-slate-900"
                                >
                                    How it works
                                </button>

                                <button
                                    type="button"
                                    onClick={() => scrollToSection("faq")}
                                    className="transition hover:text-slate-900"
                                >
                                    FAQ
                                </button>
                            </nav>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
