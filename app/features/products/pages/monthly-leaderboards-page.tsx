import { DateTime } from "luxon";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supabase-client";
import { ProductCard } from "../components/product-card";
import { PAGE_SIZE } from "../contants";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import type { Route } from "./+types/monthly-leaderboards-page";
const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  let title = "Montly Leaderboard";
  if (success) {
    const date = DateTime.fromObject({
      year: parsedData.year,
      month: parsedData.month,
    })
      .setZone("America/Los_Angeles")
      .setLocale("en");
    title = `Best of ${date.startOf("month").toLocaleString({
      month: "long",
      year: "2-digit",
    })}`;
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

  const date = DateTime.fromObject({
    year: parsedData.year,
    month: parsedData.month,
  }).setZone("America/Los_Angeles");
  if (!date.isValid) {
    throw data(
      { message: "Invalid date", error_code: "INVALID_DATE" },
      { status: 400 }
    );
  }

  const today = DateTime.now().setZone("America/Los_Angeles").startOf("month");
  if (date > today) {
    throw data(
      { message: "Date is in the future", error_code: "FUTURE_DATE" },
      { status: 400 }
    );
  }

  const url = new URL(request.url);
  const { client } = makeSSRClient(request);
  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("month"),
    endDate: date.endOf("month"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") || 1),
  });

  const pages = await getProductPagesByDateRange(client, {
    startDate: date.startOf("month"),
    endDate: date.endOf("month"),
  });

  return { ...parsedData, products, pages };
};

export default function MonthlyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
  });

  const previousMonth = urlDate.minus({ months: 1 });
  const nextMonth = urlDate.plus({ months: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("month"));

  return (
    <div className="space-y-10 ">
      <Hero
        title={`Best of ${urlDate.startOf("month").toLocaleString({
          month: "long",
          year: "2-digit",
        })}`}
      />
      <div className="flex justify-center items-center gap-2">
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}
          >
            &larr;{" "}
            {previousMonth.toLocaleString({
              month: "long",
              year: "2-digit",
            })}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link
              to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}
            >
              {nextMonth.toLocaleString({
                month: "long",
                year: "2-digit",
              })}{" "}
              &rarr;
            </Link>
          </Button>
        ) : null}
      </div>

      <div className="space-y-5 w-full max-w-screen-lg mx-auto">
        {loaderData.products.map((product) => {
          return (
            <ProductCard
              key={product.product_id}
              id={product.product_id}
              title={product.name}
              description={product.tagline}
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
