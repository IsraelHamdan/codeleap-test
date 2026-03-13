import { dashboardLayoutStyle } from "@/app/tailwindGlobal";
import { postsKey, STALE_TIME } from "@/hooks/usePosts";
import { api } from "@/lib/api";
import { getDashboardData } from "@/lib/dashboard.service";
import { getQueryClient } from "@/lib/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import Btn from "./_components/btn";

export const metadata: Metadata = {
  title: "CodeLeap Newtoworking| Dashboard",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: postsKey.all,
    queryFn: () => getDashboardData(api),

    staleTime: STALE_TIME
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={dashboardLayoutStyle.stack}>
        <div className={dashboardLayoutStyle.actionBar}>
          <Btn />
        </div>
        {children}
      </div>
    </HydrationBoundary>
  );
}
