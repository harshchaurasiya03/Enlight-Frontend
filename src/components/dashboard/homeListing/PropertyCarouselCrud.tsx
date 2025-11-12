import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaRegFileAlt } from "react-icons/fa";

type Video = {
  id: number;
  name: string;
  url: string;
};

export default function PropertyCarouselCrud() {
  const [videos, setVideos] = useState<Video[]>([
    { id: 1, name: "Property Video 1", url: "/videos/PropertyCarousel/v1.mp4" },
    { id: 2, name: "Property Video 2", url: "/videos/PropertyCarousel/v3.mp4" },
    { id: 3, name: "Property Video 3", url: "/videos/PropertyCarousel/v4.mp4" },
    { id: 4, name: "Property Video 4", url: "/videos/PropertyCarousel/v5.mp4" },
    { id: 5, name: "Property Video 5", url: "/videos/PropertyCarousel/v6.mp4" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState({ name: "", url: "" });

  const openModal = (video?: Video) => {
    if (video) {
      setEditingVideo(video);
      setFormData({ name: video.name, url: video.url });
    } else {
      setEditingVideo(null);
      setFormData({ name: "", url: "" });
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingVideo) {
      setVideos((prev) =>
        prev.map((v) =>
          v.id === editingVideo.id ? { ...v, ...formData } : v
        )
      );
    } else {
      const newVideo: Video = {
        id: Date.now(),
        name: formData.name,
        url: formData.url,
      };
      setVideos((prev) => [...prev, newVideo]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Property Carousel
          </h2>
          <p className="text-gray-500">
            Manage videos shown in your Property Carousel section
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add Video
        </button>
      </div>

      {/* Video Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-200"
          >
            <video
              src={video.url}
              controls
              muted
              loop
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {video.name}
              </h3>

              <div className="flex gap-3">
                <button
                  onClick={() => openModal(video)}
                  className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(video.id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
                <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <FaRegFileAlt /> Draft
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingVideo ? "Edit Video" : "Add Video"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Video Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter video name"
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Video URL
                </label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder="/videos/PropertyCarousel/v1.mp4"
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring focus:ring-blue-100"
                />
              </div>

              {/* Video Preview */}
              {formData.url && (
                <video
                  src={formData.url}
                  controls
                  muted
                  className="w-full h-40 object-cover rounded-lg border"
                />
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
