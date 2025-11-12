import PageMeta from "../../../components/dashboard/common/PageMeta";
import FeaturedProjectsCrud from "../../../components/dashboard/homeListing/FeaturedProjectsCrud";

export default function FeaturedProjectsDashboard() {
  return (
    <div className="p-6">
      <PageMeta
        title="Featured Projects | Dashboard"
        description="Manage featured project cards for homepage display"
      />
      <FeaturedProjectsCrud />
    </div>
  );
}
