import PageMeta from "../../../components/dashboard/common/PageMeta";
import NewHomesCrud from "../../../components/dashboard/homeListing/NewHomesCrud";

export default function NewHomesDashboard() {
  return (
    <div className="p-6">
      <PageMeta
        title="New Homes | Dashboard"
        description="Manage New Homes section and its carousel on the homepage"
      />
      <NewHomesCrud />
    </div>
  );
}
