import PageMeta from "../../../components/dashboard/common/PageMeta";
import PropertyTable from "../../../components/dashboard/RealEstate/property/PropertyTable";

export default function PostPropertyPage() {
  return (
    <div>
      <PageMeta
        title="Post Property Dashboard"
        description="Create and manage all property listings in the dashboard."
      />
      <PropertyTable/>
    </div>
  );
}
