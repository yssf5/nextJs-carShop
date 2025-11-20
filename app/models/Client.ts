import mongoose, { Document, Schema, Model } from "mongoose";

export interface VoitureAchetee_Interface {
  code: string;
  details?: {
    couleur?: string;
    dateAchat?: string;
  };
}

export interface Adresse_Interface {
  rue?: string;
  ville?: string;
  codePostal?: string;
}

export interface Client_Interface extends Document {
  nom: string;
  prenom: string;
  age?: number;
  tel?: number;
  adresse?: Adresse_Interface;
  voitureAchetees?: { voitures: VoitureAchetee_Interface[] };
}

const VoitureAcheteeSchema = new Schema<VoitureAchetee_Interface>({
  code: String,
  details: {
    couleur: String,
    dateAchat: String,
  },
});

const AdresseSchema = new Schema<Adresse_Interface>({
  rue: String,
  ville: String,
  codePostal: String,
});

const ClientSchema = new Schema<Client_Interface>({
  nom: String,
  prenom: String,
  age: Number,
  tel: Number,
  adresse: AdresseSchema,
  voitureAchetees: { voitures: [VoitureAcheteeSchema] },
});

const Client: Model<Client_Interface> =
  mongoose.models.Client || mongoose.model("Client", ClientSchema);
export default Client;
