import type { MetaFunction } from "@remix-run/react";
import type { Route } from "~/types";

interface ProductsPageProps extends Route.ComponentProps {}

export function meta(): MetaFunction {
  return [
    { title: "제품 | Product Hunt 클론" },
    { name: "description", content: "모든 제품 목록" },
  ];
}

export function loader({}: Route.LoaderArgs) {
  return {};
}

export default function ProductsPage({ loaderData }: ProductsPageProps) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">모든 제품</h1>
    </div>
  );
}
