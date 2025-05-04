import { redirect } from "react-router";
import { makeSSRClient } from "~/supabase-client";
import type { Route } from "./+types/logout-page";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { error } = await client.auth.signOut();
  if (error) {
    return {
      error: error.message,
    };
  }

  return redirect("/", { headers });
};
