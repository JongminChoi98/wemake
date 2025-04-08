import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { DateTime } from "luxon";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { cn } from "~/lib/utils";

interface IdeaCardProps {
  id: number;
  title: string;
  viewCount: number;
  createdAt: string;
  likeCount: number;
  claimed: boolean;
}

export function IdeaCard({
  id,
  title,
  viewCount,
  createdAt,
  likeCount,
  claimed,
}: IdeaCardProps) {
  return (
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      <CardHeader>
        <Link to={`/ideas/${id}`}>
          <CardTitle className="text-xl">
            <span
              className={cn(
                claimed
                  ? "bg-muted-foreground selection:bg-muted-foreground text-muted-foreground"
                  : ""
              )}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex items-center gap-1 text-sm">
        <div className="flex items-center gap-2">
          <EyeIcon className="w-4 h-4" />
          <span>{viewCount}</span>
        </div>
        <DotIcon className="w-4 h-4" />
        <span>{DateTime.fromISO(createdAt).toRelative()}</span>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">
          <HeartIcon className="w-4 h-4" />
          <span>{likeCount}</span>
        </Button>
        {!claimed ? (
          <Button asChild>
            <Link to={`/ideas/${id}/claim`}>Claim idea now &rarr;</Link>
          </Button>
        ) : (
          <Button variant="outline" className="cursor-not-allowed">
            <LockIcon className="size-4" />
            <span>Claimed</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
