import { Button } from "../components/ui/button";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Home Page</h1>
      <p className="text-lg mb-8">Get started by exploring the features </p>

      <div className="flex gap-4">
        <Button variant={"default"}>Get Started</Button>
        <Button variant={"outline"}>Learn more</Button>
      </div>
    </main>
  );
}
