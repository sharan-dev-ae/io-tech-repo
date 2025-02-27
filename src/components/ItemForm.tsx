import React, { useContext, useState } from "react";
import { ItemContext } from "../context/ItemContext";
import toastService from "../utils/toastService";

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

  const { items, setItems, loading } = useContext(ItemContext);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (value.length > 100) {
      toastService.error(`Maximum length exceeded for ${name === "title" ? "Title" : "Description"}.`);
      return;
    }
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = formData.title.trim();
    const trimmedBody = formData.body.trim();

    if (!trimmedTitle || !trimmedBody) {
      toastService.error("Title and Description are required.");
      return;
    }

    const newItem: Item = {
      id: Date.now(),
      title: trimmedTitle,
      body: trimmedBody,
    };

    setItems([newItem, ...items]); 
    toastService.success("Item added successfully");

    setFormData({ id: 0, title: "", body: "" });
  };

  if (loading) return null; // Don't render the form until loading is complete

  return (
    <div className="max-w-6xl mx-auto p-3 bg-white rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Add a New Item
      </h2>
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
            maxLength={100}
            className="w-full sm:w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:w-full space-y-2 sm:space-y-0">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 sm:mr-4"
          >
            Description
          </label>
          <textarea
            name="body"
            id="body"
            value={formData.body}
            onChange={handleInputChange}
            placeholder="Enter description"
            maxLength={100}
            rows={3}
            className="w-full sm:w-[400px] p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

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
