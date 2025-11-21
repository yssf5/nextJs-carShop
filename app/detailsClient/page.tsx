"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Client_Interface } from "../models/Client";

export default function ClientDetailsPage() {
    const [client, setClient] = useState<Client_Interface | null>(null);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const clientId = searchParams.get("id");

    useEffect(() => {
        if (clientId) fetchClient();
    }, [clientId]);

    async function fetchClient() {
        try {
            const response = await fetch("/api/clients");
            const clients: Client_Interface[] = await response.json();
            const foundClient = clients.find((c: any) => c._id === clientId);
            setClient(foundClient || null);
        } catch (err) {
            console.error("Error fetching client:", err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (!client) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Client Not Found</h2>
                <Link href="/clients" className="text-primary hover:underline">Return to list</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen p-8 bg-secondary/30">
            <div className="max-w-5xl mx-auto">
                <Link href="/clients" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 transition-colors">
                    ← Back to Clients
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="card p-8 bg-card shadow-lg text-center">
                            <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto flex items-center justify-center text-primary text-4xl font-bold mb-4">
                                {client.nom[0]}{client.prenom[0]}
                            </div>
                            <h1 className="text-2xl font-bold mb-1">{client.nom} {client.prenom}</h1>
                            <p className="text-muted-foreground mb-6">Client ID: <span className="font-mono text-xs">{(client as any)._id}</span></p>

                            <div className="flex justify-center gap-2">
                                <Link
                                    href={`/updateClient?id=${(client as any)._id}`}
                                    className="btn-primary w-full"
                                >
                                    Edit Profile
                                </Link>
                            </div>
                        </div>

                        <div className="card p-6 bg-card shadow-sm mt-6">
                            <h3 className="font-semibold mb-4 border-b border-border pb-2">Contact Info</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-muted-foreground block">Phone</span>
                                    <span className="font-medium">{client.tel || "N/A"}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground block">Age</span>
                                    <span className="font-medium">{client.age || "N/A"} years</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Address Card */}
                        <div className="card p-6 bg-card shadow-sm">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="text-2xl">📍</span> Address
                            </h2>
                            {client.adresse ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <span className="text-muted-foreground block text-sm">Street</span>
                                        <span className="font-medium text-lg">{client.adresse.rue || "N/A"}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground block text-sm">City</span>
                                        <span className="font-medium text-lg">{client.adresse.ville || "N/A"}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground block text-sm">Postal Code</span>
                                        <span className="font-medium text-lg">{client.adresse.codePostal || "N/A"}</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground italic">No address information available.</p>
                            )}
                        </div>

                        {/* Purchase History Card */}
                        <div className="card p-6 bg-card shadow-sm">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="text-2xl">🚗</span> Purchase History
                            </h2>

                            {client.voitureAchetees && client.voitureAchetees.voitures && client.voitureAchetees.voitures.length > 0 ? (
                                <div className="space-y-4">
                                    {client.voitureAchetees.voitures.map((voiture, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                                            <div>
                                                <p className="font-bold">Vehicle Code: {voiture.code}</p>
                                                {voiture.details && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {voiture.details.couleur && <span className="mr-3">Color: {voiture.details.couleur}</span>}
                                                        {voiture.details.dateAchat && <span>Date: {voiture.details.dateAchat}</span>}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                                                ✓
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-secondary/20 rounded-lg border border-dashed border-border">
                                    <p className="text-muted-foreground">No purchase history found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
