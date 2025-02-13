import connectToDatabase from "../../../utils/db";
import Subscription from "../../../models/Subscription";
import Plan from "../../../models/Plan";
import authMiddleware from "../../../middleware/authMiddleware";

export default async function handler(req, res) {
    authMiddleware(req, res, async () => {
        if (req.method !== "PUT") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        try {
            await connectToDatabase();
            const userId = req.user.userId; // Authenticated user

            const { magazine_id, new_plan_id } = req.body;

            if (!magazine_id || !new_plan_id) {
                return res.status(400).json({ error: "Missing required fields." });
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

            // Get new plan details
            const newPlan = await Plan.findById(new_plan_id);
            if (!newPlan) {
                return res.status(404).json({ error: "New plan not found." });
            }

            // Deactivate current subscription
            existingSubscription.is_active = false;
            await existingSubscription.save();

            // Calculate new renewal date based on new plan's renewal period
            const newRenewalDate = new Date();
            newRenewalDate.setMonth(newRenewalDate.getMonth() + newPlan.renewalPeriod);

            // Create a new subscription with the new plan
            const newSubscription = new Subscription({
                user_id: userId,
                magazine_id,
                plan_id: new_plan_id,
                price: existingSubscription.price, // Keeping the price logic consistent
                renewal_date: newRenewalDate,
                is_active: true,
            });

            await newSubscription.save();

            res.status(200).json({
                message: "Subscription modified successfully!",
                subscription: newSubscription
            });

        } catch (error) {
            console.error("Error modifying subscription:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
