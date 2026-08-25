import React, { useState } from "react";
import { Plus, X } from "lucide-react";

/**
 * Reusable "add as many as you want" input list.
 * Renders one text input per item, a small (x) to remove a row,
 * and a (+ Add) button to append a new empty row.
 *
 * Props:
 *  - label: string shown above the list
 *  - placeholder: placeholder text for each input
 *  - items: array of strings
 *  - setItems: setState function for that array
 */
function DynamicInputList({ label, placeholder, items, setItems }) {
  const handleChange = (index, value) => {
    const next = [...items];
    next[index] = value;
    setItems(next);
  };

  const handleAdd = () => {
    setItems([...items, ""]);
  };

  const handleRemove = (index) => {
    // keep at least one input visible
    if (items.length === 1) {
      setItems([""]);
      return;
    }
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      <div className="space-y-2">
        {items.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              placeholder={placeholder}
              onChange={(e) => handleChange(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="p-2 text-gray-400 hover:text-red-500"
              aria-label="Remove"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [productDetails, setProductDetails] = useState([""]);
  const [productSize, setProductSize] = useState([""]);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message }
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    // strip empty rows before sending
    const cleanDetails = productDetails.map((d) => d.trim()).filter(Boolean);
    const cleanSizes = productSize.map((s) => s.trim()).filter(Boolean);

    const payload = {
      name: name.trim(),
      price: Number(price),
      productDetails: cleanDetails,
      productSize: cleanSizes,
    };

    try {
      setSubmitting(true);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus({ type: "success", message: "Product saved successfully." });
      setName("");
      setPrice("");
      setProductDetails([""]);
      setProductSize([""]);
    } catch (err) {
      setStatus({ type: "error", message: "Could not save product. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Price
          </label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <DynamicInputList
          label="Product Details"
          placeholder="e.g. 100% Cotton"
          items={productDetails}
          setItems={setProductDetails}
        />

        <DynamicInputList
          label="Product Sizes"
          placeholder="e.g. M"
          items={productSize}
          setItems={setProductSize}
        />

        {status && (
          <div
            className={`mb-4 text-sm rounded-md px-3 py-2 ${
              status.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium rounded-md py-2 text-sm"
        >
          {submitting ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}
