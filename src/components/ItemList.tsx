import React, { useContext, useState } from "react";
import { ItemContext } from "../context/ItemContext";

type Item = {
  id: number;
  title: string;
  body: string;
};

const ItemList: React.FC = () => {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");
  const { items, setItems, removeItem } = useContext(ItemContext);

  const handleEdit = (item: Item) => {
    setEditingItemId(item.id);
    setEditedTitle(item.title);
    setEditedDescription(item.body);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditedTitle("");
    setEditedDescription("");
  };

  const handleSaveEdit = (id: number) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, title: editedTitle, body: editedDescription }
        : item
    );
    setItems(updatedItems);
    handleCancelEdit();
  };
  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Item List</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto"
        style={{ maxHeight: "450px" }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            {editingItemId === item.id ? (
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                  rows={4}
                />
                <div className="flex justify-between">
                  <button
                    onClick={() => handleSaveEdit(item.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div
                  onClick={() => handleRemoveItem(item.id)}
                  className="w-6 h-6 flex items-center justify-center cursor-pointer rounded-full border border-gray-300 hover:bg-gray-200 hover:shadow-md transition-all"
                >
                  X
                </div>
                <h3
                  className="text-xl font-semibold mb-2 overflow-hidden text-ellipsis h-16"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm text-gray-600 mb-4 h-20 overflow-hidden text-ellipsis line-clamp-3"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.body}
                </p>
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
