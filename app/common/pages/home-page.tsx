import { Link, type MetaFunction } from "react-router";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { ProductCard } from "~/features/products/components/product-card";
import { TeamCard } from "~/features/teams/components/team-card";
import { Button } from "../components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | wemake" },
    { name: "description", content: "Welcome to wemake" },
  ];
};

export default function HomePage() {
  return (
    <div className="px-20 space-y-40">
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

        {Array.from({ length: 11 }).map((_, index) => {
          return (
            <PostCard
              id={`postId-${index}`}
              title="What is the best productivity tool?"
              author="Joey"
              authorAvatarUrl="https://github.com/shadcn.png"
              category="Productivity"
              createdAt="12 hours ago"
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
