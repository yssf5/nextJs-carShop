"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Engineer {
  nom: string;
  role: string;
}

interface Specs {
  price?: number;
  horsepower?: number;
  gearBox?: string;
}

interface CarDetails {
  specs?: Specs;
  ingenieurs?: Engineer[];
}

interface Car {
  _id: string;
  brand: string;
  name: string;
  annee?: number;
  code: string;
  details?: CarDetails;
}

interface FormData {
  brand: string;
  name: string;
  annee: string;
  code: string;
  price: string;
  horsepower: string;
  gearBox: string;
  engineerName: string;
  engineerRole: string;
}

export default function UpdateCarPage() {
  const [car, setCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState<FormData>({
    brand: "",
    name: "",
    annee: "",
    code: "",
    price: "",
    horsepower: "",
    gearBox: "",
    engineerName: "",
    engineerRole: ""
  });
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const carId = searchParams.get("id");

  useEffect(() => {
    if (carId) fetchCar();
  }, [carId]);

  async function fetchCar() {
    try {
      const response = await fetch("/api/cars");
      const cars: Car[] = await response.json();
      const foundCar = cars.find((c: Car) => c._id === carId);
      
      if (foundCar) {
        setCar(foundCar);
        setFormData({
          brand: foundCar.brand || "",
          name: foundCar.name || "",
          annee: foundCar.annee?.toString() || "",
          code: foundCar.code || "",
          price: foundCar.details?.specs?.price?.toString() || "",
          horsepower: foundCar.details?.specs?.horsepower?.toString() || "",
          gearBox: foundCar.details?.specs?.gearBox || "",
          engineerName: foundCar.details?.ingenieurs?.[0]?.nom || "",
          engineerRole: foundCar.details?.ingenieurs?.[0]?.role || ""
        });
      }
    } catch (err) {
      console.error("Error fetching car:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const carData = {
      _id: carId,
      brand: formData.brand,
      name: formData.name,
      annee: formData.annee ? Number(formData.annee) : undefined,
      code: formData.code,
      details: {
        specs: {
          price: formData.price ? Number(formData.price) : undefined,
          horsepower: formData.horsepower ? Number(formData.horsepower) : undefined,
          gearBox: formData.gearBox || undefined
        },
        ingenieurs: formData.engineerName ? [{
          nom: formData.engineerName,
          role: formData.engineerRole
        }] : []
      }
    };

    try {
      const response = await fetch("/api/cars", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        window.location.href = "/cars";
      }
    } catch (err) {
      console.error("Error updating car:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading car...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="p-8">
        <p>Car not found</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link href="/cars" className="bg-gray-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Back to Cars
      </Link>
      
      <h1 className="text-2xl font-bold mb-4">Update Car: {car.brand} {car.name}</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Brand *</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Year</label>
          <input
            type="number"
            name="annee"
            value={formData.annee}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Code *</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Horsepower</label>
          <input
            type="number"
            name="horsepower"
            value={formData.horsepower}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Gear Box</label>
          <select name="gearBox" value={formData.gearBox} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Select gear box</option>
            <option value="manual">Manual</option>
            <option value="auto">Automatic</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Engineer Name</label>
          <input
            type="text"
            name="engineerName"
            value={formData.engineerName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Engineer Role</label>
          <input
            type="text"
            name="engineerRole"
            value={formData.engineerRole}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Car"}
        </button>
      </form>
    </div>
  );
}