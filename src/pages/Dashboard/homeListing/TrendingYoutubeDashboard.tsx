import PageMeta from "../../../components/dashboard/common/PageMeta";
import TrendingYoutubeCrud from "../../../components/dashboard/homeListing/TrendingYoutubeCrud";

export default function TrendingYoutubeDashboard() {
  return (
    <div className="p-6">
      <PageMeta
        title="Trending YouTube | Dashboard"
        description="Manage featured real estate YouTube videos"
      />
      <TrendingYoutubeCrud />
    </div>
  );
}
