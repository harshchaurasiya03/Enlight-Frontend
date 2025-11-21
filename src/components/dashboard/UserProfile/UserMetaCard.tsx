import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { loadUser } from "../../../redux/actions/authAction";
import {
  fetchUserById,
  updateMyProfile,
} from "../../../redux/actions/userAction";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch<AppDispatch>();

  const socialIcons = [
    { name: "facebook", icon: <FaFacebookF />, link: "https://facebook.com" },
    { name: "twitter", icon: <FaTwitter />, link: "https://twitter.com" },
    { name: "linkedin", icon: <FaLinkedinIn />, link: "https://linkedin.com" },
    { name: "instagram", icon: <FaInstagram />, link: "https://instagram.com" },
  ];

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) return;

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    await dispatch(updateMyProfile({ oldPassword, newPassword }) as any);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    closeModal();
  };

  // Redux state
  const {
    user: authUser,
    isAuthenticated,
    loading: authLoading,
  } = useSelector((s: RootState) => s.auth);
  const { user: fullUser, loading: userLoading } = useSelector(
    (s: RootState) => s.user
  );

  const currentUser = fullUser || authUser;

  // Local state
  const [fullName, setFullName] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem("Bearer")) {
      dispatch(loadUser() as any);
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    const userId = authUser?.id || authUser?._id;
    if (userId) {
      dispatch(fetchUserById(userId) as any);
    }
  }, [authUser?.id, authUser?._id, dispatch]);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name || "");
      setPhotoPreview(
        currentUser.photo
          ? `${import.meta.env.VITE_ASSET_URL}${currentUser.photo}`
          : "/images/user.png"
      );
    }
  }, [currentUser]);

  const handleSave = async () => {
    const name = fullName.trim();
    await dispatch(updateMyProfile({ name, photoFile }) as any);

    if (authUser?.id) {
      await dispatch(fetchUserById(authUser.id) as any);
    }
    closeModal();
  };

  const avatar =
    photoPreview ||
    (currentUser?.photo
      ? currentUser.photo.startsWith("http")
        ? currentUser.photo
        : `${import.meta.env.VITE_ASSET_URL}${currentUser.photo}`
      : "/images/user.png");

  const loading = authLoading || userLoading;

  if (!currentUser) {
    return (
      <div className="p-5 text-gray-500 dark:text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <>
      {/* --- Profile Card --- */}
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            {/* Profile Image */}
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img
                src={avatar}
                alt={currentUser?.name || "User"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {currentUser?.name || "—"}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentUser?.role || "user"}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentUser?.email || ""}
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
              {socialIcons.map((social) => (
                <button
                  key={social.name}
                  onClick={() => window.open(social.link, "_blank")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            Edit
          </button>
        </div>
      </div>

      {/* --- Edit Modal --- */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
        <div className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-10">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Profile
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Update your name or profile photo.
          </p>

          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <Label>Profile Photo</Label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setPhotoFile(file);
                  if (file) setPhotoPreview(URL.createObjectURL(file));
                }}
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="preview"
                  className="w-24 h-24 mt-3 rounded-full object-cover"
                />
              )}
            </div>

            <div className="flex items-center gap-3 mt-6 justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* --- Change Password (Moved to the end) --- */}
      <div className="mt-10 px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Change Password
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Update your password securely.
        </p>

        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleChangePassword();
          }}
        >
          <div>
            <Label>Old Password</Label>
            <Input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div>
            <Label>New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 mt-6 justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button size="sm" disabled={loading}>
              {loading ? "Saving..." : "Save Password"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
