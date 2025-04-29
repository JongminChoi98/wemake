import { DateTime } from "luxon";
import { Link } from "react-router";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import { getProductsByDateRange } from "../queries";
import type { Route } from "./+types/leaderboards-page";

interface LeaderboardsPageProps extends Route.ComponentProps {}

export function meta() {
  return [
    { title: "Leaderboards | wemake" },
    { name: "description", content: "Top products leaderboard" },
  ];
}

export const loader = async () => {
  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] =
    await Promise.all([
      getProductsByDateRange({
        startDate: DateTime.now().startOf("day"),
        endDate: DateTime.now().endOf("day"),
        limit: 7,
      }),
      getProductsByDateRange({
        startDate: DateTime.now().startOf("week"),
        endDate: DateTime.now().endOf("week"),
        limit: 7,
      }),
      getProductsByDateRange({
        startDate: DateTime.now().startOf("month"),
        endDate: DateTime.now().endOf("month"),
        limit: 7,
      }),
      getProductsByDateRange({
        startDate: DateTime.now().startOf("year"),
        endDate: DateTime.now().endOf("year"),
        limit: 7,
      }),
    ]);

  return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
};

export default function LeaderboardsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="Leaderboards"
        subtitle="The best products made by our community today."
      />

      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Daily Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products made by our community today.
          </p>
        </div>

        {loaderData.dailyProducts.map((product) => {
          return (
            <ProductCard
              key={product.product_id}
              id={product.product_id.toString()}
              title={product.name}
              description={product.tagline}
              reviewsCount={product.reviews}
              viewsCount={product.views}
              upvotesCount={product.upvotes}
            />
          );
        })}
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/daily">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Weekly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products made by our community this week.
          </p>
        </div>

        {loaderData.weeklyProducts.map((product) => {
          return (
            <ProductCard
              key={product.product_id}
              id={product.product_id.toString()}
              title={product.name}
              description={product.tagline}
              reviewsCount={product.reviews}
              viewsCount={product.views}
              upvotesCount={product.upvotes}
            />
          );
        })}
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/weekly">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Monthly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products made by our community this month.
          </p>
        </div>

        {loaderData.monthlyProducts.map((product) => {
          return (
            <ProductCard
              key={product.product_id}
              id={product.product_id.toString()}
              title={product.name}
              description={product.tagline}
              reviewsCount={product.reviews}
              viewsCount={product.views}
              upvotesCount={product.upvotes}
            />
          );
        })}
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/monthly">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Yearly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products made by our community this year.
          </p>
        </div>

        {loaderData.yearlyProducts.map((product) => {
          return (
            <ProductCard
              key={product.product_id}
              id={product.product_id.toString()}
              title={product.name}
              description={product.tagline}
              reviewsCount={product.reviews}
              viewsCount={product.views}
              upvotesCount={product.upvotes}
            />
          );
        })}
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/yearly">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
