import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="text-center mb-16 space-y-4">
        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Car Shop Manager
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The premium solution for managing your exclusive vehicle inventory and elite clientele.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Link
          href="/cars"
          className="group card p-8 hover:border-primary/50 hover:shadow-primary/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              Cars
              <span className="text-primary transition-transform group-hover:translate-x-1">→</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Manage your inventory. Track specifications, engineers, and pricing for every vehicle.
            </p>
          </div>
        </Link>

        <Link
          href="/clients"
          className="group card p-8 hover:border-purple-500/50 hover:shadow-purple-500/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              Clients
              <span className="text-purple-500 transition-transform group-hover:translate-x-1">→</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Manage your customer base. Track purchases, contact details, and preferences.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
