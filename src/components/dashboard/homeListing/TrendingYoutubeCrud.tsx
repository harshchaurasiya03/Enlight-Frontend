import { useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaYoutube } from "react-icons/fa";

type Video = {
  id: number;
  url: string;
};

const getYoutubeThumbnail = (embedUrl: string): string => {
  const videoId = embedUrl.split("/embed/")[1];
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "";
};

export default function TrendingYoutubeCrud() {
  const [videos, setVideos] = useState<Video[]>([
    { id: 1, url: "https://www.youtube.com/embed/hS_149t5okc" },
    { id: 2, url: "https://www.youtube.com/embed/7rTRNqiRmUU" },
    { id: 3, url: "https://www.youtube.com/embed/53n1IZRzQm4" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [formUrl, setFormUrl] = useState("");

  const openModal = (video?: Video) => {
    if (video) {
      setEditingVideo(video);
      setFormUrl(video.url);
    } else {
      setEditingVideo(null);
      setFormUrl("");
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formUrl.includes("youtube.com/embed/")) {
      alert("Please enter a valid YouTube embed URL (format: youtube.com/embed/VIDEO_ID)");
      return;
    }

    if (editingVideo) {
      setVideos((prev) =>
        prev.map((v) => (v.id === editingVideo.id ? { ...v, url: formUrl } : v))
      );
    } else {
      const newVideo: Video = { id: Date.now(), url: formUrl };
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
            Trending YouTube Videos
          </h2>
          <p className="text-gray-500">
            Manage YouTube links shown in the video channel section
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add Video
        </button>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border rounded-xl shadow-sm bg-gray-50 overflow-hidden hover:shadow-md transition"
          >
            <div className="w-full h-48 relative">
              <img
                src={getYoutubeThumbnail(video.url)}
                alt="YouTube Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black/30">
                <FaYoutube className="text-red-600 text-5xl" />
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 truncate">{video.url}</p>
              <div className="flex justify-between mt-3 text-sm">
                <button
                  onClick={() => openModal(video)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(video.id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[600px] rounded-xl shadow-lg p-6 max-h-[85vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingVideo ? "Edit YouTube Video" : "Add YouTube Video"}
            </h2>

            <div>
              <label className="text-gray-600 text-sm font-medium">
                YouTube Embed URL
              </label>
              <input
                type="text"
                value={formUrl}
                onChange={(e) => setFormUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
                className="w-full mt-1 border rounded-lg px-3 py-2"
              />
              {formUrl && (
                <div className="mt-3">
                  <p className="text-gray-600 text-sm mb-1">Preview:</p>
                  <img
                    src={getYoutubeThumbnail(formUrl)}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
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
