import dotenv from "dotenv";
import connectToDatabase from "../utils/db.js";
import Plan from "../models/Plan.js";

dotenv.config(); // Load environment variables

const plans = [
    {
        title: "Silver Plan",
        description: "Basic plan which renews monthly",
        renewalPeriod: 1,
        tier: 1,
        discount: 0.0,
    },
    {
        title: "Gold Plan",
        description: "Standard plan which renews every 3 months",
        renewalPeriod: 3,
        tier: 2,
        discount: 0.05,
    },
    {
        title: "Platinum Plan",
        description: "Premium plan which renews every 6 months",
        renewalPeriod: 6,
        tier: 3,
        discount: 0.10,
    },
    {
        title: "Diamond Plan",
        description: "Exclusive plan which renews annually",
        renewalPeriod: 12,
        tier: 4,
        discount: 0.25,
    }
];

const seedPlans = async () => {
    try {
        await connectToDatabase();

        const existingPlans = await Plan.find();
        if (existingPlans.length > 0) {
            console.log("Plans already exist. Skipping seeding.");
            return;
        }

        await Plan.insertMany(plans);
        console.log("✅ Plans seeded successfully!");
    } catch (error) {
        console.error("❌ Error seeding plans:", error);
    } finally {
        // mongoose.connection.close(); // Close connection after seeding
    }
};

seedPlans();
