"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Client_Interface } from "../models/Client";

export default function UpdateClientPage() {
    const [client, setClient] = useState<Client_Interface | null>(null);
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        age: "",
        tel: "",
        rue: "",
        ville: "",
        codePostal: ""
    });
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

            if (foundClient) {
                setClient(foundClient);
                setFormData({
                    nom: foundClient.nom || "",
                    prenom: foundClient.prenom || "",
                    age: foundClient.age?.toString() || "",
                    tel: foundClient.tel?.toString() || "",
                    rue: foundClient.adresse?.rue || "",
                    ville: foundClient.adresse?.ville || "",
                    codePostal: foundClient.adresse?.codePostal || ""
                });
            }
        } catch (err) {
            console.error("Error fetching client:", err);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const clientData = {
            _id: clientId,
            nom: formData.nom,
            prenom: formData.prenom,
            age: formData.age ? Number(formData.age) : undefined,
            tel: formData.tel ? Number(formData.tel) : undefined,
            adresse: {
                rue: formData.rue,
                ville: formData.ville,
                codePostal: formData.codePostal
            }
        };

        try {
            const response = await fetch("/api/clients", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clientData),
            });

            if (response.ok) {
                window.location.href = "/clients";
            }
        } catch (err) {
            console.error("Error updating client:", err);
        } finally {
            setLoading(false);
        }
    };

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
        <div className="min-h-screen flex items-center justify-center p-8 bg-secondary/30">
            <div className="max-w-2xl w-full">
                <Link href="/clients" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 transition-colors">
                    ← Back to Clients
                </Link>

                <div className="card p-8 bg-card shadow-lg">
                    <h1 className="text-2xl font-bold mb-6 border-b border-border pb-4">
                        Update Client: <span className="text-primary">{client.nom} {client.prenom}</span>
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-muted-foreground">Last Name (Nom) *</label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-muted-foreground">First Name (Prenom) *</label>
                                <input
                                    type="text"
                                    name="prenom"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-muted-foreground">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-muted-foreground">Telephone</label>
                                <input
                                    type="number"
                                    name="tel"
                                    value={formData.tel}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="bg-secondary/50 p-6 rounded-lg border border-border">
                            <h3 className="font-semibold mb-4 text-foreground">Address Details</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Street (Rue)</label>
                                    <input
                                        type="text"
                                        name="rue"
                                        value={formData.rue}
                                        onChange={handleChange}
                                        className="input-field"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-muted-foreground">City (Ville)</label>
                                        <input
                                            type="text"
                                            name="ville"
                                            value={formData.ville}
                                            onChange={handleChange}
                                            className="input-field"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-muted-foreground">Postal Code</label>
                                        <input
                                            type="text"
                                            name="codePostal"
                                            value={formData.codePostal}
                                            onChange={handleChange}
                                            className="input-field"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full md:w-auto min-w-[150px]"
                            >
                                {loading ? "Updating..." : "Update Client"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
