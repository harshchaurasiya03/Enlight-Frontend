import React, { useState } from "react";

export default function AddProduct() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Add Properties</h2>
        <nav className="text-sm text-gray-500">Home / Add Property</nav>
      </div>

      {/* Main Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-8">
        {/* Product Description */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Property Description
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Property Name</label>
              <input
                placeholder="Enter property name"
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Category</label>
              <select className="border border-gray-300 rounded-xl px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Select a category</option>
                <option>Apartment</option>
                <option>Flat</option>
                <option>Villa</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Brand</label>
              <select className="border border-gray-300 rounded-xl px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Select Amenities</option>
                <option>Gym</option>
                <option>Lift</option>
                <option>Power Backup</option>
                <option>Pool</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Floor</label>
              <select className="border border-gray-300 rounded-xl px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Aparment View</option>
                <option>See Facing</option>
                <option>Road Facing</option>
                <option>Market</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Area (Sqft)</label>
              <input
                placeholder="1500 sqft"
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Badroom</label>
              <input
                placeholder="No of Badroom"
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Balconies</label>
              <input
                placeholder="No of Balconies"
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1 mt-4">
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              placeholder="Enter details..."
              className="border border-gray-300 rounded-xl px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </section>

        {/* Pricing & Availability */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Pricing & Availability
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Price</label>
              <input
                placeholder="15 cr"
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Square Feet</label>
              <input
                placeholder="12000"
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Total</label>
              <input
                placeholder="80 lac"
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Quantity and Availability */}
          <div className="flex items-center gap-5 mt-5">
            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="px-3 py-2 text-lg hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 text-gray-800 font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <select className="border border-gray-300 rounded-xl px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Furnished</option>
              <option>Fully Furnished</option>
              <option>Semi Furnished</option>
              <option>Raw</option>
            </select>
          </div>
        </section>

        {/* Product Images */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Property Images
          </h3>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center text-gray-500">
            <p>
              <strong>Click to upload</strong> or drag and drop SVG, PNG, JPG,
              or GIF (MAX. 1600x1600px)
            </p>
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button className="border border-gray-300 rounded-xl px-6 py-2 text-gray-700 hover:bg-gray-100">
            Draft
          </button>
          <button className="bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700">
            Publish Property
          </button>
        </div>
      </div>
    </div>
  );
}
