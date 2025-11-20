import connectToDatabase from "../../lib/mongodb";
import Car from "../../models/Car";

export async function GET() {
  try {
    await connectToDatabase();
    const cars = await Car.find({});
    return Response.json(cars);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newCar = await Car.create(body);
    return Response.json(newCar, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { _id, ...rest } = body;

  if (!_id)
    return Response.json({ error: "_id required" }, { status: 400 });

  const updatedCar = await Car.findByIdAndUpdate(_id, rest, { new: true });
  return Response.json(updatedCar);
}


export async function DELETE(req: Request) {
  const body = await req.json();
  const { _id } = body;

  if (!_id)
    return Response.json({ error: "_id required" }, { status: 400 });

  await Car.findByIdAndDelete(_id);
  return Response.json({ message: "Car deleted" });
}

