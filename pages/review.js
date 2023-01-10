import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import useSWR from "swr";
import SiteTableHeader from "@/components/SiteTableHeader";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import ReviewTable from "@/components/ReviewTable";
import fetcher from "utlis/fetcher";
import { useAuth } from "@/lib/auth";
import ReviewTableHeader from "@/components/ReviewTableHeader";
import ReviewEmptyState from "@/components/ReviewEmptyState";
import ReviewTableSkeleton from "@/components/ReviewTableSkeleton";

const Review = () => {
  const { user } = useAuth();
  // console.log("Token", user.token);
  const { data } = useSWR(user ? ["/api/reviews", user.token] : null, fetcher);
  console.log("Review Page", data);
  if (!data) {
    return (
      <DashboardShell>
        <ReviewTableHeader />
        <ReviewTableSkeleton />
      </DashboardShell>
    );
  }

  // if (data.sites.length) {
  //   return (
  //     <DashboardShell>
  //       <SiteTableHeader />
  //       <SiteTable sites={data.sites} />
  //     </DashboardShell>
  //   );
  // }

  return (
    <DashboardShell>
      <ReviewTableHeader />
      {data.reviews?.length ? (
        <ReviewTable allReview={data.reviews} />
      ) : (
        <ReviewEmptyState />
      )}
    </DashboardShell>
  );
};

export default Review;
