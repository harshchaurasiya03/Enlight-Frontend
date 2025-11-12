import PageMeta from "../../../components/dashboard/common/PageMeta";
import ThailandSecretsCrud from "../../../components/dashboard/homeListing/ThailandSecretsCrud";

export default function ThailandSecretsDashboard() {
  return (
    <div className="p-6">
      <PageMeta
        title="Thailand Secrets | Dashboard"
        description="Manage articles and guides for Thailand Real Estate insights"
      />
      <ThailandSecretsCrud />
    </div>
  );
}
