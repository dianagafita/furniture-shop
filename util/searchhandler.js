"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchHandler({ onFilter }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const title = searchParams.get("title");
    if (title) {
      onFilter(title);
    }
  }, [searchParams, onFilter]);

  return null;
}
