import React, { useContext, useEffect, useMemo, useState } from "react";
import { ItemContext } from "../context/ItemContext";
import toastService from "../utils/toastService";

type Item = {
  id: number;
  title: string;
  body: string;
};

const ItemList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("default");

  const { items, setItems, removeItem, loading } = useContext(ItemContext);

  const openModal = (item: Item, editMode: boolean) => {
    setSelectedItem(item);
    setEditedTitle(item.title);
    setEditedDescription(item.body);
    setIsEditing(editMode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (!selectedItem) return;
  
    const itemToEdit = items.find((item) => item.id === selectedItem.id);
    if (!itemToEdit) return;

    if (
      itemToEdit.title === editedTitle.trim() &&
      itemToEdit.body === editedDescription.trim()
    ) {
      toastService.error("No changes detected.");
      return;
    }

    const updatedItems = items.map((item) =>
      item.id === selectedItem.id
        ? { ...item, title: editedTitle.trim(), body: editedDescription.trim() }
        : item
    );

    setItems(updatedItems);
    toastService.success("Item updated successfully");
    closeModal();
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm((prev) => (prev !== searchTerm ? searchTerm : prev));
    }, 300); 
  
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(debouncedSearchTerm.trim().toLowerCase()) ||
        item.body.toLowerCase().includes(debouncedSearchTerm.trim().toLowerCase())
    );
  }, [items, debouncedSearchTerm]);
  
  const sortedItems = useMemo(() => {
    return sortOrder === "default"
      ? filteredItems
      : [...filteredItems].sort((a, b) =>
          sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
  }, [filteredItems, sortOrder]);

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
                className="bg-gray-200 animate-pulse p-3 rounded-lg shadow-md border border-gray-300 flex flex-col justify-between"
                style={{ height: "200px" }}
              >
                <div className="h-5 bg-gray-300 rounded w-full mb-2 mt-10"></div>
                <div className="h-8 bg-gray-300 rounded w-full mb-2"></div>
                <div className="flex justify-center items-center mt-3 mb-2 gap-3">
                  <div className="w-16 h-10 bg-gray-300 rounded"></div>
                  <div className="w-16 h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))
          ) : sortedItems.length > 0 ? (
            sortedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                style={{ height: "200px" }}
              >
                <div className="flex justify-end">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 text-lg font-semibold cursor-pointer hover:text-red-500 transition-all"
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
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => openModal(item, false)}
                    className="w-16 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
                  >
                    View
                  </button>
                  <button
                    onClick={() => openModal(item, true)}
                    className="w-16 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-center"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full text-lg font-semibold p-4 rounded-md shadow-sm">
              No items found! Try adjusting your search or adding a new item!
            </p>
          )}
        </div>
      </div>

      {/* Modal For View and Edit */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Item" : "View Item"}
            </h2>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md"
              rows={3}
              disabled={!isEditing}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
              {isEditing && (
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
