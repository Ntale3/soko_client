export const ResultsCount = ({ count, query }: { count: number; query: string }) => (
  <p className="mb-3 text-[11px] text-muted-foreground">
    {count} result{count !== 1 ? "s" : ""}
    {query && (
      <span>
        {" "}
        for <span className="font-semibold text-foreground">"{query}"</span>
      </span>
    )}
  </p>
);
