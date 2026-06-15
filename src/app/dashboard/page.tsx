'use client'
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

function Dashboard() {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: () => authClient.getSession(),
  });

  console.log(session);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Name: {session?.data?.user.name}</p>
      <p>Email: {session?.data?.user.email}</p>
    </div>
  );
}

export default Dashboard;
