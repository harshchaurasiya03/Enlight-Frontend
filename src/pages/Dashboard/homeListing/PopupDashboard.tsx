import PageMeta from "../../../components/dashboard/common/PageMeta";
import LoginPopupCrud from "../../../components/dashboard/homeListing/LoginPopupCrud"


export default function NewHomesDashboard() {
  return (
    <div className="p-6">
       <PageMeta
        title="Login Popup | Dashboard"
        description="Manage Login Popup logo, heading, description and button text"
      />
      <LoginPopupCrud />
    </div>
  );
}