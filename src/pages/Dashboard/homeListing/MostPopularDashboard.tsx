import PageMeta from "../../../components/dashboard/common/PageMeta";
import MostPopularCrud from "../../../components/dashboard/homeListing/MostPopularCrud";

export default function MostPopularDashboard() {
  return (
    <div className="p-6">
      <PageMeta
        title="Most Popular | Dashboard"
        description="Manage cards for the Most Popular section on the homepage"
      />
      <MostPopularCrud />
    </div>
  );
}
