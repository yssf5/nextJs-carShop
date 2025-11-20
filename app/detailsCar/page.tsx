"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CarDetailsPage() {
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const carId = searchParams.get("id");

  useEffect(() => {
    if (carId) fetchCar();
  }, [carId]);

  async function fetchCar() {
    try {
      const response = await fetch("/api/cars");
      const cars = await response.json();
      const foundCar = cars.find((c: any) => c._id === carId);
      setCar(foundCar);
    } catch (err) {
      console.error("Error fetching car:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading car details...</p>
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
      
      <h1 className="text-2xl font-bold mb-4">{car.brand} {car.name}</h1>

      <div className="space-y-4">
        <div className="border p-4 rounded">
          <h2 className="text-lg font-bold mb-2">Basic Information</h2>
          <p><strong>Brand:</strong> {car.brand}</p>
          <p><strong>Name:</strong> {car.name}</p>
          <p><strong>Year:</strong> {car.annee || "N/A"}</p>
          <p><strong>Code:</strong> {car.code}</p>
          <p><strong>ID:</strong> {car._id}</p>
        </div>

        {car.details?.specs && (
          <div className="border p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Specifications</h2>
            {car.details.specs.price && <p><strong>Price:</strong> ${car.details.specs.price}</p>}
            {car.details.specs.horsepower && <p><strong>Horsepower:</strong> {car.details.specs.horsepower} HP</p>}
            {car.details.specs.gearBox && <p><strong>Gear Box:</strong> {car.details.specs.gearBox}</p>}
          </div>
        )}

        {car.details?.ingenieurs && car.details.ingenieurs.length > 0 && (
          <div className="border p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Engineers</h2>
            {car.details.ingenieurs.map((engineer: any, index: number) => (
              <div key={index} className="mb-2">
                <p><strong>Name:</strong> {engineer.nom}</p>
                <p><strong>Role:</strong> {engineer.role}</p>
              </div>
            ))}
          </div>
        )}

        
      </div>
    </div>
  );
}