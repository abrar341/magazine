import connectToDatabase from "../../utils/db";

export default async function handler(req, res) {
    await connectToDatabase(); // Connect to DB before handling requests

    if (req.method === "GET") {
        return res.status(200).json({ message: "Server is running!" });
    }

    return res.status(405).json({ error: "Method not allowed" });
}
