"use client";
import { useState } from "react";
import Link from "next/link";

export default function AddClientPage() {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        age: "",
        tel: "",
        rue: "",
        ville: "",
        codePostal: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const clientData = {
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
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clientData),
            });

            if (response.ok) {
                window.location.href = "/clients";
            }
        } catch (err) {
            console.error("Error adding client:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-secondary/30">
            <div className="max-w-2xl w-full">
                <Link href="/clients" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 transition-colors">
                    ← Back to Clients
                </Link>

                <div className="card p-8 bg-card shadow-lg">
                    <h1 className="text-2xl font-bold mb-6 border-b border-border pb-4">Add New Client</h1>

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
                                    placeholder="Doe"
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
                                    placeholder="John"
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
                                    placeholder="30"
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
                                    placeholder="123456789"
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
                                        placeholder="123 Main St"
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
                                            placeholder="New York"
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
                                            placeholder="10001"
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
                                {loading ? "Adding..." : "Create Client"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
