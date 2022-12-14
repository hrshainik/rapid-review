import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import Head from "next/head";
import { useAuth } from "../lib/auth";
import useSWR from "swr";
import SiteTableHeader from "@/components/SiteTableHeader";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import SiteTable from "@/components/SiteTable";
import fetcher from "utlis/fetcher";

const Dashboard = () => {
  const { user } = useAuth();
  // console.log("Token", user.token);
  const { data } = useSWR(user ? ["/api/sites", user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
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
      <SiteTableHeader />
      {data.sites.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;
