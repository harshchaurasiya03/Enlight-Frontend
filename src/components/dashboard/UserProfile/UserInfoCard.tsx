import { useEffect, useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { fetchUserById, updateMyProfile } from "../../../redux/actions/userAction";
import { loadUser } from "../../../redux/actions/authAction";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();

  const { user: authUser, isAuthenticated, loading: authLoading } = useAppSelector(
    (s) => s.auth
  );
  const { user: userDetails, loading: userLoading } = useAppSelector((s) => s.user);

  // Prefer full user details if available
  const currentUser = userDetails || authUser;

  // Local state for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // --- 1️⃣ Load basic user (from token) ---
  useEffect(() => {
    if (!isAuthenticated && !authLoading && localStorage.getItem("Bearer")) {
      dispatch(loadUser() as any);
    }
  }, [isAuthenticated, authLoading, dispatch]);

  // --- 2️⃣ Fetch full details (with phone, photo, etc.) ---
  useEffect(() => {
    if (authUser?.id) {
      dispatch(fetchUserById(authUser.id) as any);
    }
  }, [authUser?.id, dispatch]);

  // --- 3️⃣ Populate form when user data changes ---
  useEffect(() => {
    if (currentUser) {
      const [fn = "", ln = ""] = (currentUser.name || "").split(" ");
      setFirstName(fn);
      setLastName(ln);
      setEmail(currentUser.email || "");
      setPhone((currentUser as any).phone || "");
      setPhotoPreview(
        currentUser.photo
          ? `${import.meta.env.VITE_ASSET_URL}${currentUser.photo}`
          : "/images/user.png"
      );
    }
  }, [currentUser]);

  // --- 4️⃣ Save handler ---
  const handleSave = async () => {
    const name = `${firstName} ${lastName}`.trim();
    await dispatch(updateMyProfile({ name, email, phone, photoFile }) as any);

    if (authUser?.id) {
      await dispatch(fetchUserById(authUser.id) as any);
    }

    closeModal();
  };

  const loading = authLoading || userLoading;

  if (!currentUser) {
    return (
      <div className="p-5 text-gray-500 dark:text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      {/* ---- Display Section ---- */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {firstName || "—"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {lastName || "—"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {email || "—"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {phone || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* ---- Edit Button ---- */}
        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      {/* ---- Edit Modal ---- */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>

          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="col-span-2">
                  <Label>Profile Photo</Label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setPhotoFile(file);
                      if (file) {
                        const preview = URL.createObjectURL(file);
                        setPhotoPreview(preview);
                      }
                    }}
                  />
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="preview"
                      className="w-20 h-20 mt-2 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
