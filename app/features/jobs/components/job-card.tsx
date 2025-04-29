import { DateTime } from "luxon";
import { Link } from "react-router";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

interface JobCardProps {
  id: number;
  company: string;
  companyLogoUrl: string;
  title: string;
  companyHq: string;
  createdAt: string;
  type: string;
  positionLocation: string;
  salary: string;
}

export function JobCard({
  id,
  company,
  companyLogoUrl,
  companyHq,
  title,
  createdAt,
  type,
  positionLocation,
  salary,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className="bg-transparent transition-colors hover:bg-card/50">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={
                companyLogoUrl.startsWith("http")
                  ? companyLogoUrl
                  : `https://${companyLogoUrl}`
              }
              alt={`${company} Logo`}
              className="size-10 rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/40";
              }}
            />
            <div className="space-x-2">
              <span className="text-accent-foreground">{company}</span>
              <span className="text-xs text-muted-foreground">
                {DateTime.fromISO(createdAt).toRelative()}
              </span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline" className="capitalize">
            {type}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {positionLocation}
          </Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">
              {salary}
            </span>
            <span className="flex gap-2 text-sm font-medium text-muted-foreground">
              {companyHq}
            </span>
          </div>
          <Button variant="secondary" size="sm">
            Apply now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
