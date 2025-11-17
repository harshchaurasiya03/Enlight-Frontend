import PageMeta from "../../../components/dashboard/common/PageMeta";
import Features from "../../../components/dashboard/RealEstate/Features";

export default function FeaturesPage() {
  return (
    <div>
      <PageMeta
        title="Features Dashboard"
        description="All property features like pool, gym, terrace, etc."
      />
      <Features />
    </div>
  );
}
