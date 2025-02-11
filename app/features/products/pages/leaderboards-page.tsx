import type { MetaFunction } from "@remix-run/react";
import type { Route } from "~/types";

interface LeaderboardsPageProps extends Route.ComponentProps {}

export function meta(): MetaFunction {
  return [
    { title: "리더보드 | Product Hunt 클론" },
    { name: "description", content: "인기 제품 순위" },
  ];
}

export function loader({}: Route.LoaderArgs) {
  return {};
}

export default function LeaderboardsPage({
  loaderData,
}: LeaderboardsPageProps) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">리더보드</h1>
    </div>
  );
}
