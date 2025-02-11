import type { MetaFunction } from "@remix-run/react";
import type { Route } from "~/types";

interface WeeklyLeaderboardsPageProps extends Route.ComponentProps {}

export function meta(): MetaFunction {
  return [
    { title: "주간 리더보드 | Product Hunt 클론" },
    { name: "description", content: "주간 인기 제품 순위" },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  return {
    year: params.year,
    week: params.week,
  };
}

export default function WeeklyLeaderboardsPage({
  loaderData,
}: WeeklyLeaderboardsPageProps) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">
        {loaderData.year}년 {loaderData.week}주차 리더보드
      </h1>
    </div>
  );
}
