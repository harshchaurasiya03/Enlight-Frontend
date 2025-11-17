import PageMeta from "../../../components/dashboard/common/PageMeta";
import PostProperty from "../../../components/dashboard/RealEstate/PostProperty";

export default function PostPropertyPage() {
  return (
    <div>
      <PageMeta
        title="Post Property Dashboard"
        description="Create and manage all property listings in the dashboard."
      />
      <PostProperty />
    </div>
  );
}
