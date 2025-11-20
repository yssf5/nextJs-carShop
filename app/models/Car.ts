import mongoose, { Document, Schema, Model } from "mongoose";

export interface Ingenieur_Interface {
  nom: string;
  role: string;
}

export interface Specs_Interface {
  price?: number;
  horsepower?: number;
  gearBox?: string;
}

export interface Car_Interface extends Document {// extend deocument bich yzid createedaT _id,  3ibarz 9olt this is object not just a field its a mongodb document
_id: string;
  brand: string;
  name: string;
  annee?: number;
  code: string;
  details?: {
    ingenieurs?: Ingenieur_Interface[];
    specs?: Specs_Interface;
  };
}

////////Shemas///////////

const IngenieurSchma = new Schema<Ingenieur_Interface>({
    nom:String,
    role:String,
});

const SpecsSchema = new Schema<Specs_Interface>({
  price: Number,
  horsepower: Number,
  gearBox: String,
});


const CarSchema = new Schema<Car_Interface>({
  brand: String,
  name:String,
  annee: Number,
  code:String,
  details: {
    ingenieurs: [IngenieurSchma],
    specs: SpecsSchema,
  },
});

const Car:Model<Car_Interface> = mongoose.models.Car || mongoose.model("Car",CarSchema);// model y5alik ta3mil haka find save updateone etc
//create a model named Car using CarSchema and typed as Car_Interface
export default Car;




