"use client"; // Important to run this on the client-side

import { useState } from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ResultCard, { type SearchResult } from "@/components/ResultCard";

const EXAMPLE_QUERY = "Chilled beach weekend with surfing vibes under $100";

const Index = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Access the environment variable
      console.log("API URL:", apiUrl); // Debugging line to ensure correct URL is being used

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setResults(data.matches ?? []);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-yellow-200 px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            {/* Logo Image */}
            <img src="/logo.png" alt="DestiNova Logo" className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              DestiNova
            </h1>
          </div>
          <p className="text-sm font-semibold text-muted-foreground">
            Explore exciting destinations with DestiNova
          </p>
        </header>

        {/* Search Card */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm mb-10">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., chilled beach weekend with surfing vibes under $100"
            rows={3}
            className="resize-none text-base bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-ring mb-4"
          />

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setQuery(EXAMPLE_QUERY)}
              className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
            >
              Try example
            </button>

            <Button
              onClick={handleSearch}
              disabled={!query.trim() || loading}
              className="gap-2 bg-green-300 hover:bg-green-400 text-white"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {loading ? "Searching…" : "Search"}
            </Button>
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Searching…</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {results !== null && results.length === 0 && !loading && (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              No matches found. Try changing budget, location, or tags.
            </p>
          </div>
        )}

        {results && results.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((r) => (
              <ResultCard key={r.id} result={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;