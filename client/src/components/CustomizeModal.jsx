import React from "react";

const CustomizeModal = ({
  item,
  customization,
  setCustomization,
  onClose,
  onAdd,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-[110] flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-96">
        <h3 className="text-lg font-bold mb-4">Customize {item.name}</h3>

        <div className="space-y-3">
          <div>
            <label className="block font-medium">Drink:</label>
            <input
              type="text"
              value={customization.drink}
              onChange={(e) =>
                setCustomization({ ...customization, drink: e.target.value })
              }
              className="w-full px-3 py-1 border rounded"
              placeholder="e.g. Coke"
            />
          </div>

          <div>
            <label className="block font-medium">Sauce (+$2):</label>
            <input
              type="text"
              value={customization.sauce}
              onChange={(e) =>
                setCustomization({ ...customization, sauce: e.target.value })
              }
              className="w-full px-3 py-1 border rounded"
              placeholder="e.g. Mayo"
            />
          </div>

          <div>
            <label className="block font-medium">Extra (+$2):</label>
            <input
              type="text"
              value={customization.extra}
              onChange={(e) =>
                setCustomization({ ...customization, extra: e.target.value })
              }
              className="w-full px-3 py-1 border rounded"
              placeholder="e.g. Cheese"
            />
          </div>

          <div>
            <label className="block font-medium">Quantity:</label>
            <input
              type="number"
              min={1}
              value={customization.quantity}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  quantity: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-1 border rounded"
            />
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 border rounded text-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={onAdd}
              className="px-3 py-1 bg-orange-500 text-white rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModal;
