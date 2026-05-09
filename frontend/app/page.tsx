import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-6">
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Shelby Storage
        </h1>

        <p className="text-slate-400 text-lg">
          Decentralized File Upload Dashboard
        </p>

        <Link
          href="/dashboard"
          className="inline-block bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl text-lg font-medium"
        >
          Open Dashboard
        </Link>
      </div>
    </main>
  );
}