import { useState } from "react";
import { Form } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import type { Route } from "./+types/submit-page";

export const meta: Route.MetaFunction = ({}) => {
  return [
    { title: "Submit Product | wemake" },
    { name: "description", content: "Submit a new product" },
  ];
};

export default function SubmitPage() {
  const [icon, setIcon] = useState<string | null>(null);
  const onChangeIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setIcon(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Hero
        title="Submit Product"
        subtitle="Share your product with the world"
      />
      <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto">
        <div className="space-y-5">
          <InputPair
            label="Name"
            description="This is the name of your product"
            id="name"
            name="name"
            type="text"
            required
            placeholder="e.g. Product Name"
          />

          <InputPair
            label="Tagline"
            description="60 characters or less"
            id="tagline"
            name="tagline"
            required
            type="text"
            placeholder="e.g. The best way to build a website"
          />
          <InputPair
            label="URL"
            description="The URL of your product"
            id="url"
            name="url"
            required
            type="text"
            placeholder="e.g. https://www.producthunt.com/posts/product-name"
          />
          <InputPair
            textArea
            label="Description"
            description="The description of your product"
            id="description"
            name="description"
            required
            type="text"
            placeholder="e.g. The best way to build a website"
          />

          <SelectPair
            label="Category"
            description="The category of your product"
            name="category"
            placeholder="Select a category"
            required
            options={[
              { label: "Productivity", value: "productivity" },
              { label: "Design", value: "design" },
              { label: "Development", value: "development" },
              { label: "Marketing", value: "marketing" },
              { label: "Other", value: "other" },
            ]}
          />
          <Button type="submit" className="w-full" size="lg">
            Submit
          </Button>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="size-40 rounded-xl shadow-xl overflow-hidden">
            {icon ? (
              <img
                src={icon}
                alt="Icon"
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <Label className="flex flex-col gap-1">
            Icon
            <small className="text-muted-foreground">
              The icon of your product
            </small>
          </Label>
          <Input
            type="file"
            className="w-1/2"
            onChange={onChangeIcon}
            required
            name="icon"
          />
          <div className="flex flex-col text-xs">
            <span className="text-muted-foreground">
              Recommended size: 128x128px
            </span>
            <span className="text-muted-foreground">
              Allowed formats: PNG, JPEG, SVG
            </span>
            <span className="text-muted-foreground">
              Maximum file size: 1MB
            </span>
          </div>
        </div>
      </Form>
    </div>
  );
}
