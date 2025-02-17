import { DateTime } from "luxon";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/daily-leaderboards-page";
const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  let title = "Daily Leaderboard";
  if (success) {
    const date = DateTime.fromObject({
      year: parsedData.year,
      month: parsedData.month,
      day: parsedData.day,
    })
      .setZone("America/Los_Angeles")
      .setLocale("en");
    title = `The best products of ${date.toLocaleString(DateTime.DATE_MED)}`;
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

  const date = DateTime.fromObject(parsedData).setZone("America/Los_Angeles");
  if (!date.isValid) {
    throw data(
      { message: "Invalid date", error_code: "INVALID_DATE" },
      { status: 400 }
    );
  }

  const today = DateTime.now().setZone("America/Los_Angeles").startOf("day");
  if (date > today) {
    throw data(
      { message: "Date is in the future", error_code: "FUTURE_DATE" },
      { status: 400 }
    );
  }

  return { ...parsedData };
};

export default function DailyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
    day: loaderData.day,
  });

  const previousDay = urlDate.minus({ days: 1 });
  const nextDay = urlDate.plus({ days: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("day"));

  return (
    <div className="space-y-10 ">
      <Hero
        title={`The best of Product Hunt on ${urlDate.toLocaleString(
          DateTime.DATE_MED
        )}`}
      />
      <div className="flex justify-center items-center gap-2">
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}
          >
            &larr; {previousDay.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link
              to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}
            >
              {nextDay.toLocaleString(DateTime.DATE_SHORT)} &rarr;
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
