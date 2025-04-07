import { DateTime } from "luxon";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import { PAGE_SIZE } from "../contants";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import type { Route } from "./+types/daily-leaderboards-page";

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

const searchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
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

export const loader = async ({ params, request }: Route.LoaderArgs) => {
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

  const url = new URL(request.url);
  const products = await getProductsByDateRange({
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") || 1),
  });
  const pages = await getProductPagesByDateRange({
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
  });

  return { ...parsedData, products, pages };
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

      <div className="space-y-5 w-full max-w-screen-lg mx-auto">
        {loaderData.products.map((product) => {
          return (
            <ProductCard
              id={product.product_id.toString()}
              title={product.name}
              description={product.description}
              reviewsCount={product.reviews.toString()}
              viewsCount={product.views.toString()}
              upvotesCount={product.upvotes.toString()}
            />
          );
        })}
      </div>

      <ProductPagination totalPages={loaderData.pages} />
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
