import MonthlySalesChart from "../../../components/dashboard/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../../components/dashboard/ecommerce/StatisticsChart";
import MonthlyTarget from "../../../components/dashboard/ecommerce/MonthlyTarget";
import RecentOrders from "../../../components/dashboard/ecommerce/RecentOrders";
import DemographicCard from "../../../components/dashboard/ecommerce/DemographicCard";
import PageMeta from "../../../components/dashboard/common/PageMeta";
import EcommerceMetrics from "../../../components/dashboard/ecommerce/EcommerceMetrics";

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      {/* {Property top} */}
      <div>
        <EcommerceMetrics />
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-7 flex justify-between gap-6">
          {/* <MonthlySalesChart /> */}
        </div>

        <div className="col-span-12 xl:col-span-5">
          {/* <MonthlyTarget /> */}
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
