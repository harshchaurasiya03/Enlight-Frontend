import PageMeta from "../../../components/dashboard/common/PageMeta";
import Subscription from "../../../components/dashboard/Subscription/Subscription";


export default function SubscriptionPage() {
  return (
    <div>
      <PageMeta
        title="Subscriptions Dashboard"
        description="Manage all subscription plans and offers"
      />
      <Subscription/>
    </div>
  );
}
