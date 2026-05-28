"use client";

import { useState, useEffect } from "react";

export function useLoading<T>(data: T, delay = 700) {
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return { loading, error, data };
}
