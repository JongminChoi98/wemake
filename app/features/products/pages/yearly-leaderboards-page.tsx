import type { MetaFunction } from "@remix-run/react";
import type { Route } from "~/types";

interface YearlyLeaderboardsPageProps extends Route.ComponentProps {}

export function meta(): MetaFunction {
  return [
    { title: "연간 리더보드 | Product Hunt 클론" },
    { name: "description", content: "연간 인기 제품 순위" },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  return {
    year: params.year,
  };
}

export default function YearlyLeaderboardsPage({
  loaderData,
}: YearlyLeaderboardsPageProps) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">{loaderData.year}년 리더보드</h1>
    </div>
  );
}
