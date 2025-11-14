import PageMeta from "../../../components/dashboard/common/PageMeta";
import SubscribePopupCrud from "../../../components/dashboard/homeListing/SubscribePopupCrud"


export default function NewHomesDashboard() {
  return (
    <div className="p-6">
       <PageMeta
        title="Subscribe Popup | Dashboard"
        description="Manage Subscribe Popup logo, banner, heading, description and button text"
      />
      <SubscribePopupCrud />
    </div>
  );
}