"use client";
import { useEffect, useState } from "react";
import { Client_Interface } from "../models/Client";
import Link from "next/link";

export default function ClientsPage() {
    const [clients, setClients] = useState<Client_Interface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchClients();
    }, []);

    async function fetchClients() {
        try {
            const response = await fetch("/api/clients");
            if (!response.ok) throw new Error("Failed to fetch clients");
            const data = await response.json();
            setClients(data);
        } catch (err) {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    }

    async function deleteClient(clientId: string) {
        if (!confirm("Are you sure you want to delete this client?")) return;

        try {
            const response = await fetch("/api/clients", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: clientId }),
            });

            if (!response.ok) throw new Error("Failed to delete client");

            // Remove from local state
            setClients(clients.filter(client => (client as any)._id !== clientId));
        } catch (err) {
            setError("Error deleting client");
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (error) return (
        <div className="p-8 text-center">
            <div className="bg-red-50 text-red-500 p-4 rounded-lg inline-block border border-red-200">
                Error: {error}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen p-8 bg-secondary/30">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
                        <p className="text-muted-foreground mt-1">Manage your customer database</p>
                    </div>

                    <Link href="/addClient" className="btn-primary flex items-center gap-2">
                        <span>+</span> Add Client
                    </Link>
                </div>

                {clients.length === 0 ? (
                    <div className="text-center py-16 bg-card rounded-xl border border-dashed border-border">
                        <p className="text-muted-foreground text-lg">No clients found.</p>
                        <Link href="/addClient" className="text-primary hover:underline mt-2 inline-block">
                            Create your first client
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clients.map((client) => (
                            <div key={(client as any)._id} className="card p-6 flex flex-col justify-between group hover:border-primary/30 transition-colors">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                            {client.nom[0]}{client.prenom[0]}
                                        </div>
                                        {client.age && (
                                            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-medium">
                                                {client.age} years
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold mb-1">{client.nom} {client.prenom}</h3>

                                    <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                                        {client.tel && (
                                            <div className="flex items-center gap-2">
                                                <span className="w-4 h-4 opacity-70">📞</span>
                                                {client.tel}
                                            </div>
                                        )}
                                        {client.adresse?.ville && (
                                            <div className="flex items-center gap-2">
                                                <span className="w-4 h-4 opacity-70">📍</span>
                                                {client.adresse.ville}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-border flex justify-between items-center opacity-80 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={`/detailsClient?id=${(client as any)._id}`}
                                        className="text-sm font-medium hover:text-primary transition-colors"
                                    >
                                        View Details
                                    </Link>

                                    <div className="flex gap-2">
                                        <Link
                                            href={`/updateClient?id=${(client as any)._id}`}
                                            className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-colors"
                                            title="Edit"
                                        >
                                            ✏️
                                        </Link>
                                        <button
                                            onClick={() => deleteClient((client as any)._id)}
                                            className="p-2 hover:bg-red-50 rounded-md text-muted-foreground hover:text-red-500 transition-colors"
                                            title="Delete"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
