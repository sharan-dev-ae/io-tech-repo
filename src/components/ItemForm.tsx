import React, { useContext, useState } from "react";
import { ItemContext } from "../context/ItemContext";

type Item = {
  id: number;
  title: string;
  body: string;
};

const ItemForm: React.FC = () => {
  const [formData, setFormData] = useState<Item>({
    id: 0,
    title: "",
    body: "",
  });
  const { items, setItems } = useContext(ItemContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: Item = {
      id: items.length + 1, 
      title: formData.title,
      body: formData.body,
    };

    // Update the items array in the context
    setItems([...items, newItem]);

    // Reset form fields
    setFormData({ id: 0, title: "", body: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add a New Item</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 items-center"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:w-full space-y-2 sm:space-y-0">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 sm:mr-4"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter title"
            required
            className="w-full sm:w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:w-full space-y-2 sm:space-y-0">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 sm:mr-4"
          >
            Description
          </label>
          <input
            type="text"
            name="body"
            id="description"
            value={formData.body}
            onChange={handleInputChange}
            placeholder="Enter description"
            required
            className="w-full sm:w-[400px] p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-12 sm:w-[8rem] w-full"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
