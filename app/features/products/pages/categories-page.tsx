import { Hero } from "~/common/components/hero";
import { makeSSRClient } from "~/supabase-client";
import { CategoryCard } from "../components/category-card";
import { getCategories } from "../queries";
import type { Route } from "./+types/categories-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Categories | wemake" },
    { name: "description", content: "Product categories" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const categories = await getCategories(client);
  return { categories };
};

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="Categories" subtitle="Product categories" />

      <div className="grid grid-cols-4 gap-10">
        {loaderData.categories.map((category) => (
          <CategoryCard
            id={category.category_id}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
}
