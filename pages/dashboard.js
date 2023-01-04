import EmptyState from "@/components/EmptyState";
import Head from "next/head";
import { useAuth } from "../lib/auth";

const Dashboard = () => {
  const auth = useAuth();

  if (!auth.user) {
    return "Loading...";
  }
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <EmptyState />;
    </>
  );
};

export default Dashboard;
