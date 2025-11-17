import PageMeta from "../../../components/dashboard/common/PageMeta";
import Projects from "../../../components/dashboard/RealEstate/Projects";

export default function ProjectsPage() {
  return (
    <div>
      <PageMeta
        title="Projects Dashboard"
        description="Manage and view all real estate projects in the dashboard."
      />
      <Projects />
    </div>
  );
}
