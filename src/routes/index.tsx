import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/config/site";
import { HomePage } from "@/components/site/home-page";

export const Route = createFileRoute("/")({
  head: () => pageHead("home"),
  component: HomePage,
});
