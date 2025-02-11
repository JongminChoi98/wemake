import type { MetaFunction } from "@remix-run/react";
import type { Route } from "~/types";

interface CategoriesPageProps extends Route.ComponentProps {}

export function meta(): MetaFunction {
  return [
    { title: "카테고리 | Product Hunt 클론" },
    { name: "description", content: "제품 카테고리 목록" },
  ];
}

export function loader({}: Route.LoaderArgs) {
  return {};
}

export default function CategoriesPage({ loaderData }: CategoriesPageProps) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">카테고리</h1>
    </div>
  );
}
