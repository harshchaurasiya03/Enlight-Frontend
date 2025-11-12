import PageMeta from "../../../components/dashboard/common/PageMeta";
import PropertyCarouselCrud from "../../../components/dashboard/homeListing/PropertyCarouselCrud";

export default function PropertyCarouselDashboard() {
  return (
    <div className="p-6">
      <PageMeta
        title="Property Carousel | Dashboard"
        description="Manage and edit video carousel shown in property section"
      />
      <PropertyCarouselCrud />
    </div>
  );
}
