import { createFileRoute } from "@tanstack/react-router";

import { pageHead } from "@/config/site";
import { VotePage } from "@/components/site/vote-page";

export const Route = createFileRoute("/votes")({
  head: () => pageHead("vote"),
  component: VotePage,
});
