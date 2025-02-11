import type { MetaFunction } from "@remix-run/react";
import type { Route } from "~/types";

interface MonthlyLeaderboardsPageProps extends Route.ComponentProps {}

export function meta(): MetaFunction {
  return [
    { title: "월간 리더보드 | Product Hunt 클론" },
    { name: "description", content: "월간 인기 제품 순위" },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  return {
    year: params.year,
    month: params.month,
  };
}

export default function MonthlyLeaderboardsPage({
  loaderData,
}: MonthlyLeaderboardsPageProps) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">
        {loaderData.year}년 {loaderData.month}월 리더보드
      </h1>
    </div>
  );
}
