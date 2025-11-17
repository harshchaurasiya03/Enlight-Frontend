import PageMeta from "../../../components/dashboard/common/PageMeta";
import CustomerManagement from "../../../components/dashboard/Management/CustomerManagement";


export default function CustomerManagementPage() {
  return (
    <div>
      <PageMeta
        title="Customer Management Dashboard"
        description="Manage all customers and their details in the real estate dashboard."
      />
      <CustomerManagement />
    </div>
  );
}
