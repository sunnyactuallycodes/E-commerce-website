import { X, Plus } from "lucide-react";

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
          <div key={index} style={{
            backgroundColor:"white"
          }} className="flex items-center gap-2">
            <input
            style={{
                padding:"10px",
                backgroundColor:"#F7F5F0",
                marginTop:"10px"
            }}
              type="text"
              value={value}
              placeholder={placeholder}
              onChange={(e) => handleChange(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
};
export default DynamicInputList;