import connectToDatabase from "../../../utils/db";
import Subscription from "../../../models/Subscription";
import Plan from "../../../models/Plan";
import Magazine from "../../../models/Magazine"; // Import Magazine model
import authMiddleware from "../../../middleware/authMiddleware";

export default async function handler(req, res) {
    authMiddleware(req, res, async () => {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        try {
            await connectToDatabase();
            const userId = req.user.userId;

            const { magazine_id, plan_id } = req.body;

            if (!magazine_id || !plan_id) {
                return res.status(400).json({ error: "Missing required fields." });
            }

            // Check if user already has an active subscription for this magazine
            const existingSubscription = await Subscription.findOne({
                user_id: userId,
                magazine_id,
                is_active: true
            });

            if (existingSubscription) {
                return res.status(400).json({ error: "User already has an active subscription for this magazine." });
            }

            // Fetch Magazine and Plan details
            const magazine = await Magazine.findById(magazine_id);
            if (!magazine) {
                return res.status(404).json({ error: "Magazine not found." });
            }

            const plan = await Plan.findById(plan_id);
            if (!plan) {
                return res.status(404).json({ error: "Plan not found." });
            }

            // Calculate price using base price and discount
            const price = magazine.base_price * (1 - plan.discount);

            if (price <= 0) {
                return res.status(400).json({ error: "Invalid subscription price calculated." });
            }

            // Calculate renewal date
            const renewalDate = new Date();
            renewalDate.setMonth(renewalDate.getMonth() + plan.renewalPeriod);

            // Create new subscription
            const newSubscription = new Subscription({
                user_id: userId,
                magazine_id,
                plan_id,
                price,
                renewal_date: renewalDate,
                is_active: true
            });

            await newSubscription.save();
            res.status(201).json({ message: "Subscription created successfully!", subscription: newSubscription });
        } catch (error) {
            console.error("Error creating subscription:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
