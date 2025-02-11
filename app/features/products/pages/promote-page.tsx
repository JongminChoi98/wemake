import type { MetaFunction } from "@remix-run/react";
import type { Route } from "~/types";

interface PromotePageProps extends Route.ComponentProps {}

export function meta(): MetaFunction {
  return [
    { title: "제품 홍보 | Product Hunt 클론" },
    { name: "description", content: "제품 홍보하기" },
  ];
}

export function loader({}: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function PromotePage({ loaderData }: PromotePageProps) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">제품 홍보하기</h1>
    </div>
  );
}
