import BlogDashboard from "../../../components/dashboard/BlogDash/BlogDashboard";
import PageMeta from "../../../components/dashboard/common/PageMeta";


export default function BlogDashboardPage() {
  return (
    <div>
      <PageMeta
        title="Blog Dashboard"
        description="Manage all blogs including creating, editing, and deleting posts."
      />
      <BlogDashboard />
    </div>
  );
}
