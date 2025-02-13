import mongoose, { Schema } from "mongoose";

const MagazineSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        base_price: { type: Number, required: true, min: 0 }, // Must be greater than zero
        plans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true }] // Ensure "Plan" matches your model namece to plans

    },
    { timestamps: true }
);

export default mongoose.models.Magazine || mongoose.model("Magazine", MagazineSchema);
