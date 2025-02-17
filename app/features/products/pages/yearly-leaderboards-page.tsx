import { DateTime } from "luxon";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/yearly-leaderboards-page";
const paramsSchema = z.object({
  year: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  let title = "Yearly Leaderboard";
  if (success) {
    const date = DateTime.fromObject({
      year: parsedData.year,
    })
      .setZone("America/Los_Angeles")
      .setLocale("en");
    title = `Best of ${date.startOf("year").toLocaleString({
      year: "numeric",
    })}`;
  }

  return [{ title: title }];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);

  if (!success) {
    throw data(
      { message: "Invalid date", error_code: "INVALID_DATE" },
      { status: 400 }
    );
  }

  const date = DateTime.fromObject({
    year: parsedData.year,
  }).setZone("America/Los_Angeles");
  if (!date.isValid) {
    throw data(
      { message: "Invalid date", error_code: "INVALID_DATE" },
      { status: 400 }
    );
  }

  const today = DateTime.now().setZone("America/Los_Angeles").startOf("year");
  if (date > today) {
    throw data(
      { message: "Date is in the future", error_code: "FUTURE_DATE" },
      { status: 400 }
    );
  }

  return { ...parsedData };
};

export default function YearlyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
  });

  const previousYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("year"));

  return (
    <div className="space-y-10 ">
      <Hero
        title={`Best of ${urlDate.startOf("year").toLocaleString({
          year: "numeric",
        })}`}
      />
      <div className="flex justify-center items-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
            &larr;{" "}
            {previousYear.toLocaleString({
              year: "numeric",
            })}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
              {nextYear.toLocaleString({
                year: "numeric",
              })}{" "}
              &rarr;
            </Link>
          </Button>
        ) : null}
      </div>

      {Array.from({ length: 11 }).map((_, index) => {
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

      <ProductPagination totalPages={10} />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    );
  }

  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  return <div>Unknown error</div>;
}
