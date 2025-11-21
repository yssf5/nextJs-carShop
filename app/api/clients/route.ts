import connectToDatabase from "../../lib/mongodb";
import Client from "../../models/Client";

export async function GET() {
    try {
        await connectToDatabase();
        const clients = await Client.find({});
        return Response.json(clients);
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const newClient = await Client.create(body);
        return Response.json(newClient, { status: 201 });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const { _id, ...rest } = body;

        if (!_id)
            return Response.json({ error: "_id required" }, { status: 400 });

        const updatedClient = await Client.findByIdAndUpdate(_id, rest, { new: true });
        return Response.json(updatedClient);
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const { _id } = body;

        if (!_id)
            return Response.json({ error: "_id required" }, { status: 400 });

        await Client.findByIdAndDelete(_id);
        return Response.json({ message: "Client deleted" });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
