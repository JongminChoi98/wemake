import { Hero } from "~/common/components/hero";
import { IdeaCard } from "../components/idea-card";
import type { Route } from "./+types/ideas-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "IdeasGPT | wemake" },
    { name: "description", content: "Find ideas for your next project" },
  ];
};

export default function IdeasPage() {
  return (
    <div className="space-y-20">
      <Hero title="IdeasGPT" subtitle="Find ideas for your next project" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 11 }).map((_, index) => {
          return (
            <IdeaCard
              key={`ideaId-${index}`}
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
    </div>
  );
}
