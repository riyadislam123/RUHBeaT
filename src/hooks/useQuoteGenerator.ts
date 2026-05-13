import { useState } from "react";
import { PosterConfig } from "../types";

export function useQuoteGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuote = async (config: PosterConfig): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error("Failed to generate quote");
      }

      const data = await response.json();
      return data.quote;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateQuote, loading, error };
}
