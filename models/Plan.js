import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        renewalPeriod: { type: Number, required: true, min: 1 }, // Must be > 0
        tier: { type: Number, required: true, unique: true },
        discount: { type: Number, required: true, min: 0, max: 1 }, // Discount as a decimal (0.1 = 10%)
    },
    { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
