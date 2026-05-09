"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PropertiesPage from "../properties/page";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div>
      <div className="pt-32 container mx-auto px-6 text-center">
        <h2 className="text-2xl font-outfit text-muted-foreground">
          Showing results for: <span className="text-white font-bold">"{query}"</span>
        </h2>
      </div>
      <PropertiesPage />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center">Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
