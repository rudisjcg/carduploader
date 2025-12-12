import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
  {
    cardName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expMonth: { type: String, required: true },
    expYear: { type: String, required: true },
    last4: { type: String, required: true },
    cvv: { type: String, required: true },
    id: { type: String, required: true },
  },
  { timestamps: true }
);

export const Card = mongoose.model("Card", CardSchema);