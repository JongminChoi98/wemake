import { DateTime } from "luxon";
import { Link } from "react-router";
import { PostCard } from "~/features/community/components/post-card";
import { getPosts } from "~/features/community/queries";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { ProductCard } from "~/features/products/components/product-card";
import { getProductsByDateRange } from "~/features/products/queries";
import { TeamCard } from "~/features/teams/components/team-card";
import { Button } from "../components/ui/button";
import type { Route } from "./+types/home-page";
export const meta = () => [
  { title: "Home | wemake" },
  { name: "description", content: "Welcome to wemake" },
];

export const loader = async () => {
  const products = await getProductsByDateRange({
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7,
  });

  const posts = await getPosts({
    limit: 7,
    sorting: "newest",
  });

  return { products, posts };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-40">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products made by our community today.
          </p>

          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
        </div>

        {loaderData.products.map((product) => {
          return (
            <ProductCard
              id={product.product_id.toString()}
              title={product.name}
              description={product.description}
              reviewsCount={product.reviews}
              viewsCount={product.views}
              upvotesCount={product.upvotes}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Lastest discussions
          </h2>
          <p className="text-xl font-light text-foreground">
            The latest discussions from our community.
          </p>

          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore all discussions &rarr;</Link>
          </Button>
        </div>

        {loaderData.posts.map((post) => {
          return (
            <PostCard
              key={post.post_id}
              id={post.post_id}
              title={post.title}
              author={post.author}
              authorAvatarUrl={post.author_avatar}
              category={post.topic}
              createdAt={post.created_at}
              votesCount={post.upvotes}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            IdeasGPT
          </h2>
          <p className="text-xl font-light text-foreground">
            Find the best ideas for your next project.
          </p>

          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/ideas">Explore all ideas &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 11 }).map((_, index) => {
          return (
            <IdeaCard
              id={`ideaId-${index}`}
              title="A startup that creates an AI-powered generated personal trainer, devlivering customized fitness recommendations and tracking of progress using a mobile app to treack workouts and progress as well as a website to manage the business."
              viewCount={123}
              createdAt="12 hours ago"
              likeCount={12}
              claimed={index % 2 === 0}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Lastest Jobs
          </h2>
          <p className="text-xl font-light text-foreground">
            Find your next job in the tech industry.
          </p>

          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/jobs">Explore all jobs &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 11 }).map((_, index) => {
          return (
            <JobCard
              id={`jobId-${index}`}
              company="Meta"
              companyLogoUrl="https://github.com/facebook.png"
              companyHq="San Francisco, CA"
              title="Software Engineer"
              createdAt="12 hours ago"
              type="Full-time"
              positionLocation="Remote"
              salary="$120,000 - $150,000"
            />
          );
        })}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Find a team mate
          </h2>
          <p className="text-xl font-light text-foreground">
            Join a team looking for a new team mate.
          </p>

          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/teams">Explore all teams &rarr;</Link>
          </Button>
        </div>

        {Array.from({ length: 7 }).map((_, index) => (
          <TeamCard
            key={index}
            id={`teamId-${index}`}
            leaderUsername="joey"
            leaderAvatarUrl="https://github.com/JongminChoi98.png"
            positions={[
              "React Developer",
              "Backend Developer",
              "Product Manager",
            ]}
            projectTitle="a new driving platform"
          />
        ))}
      </div>
    </div>
  );
}
