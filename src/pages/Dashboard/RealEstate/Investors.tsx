import PageMeta from "../../../components/dashboard/common/PageMeta";
import Investors from "../../../components/dashboard/RealEstate/Investors";

export default function InvestorsPage() {
  return (
    <div>
      <PageMeta
        title="Investors Dashboard"
        description="Manage all investors and their investment details."
      />
      <Investors />
    </div>
  );
}
