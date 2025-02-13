import connectToDatabase from "../../../utils/db";
import Magazine from "../../../models/Magazine";
import mongoose from "mongoose";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        await connectToDatabase();

        const { magazines } = req.body; // Get data from request body

        if (!magazines || !Array.isArray(magazines) || magazines.length === 0) {
            return res.status(400).json({ error: "Invalid magazine data." });
        }

        // Convert plan IDs to ObjectId format
        const magazinesWithObjectIds = magazines.map(magazine => ({
            ...magazine,
            plans: magazine.plans.map(id => new mongoose.Types.ObjectId(id))
        }));

        // Check if magazines already exist
        const existingMagazines = await Magazine.find();
        if (existingMagazines.length > 0) {
            return res.status(400).json({ error: "Magazines already exist." });
        }

        // Insert into database
        await Magazine.insertMany(magazinesWithObjectIds);

        res.status(201).json({ message: "Magazines created successfully.", magazines: magazinesWithObjectIds });
    } catch (error) {
        console.error("Error creating magazines:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}
