import type { MetaFunction } from "@remix-run/react";
import type { Route } from "~/types";

interface CategoryPageProps extends Route.ComponentProps {}

export function meta(): MetaFunction {
  return [
    { title: "카테고리 상세 | Product Hunt 클론" },
    { name: "description", content: "카테고리별 제품 목록" },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  return {
    category: params.category,
  };
}

export default function CategoryPage({ loaderData }: CategoryPageProps) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">{loaderData.category} 카테고리</h1>
    </div>
  );
}
