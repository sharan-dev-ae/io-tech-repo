import React, { useContext, useState } from "react";
import { ItemContext } from "../context/ItemContext";
import toastService from "../utils/toastService";

type Item = {
  id: number;
  title: string;
  body: string;
};

const ItemList: React.FC = () => {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("default");

  const { items, setItems, removeItem, loading } = useContext(ItemContext);

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
    const itemToEdit = items.find((item) => item.id === id);
    if (!itemToEdit) return;

    if (
      itemToEdit.title === editedTitle.trim() &&
      itemToEdit.body === editedDescription.trim()
    ) {
      toastService.error("No changes detected.");
      return;
    }

    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, title: editedTitle.trim(), body: editedDescription.trim() }
        : item
    );

    setItems(updatedItems);
    toastService.success("Item updated successfully");
    handleCancelEdit();
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
    toastService.success("Item removed successfully");
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      item.body.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const sortedItems =
    sortOrder === "default"
      ? filteredItems
      : [...filteredItems].sort((a, b) =>
          sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full sm:w-64"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="default">Default (Newest First)</option>
          <option value="asc">Title: A-Z</option>
          <option value="desc">Title: Z-A</option>
        </select>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-lg border border-gray-300">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto p-2"
          style={{ height: "350px" }}
        >
          {loading ? (
            [...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 animate-pulse p-3 rounded-lg shadow-md border border-gray-300"
                style={{ height: "200px" }}
              >
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            ))
          ) : sortedItems.length > 0 ? (
            sortedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                style={{ height: "200px" }}
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
                      rows={2}
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
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-500 text-lg font-semibold cursor-pointer hover:text-sky-500 transition-all"
                      >
                        ✕
                      </button>
                    </div>
                    <h3 className="text-xl font-semibold mb-1 truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {item.body}
                    </p>
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full text-lg font-semibold p-4 rounded-md shadow-sm">
              No items found! Try adjusting your search or adding a new item!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemList;
