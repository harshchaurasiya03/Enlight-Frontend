import PageMeta from "../../../components/dashboard/common/PageMeta";
import MustSellPropertyCrud from "../../../components/dashboard/homeListing/MustSellPropertyCrud";

export default function MustSellPropertyDashboard() {
  return (
    <div className="p-6">
      <PageMeta
        title="Must Sell Properties | Dashboard"
        description="Manage and update properties with special discounts or offers"
      />
      <MustSellPropertyCrud />
    </div>
  );
}
