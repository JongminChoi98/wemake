import type { MetaFunction } from "@remix-run/react";
import type { Route } from "~/types";

interface SearchPageProps extends Route.ComponentProps {}

export function meta(): MetaFunction {
  return [
    { title: "검색 | Product Hunt 클론" },
    { name: "description", content: "제품 검색" },
  ];
}

export function loader({}: Route.LoaderArgs) {
  return {};
}

export default function SearchPage({ loaderData }: SearchPageProps) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">제품 검색</h1>
    </div>
  );
}
