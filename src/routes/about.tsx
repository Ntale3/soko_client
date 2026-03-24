import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="p-2">
      <Button>Hello world</Button>
    </div>
  );
}
