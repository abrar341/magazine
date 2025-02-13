import Magazine from "../../../models/Magazine";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // await connectToDatabase();

        const magazines = await Magazine.find();

        console.log("magazines", magazines);

        console.log("Magazines with Plans:", JSON.stringify(magazines, null, 2));


        console.log("Fetched Magazines:", magazines); // Debugging output

        if (!magazines || magazines.length === 0) {
            return res.status(404).json({ error: "No magazines found." });
        }

        res.status(200).json({ magazines });
    } catch (error) {
        console.error("Error fetching magazines:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}
