import PageMeta from "../../../components/dashboard/common/PageMeta";
import LookingForProperties from "../../../components/dashboard/homeListing/LookingForProperties";

export default function LookingForPropertiesDashboard() {
  return (
    <div className="p-6">
      <PageMeta
        title="Looking For Properties | Dashboard"
        description="Manage and edit featured property regions and sublocations"
      />
      <LookingForProperties />
    </div>
  );
}
