import PageMeta from "../../../components/dashboard/common/PageMeta";
import Reviews from "../../../components/dashboard/RealEstate/Reviews";

export default function ReviewsPage() {
  return (
    <div>
      <PageMeta
        title="Reviews Dashboard"
        description="View and manage all property reviews in the dashboard."
      />
      <Reviews />
    </div>
  );
}
