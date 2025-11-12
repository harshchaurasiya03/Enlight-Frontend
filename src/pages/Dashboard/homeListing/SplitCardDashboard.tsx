import PageMeta from "../../../components/dashboard/common/PageMeta";
import SplitCardCrud from "../../../components/dashboard/homeListing/SplitCardCrud";

export default function SplitCardDashboard() {
  return (
    <div className="p-6">
      <PageMeta
        title="SplitCard | Dashboard"
        description="Manage SplitCard section video and content for the homepage"
      />
      <SplitCardCrud />
    </div>
  );
}
