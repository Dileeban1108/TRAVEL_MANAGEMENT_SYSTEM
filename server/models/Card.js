const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    match: /^\d{16}$/, // Ensure the card number is 16 digits
  },
  expDate: {
    type: String,
    required: true,
    match: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, // Ensure the expiry date is in MM/YY format
  },
  cvv: {
    type: String,
    required: true,
    match: /^[0-9]{3,4}$/, // Ensure the CVV is 3 or 4 digits
  },
  price: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
