import PageMeta from "../../../components/dashboard/common/PageMeta";
import RentToOwnCrud from "../../../components/dashboard/homeListing/RentToOwnCrud";

export default function RentToOwnDashboard() {
  return (
    <div className="p-6">
      <PageMeta
        title="Rent-To-Own | Dashboard"
        description="Manage Rent-To-Own cards displayed on the homepage section"
      />
      <RentToOwnCrud />
    </div>
  );
}
