import PageMeta from "../../../components/dashboard/common/PageMeta";
import HeroSearchCrud from "../../../components/dashboard/homeListing/HeroSearchCrud";

export default function HeroSearchDashboard() {
  return (
    <div className="p-6">
      <PageMeta
        title="Hero Search | Dashboard"
        description="Manage Hero Search section background and content"
      />
      <HeroSearchCrud />
    </div>
  );
}
