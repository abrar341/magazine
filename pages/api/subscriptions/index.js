import authMiddleware from "../../../middleware/authMiddleware";
import Subscription from "../../../models/Subscription";
import connectToDatabase from "../../../utils/db";
export default async function handler(req, res) {
    authMiddleware(req, res, async () => {
        if (req.method !== "GET") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        try {
            await connectToDatabase();
            // const userId = "67adde244e51723c70d80ff9"; // Now req.user should exist
            const userId = req.user.userId; // Now req.user should exist

            const subscriptions = await Subscription.find({ user_id: userId })
                .populate("magazine_id plan_id");

            res.status(200).json({ subscriptions });
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
