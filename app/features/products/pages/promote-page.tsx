import { DateTime } from "luxon";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Form } from "react-router";
import { Hero } from "~/common/components/hero";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import type { Route } from "./+types/promote-page";

export const meta: Route.MetaFunction = ({}) => {
  return [
    { title: "Promote Product | wemake" },
    { name: "description", content: "Promote your product" },
  ];
};

export default function PromotePage() {
  const [promotionPeriod, setPromotionPeriod] = useState<DateRange | undefined>(
    undefined
  );
  const totalDays =
    promotionPeriod?.from && promotionPeriod.to
      ? DateTime.fromJSDate(promotionPeriod.to).diff(
          DateTime.fromJSDate(promotionPeriod.from),
          "days"
        ).days
      : 0;
  return (
    <div>
      <Hero
        title="Promote Product"
        subtitle="Boost your product visibility and get more customers"
      />
      <Form className="max-w-sm mx-auto flex flex-col gap-10 items-center">
        <SelectPair
          label="Select a product"
          description="Select the product you want to promote"
          name="product"
          placeholder="Select a product"
          options={[
            { label: "AI Dark Mode-1", value: "product-1" },
            { label: "AI Dark Mode-2", value: "product-2" },
            { label: "AI Dark Mode-3", value: "product-3" },
            { label: "AI Dark Mode-4", value: "product-4" },
            { label: "AI Dark Mode-5", value: "product-5" },
            { label: "AI Dark Mode-6", value: "product-6" },
            { label: "AI Dark Mode-7", value: "product-7" },
          ]}
        />

        <div className="flex flex-col gap-2 items-center w-full">
          <Label className="flex flex-col gap-1">
            Select a range of dates for promotion
            <small className="text-muted-foreground text-center">
              Minimun duration is 3 days
            </small>
          </Label>
          <Calendar
            mode="range"
            selected={promotionPeriod}
            onSelect={setPromotionPeriod}
            min={3}
            disabled={{ before: new Date() }}
          />
        </div>
        <Button disabled={totalDays === 0}>
          Go to checkout (${totalDays * 20})
        </Button>
      </Form>
    </div>
  );
}
