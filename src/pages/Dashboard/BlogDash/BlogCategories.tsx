import BlogCategories from "../../../components/dashboard/BlogDash/BlogCategories";
import PageMeta from "../../../components/dashboard/common/PageMeta";


export default function BlogCategoriesPage() {
  return (
    <div>
      <PageMeta
        title="Blog Categories Dashboard"
        description="Manage all blog categories in the dashboard."
      />
      <BlogCategories />
    </div>
  );
}
