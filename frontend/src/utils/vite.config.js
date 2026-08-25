const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Each entry is one "detail" line, e.g. "100% Cotton", "Machine washable"
    // Stored as an array so the client can add as many as needed.
    productDetails: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.every((d) => typeof d === "string" && d.trim().length > 0),
        message: "productDetails cannot contain empty strings",
      },
    },

    // Each entry is one size, e.g. "S", "M", "L", "42", "One Size"
    productSize: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.every((s) => typeof s === "string" && s.trim().length > 0),
        message: "productSize cannot contain empty strings",
      },
    },
  },
  { timestamps: true }
);

// Optional: strip out any accidental empty strings / whitespace-only entries
// before saving, so the "add input" UI never pollutes the DB with junk rows.
productSchema.pre("validate", function (next) {
  if (Array.isArray(this.productDetails)) {
    this.productDetails = this.productDetails
      .map((d) => d.trim())
      .filter((d) => d.length > 0);
  }
  if (Array.isArray(this.productSize)) {
    this.productSize = this.productSize
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
