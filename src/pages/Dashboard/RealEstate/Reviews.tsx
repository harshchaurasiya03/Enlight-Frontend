import React, { useState } from "react";

interface Review {
  id: number;
  propertyName: string;
  reviewer: string;
  rating: number; // 1-5 stars
  comment: string;
  createdAt: string;
}

export default function PropertyReviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      propertyName: "Sunshine Villa",
      reviewer: "Alice",
      rating: 5,
      comment: "Amazing property! Very clean and spacious.",
      createdAt: "2025-11-01",
    },
    {
      id: 2,
      propertyName: "Green Apartments",
      reviewer: "Bob",
      rating: 4,
      comment: "Nice location, but a bit noisy.",
      createdAt: "2025-10-20",
    },
    {
      id: 3,
      propertyName: "Penthouse",
      reviewer: "Charlie",
      rating: 5,
      comment: "Breathtaking view and luxurious interiors!",
      createdAt: "2025-09-15",
    },
    {
      id: 4,
      propertyName: "2BHK Condo",
      reviewer: "Diana",
      rating: 3,
      comment: "Affordable, but small rooms.",
      createdAt: "2025-08-10",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editReview, setEditReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState<Partial<Review>>({
    propertyName: "",
    reviewer: "",
    rating: 0,
    comment: "",
    createdAt: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrEdit = () => {
    if (!formData.propertyName || !formData.reviewer || !formData.comment)
      return alert("All fields are required");

    if (editReview) {
      setReviews(
        reviews.map((r) => (r.id === editReview.id ? { ...r, ...formData } as Review : r))
      );
    } else {
      const newReview: Review = {
        id: reviews.length + 1,
        propertyName: formData.propertyName || "",
        reviewer: formData.reviewer || "",
        rating: Number(formData.rating) || 0,
        comment: formData.comment || "",
        createdAt: formData.createdAt || new Date().toISOString().slice(0, 10),
      };
      setReviews([...reviews, newReview]);
    }

    setFormData({ propertyName: "", reviewer: "", rating: 0, comment: "", createdAt: "" });
    setEditReview(null);
    setShowModal(false);
  };

  const handleEdit = (review: Review) => {
    setEditReview(review);
    setFormData(review);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Property Reviews</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700"
        >
          Add Review
        </button>
      </div>

      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Property", "Reviewer", "Rating", "Comment", "Created At", "Operations"].map(
                (h) => (
                  <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review.id}>
                <td className="px-6 py-4">{review.id}</td>
                <td className="px-6 py-4">{review.propertyName}</td>
                <td className="px-6 py-4">{review.reviewer}</td>
                <td className="px-6 py-4">
                  {"⭐".repeat(review.rating)}{" "}
                  {"☆".repeat(5 - review.rating)}
                </td>
                <td className="px-6 py-4">{review.comment}</td>
                <td className="px-6 py-4">{review.createdAt}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="px-3 py-1 bg-yellow-300 text-white rounded-lg hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl space-y-4 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowModal(false);
                setEditReview(null);
              }}
            >
              X
            </button>
            <h3 className="text-lg font-semibold text-gray-700">
              {editReview ? "Edit Review" : "Add Review"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-600">Property Name</label>
                <input
                  name="propertyName"
                  value={formData.propertyName || ""}
                  onChange={handleInputChange}
                  placeholder="Enter property name"
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-600">Reviewer</label>
                <input
                  name="reviewer"
                  value={formData.reviewer || ""}
                  onChange={handleInputChange}
                  placeholder="Reviewer name"
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-600">Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  min={1}
                  max={5}
                  value={formData.rating || 0}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1 md:col-span-2">
                <label className="text-sm text-gray-600">Comment</label>
                <textarea
                  name="comment"
                  value={formData.comment || ""}
                  onChange={handleInputChange}
                  placeholder="Enter comment"
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-600">Created At</label>
                <input
                  type="date"
                  name="createdAt"
                  value={formData.createdAt || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                className="border border-gray-300 rounded-xl px-6 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setShowModal(false);
                  setEditReview(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700"
                onClick={handleAddOrEdit}
              >
                {editReview ? "Update Review" : "Add Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
