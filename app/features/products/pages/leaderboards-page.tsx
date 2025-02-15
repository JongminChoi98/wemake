import { Link } from "react-router";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/leaderboards-page";

interface LeaderboardsPageProps extends Route.ComponentProps {}

export function meta() {
  return [
    { title: "Leaderboards | wemake" },
    { name: "description", content: "Top products leaderboard" },
  ];
}

export default function LeaderboardsPage({
  loaderData,
}: LeaderboardsPageProps) {
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

        {Array.from({ length: 7 }).map((_, index) => {
          return (
            <ProductCard
              id={`productId-${index}`}
              title="Product Name"
              description="The best product made by our community today."
              commentCount={12}
              viewCount={12}
              upvoteCount={82}
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

        {Array.from({ length: 7 }).map((_, index) => {
          return (
            <ProductCard
              id={`productId-${index}`}
              title="Product Name"
              description="The best product made by our community today."
              commentCount={12}
              viewCount={12}
              upvoteCount={82}
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

        {Array.from({ length: 7 }).map((_, index) => {
          return (
            <ProductCard
              id={`productId-${index}`}
              title="Product Name"
              description="The best product made by our community today."
              commentCount={12}
              viewCount={12}
              upvoteCount={82}
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

        {Array.from({ length: 7 }).map((_, index) => {
          return (
            <ProductCard
              id={`productId-${index}`}
              title="Product Name"
              description="The best product made by our community today."
              commentCount={12}
              viewCount={12}
              upvoteCount={82}
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
