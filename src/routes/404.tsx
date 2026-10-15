import { createFileRoute } from "@tanstack/react-router";

import { pageHead } from "@/config/site";
import { NotFoundPage } from "@/components/site/not-found-page";

export const Route = createFileRoute("/404")({
  head: () => pageHead("notFound"),
  component: NotFoundPage,
});
