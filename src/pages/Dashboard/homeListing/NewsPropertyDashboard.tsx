import PageMeta from "../../../components/dashboard/common/PageMeta";
import NewsPropertyCrud from "../../../components/dashboard/homeListing/NewsPropertyCrud";

export default function NewsPropertyDashboard() {
  return (
    <div className="p-6">
      <PageMeta
        title="Thailand Property News | Dashboard"
        description="Manage and update Thailand property news articles"
      />
      <NewsPropertyCrud />
    </div>
  );
}
