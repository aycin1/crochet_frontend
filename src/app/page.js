"use server";
import ListDashboard from "@/components/ListDashboard/ListDashboard";

export default async function Home() {
  return (
    <div className="page">
      <ListDashboard />
    </div>
  );
}
