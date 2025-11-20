"use client";
import { useEffect, useState } from "react";
import { Car_Interface } from "../models/Car";
import Link from "next/link";

export default function CarsPage() {
  const [cars, setCars] = useState<Car_Interface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      const response = await fetch("/api/cars");
      if (!response.ok) throw new Error("Failed to fetch cars");
      const data = await response.json();
      setCars(data);
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCar(carId: string) {
    if (!confirm("Are you sure you want to delete this car?")) return;
    
    try {
      const response = await fetch("/api/cars", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: carId }),
      });

      if (!response.ok) throw new Error("Failed to delete car");
      
      // Remove from local state
      setCars(cars.filter(car => car._id !== carId));
    } catch (err) {
      setError("Error deleting car");
    }
  }

  if (loading) return <div className="p-8"><p>Loading cars...</p></div>;
  if (error) return <div className="p-8"><p className="text-red-500">Error: {error}</p></div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cars List</h1>
      
      <Link href="/addCar" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add New Car
      </Link>

      {cars.length === 0 ? (
        <p>No cars found.</p>
      ) : (
        <ul className="space-y-2">
          {cars.map((car) => (
            <li key={car._id} className="border p-4 rounded">
              <strong>{car.brand} {car.name}</strong>
              {car.annee && <span> ({car.annee})</span>}
              {car.details?.specs?.price && <span> - ${car.details.specs.price}</span>}
              <div className="text-sm text-gray-600">Code: {car.code}</div>
              
              <div className="mt-2 space-x-2">
                <Link href={`/detailsCar?id=${car._id}`} className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                  Details
                </Link>
                <Link href={`/updateCar?id=${car._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">
                  Update
                </Link>
                <button 
                  onClick={() => deleteCar(car._id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}