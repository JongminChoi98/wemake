import { DateTime } from "luxon";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import { PAGE_SIZE } from "../contants";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
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

  const url = new URL(request.url);
  const products = await getProductsByDateRange({
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") || 1),
  });
  const pages = await getProductPagesByDateRange({
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
  });

  return { ...parsedData, products, pages };
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
