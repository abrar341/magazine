import connectToDatabase from "../../../utils/db";
import Subscription from "../../../models/Subscription";
import authMiddleware from "../../../middleware/authMiddleware";

export default async function handler(req, res) {
    authMiddleware(req, res, async () => {
        if (req.method !== "DELETE") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        try {
            await connectToDatabase();
            const userId = req.user.userId; // Authenticated user
            const { magazine_id } = req.body;

            if (!magazine_id) {
                return res.status(400).json({ error: "Magazine ID is required." });
            }

            // Find active subscription for this user and magazine
            const existingSubscription = await Subscription.findOne({
                user_id: userId,
                magazine_id,
                is_active: true,
            });

            if (!existingSubscription) {
                return res.status(404).json({ error: "Active subscription not found." });
            }

            // Set is_active to false instead of deleting
            existingSubscription.is_active = false;
            await existingSubscription.save();

            res.status(200).json({ message: "Subscription canceled successfully!" });

        } catch (error) {
            console.error("Error canceling subscription:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
