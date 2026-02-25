import { MapPin, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface SearchResult {
  id: number;
  reason: string;
  title?: string;
  location?: string;
  price?: number;
  tags?: string[];
}

const ResultCard = ({ result }: { result: SearchResult }) => (
  <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
    {result.title && (
      <h3 className="text-lg font-semibold text-card-foreground mb-1">
        {result.title}
      </h3>
    )}

    <div className="flex items-center gap-4 mb-3">
      {result.location && (
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {result.location}
        </span>
      )}
      {result.price != null && (
        <span className="flex items-center gap-0.5 text-sm font-semibold text-primary">
          <DollarSign className="h-3.5 w-3.5" />
          {result.price}
        </span>
      )}
    </div>

    {result.tags && result.tags.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-3">
        {result.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-accent text-accent-foreground text-xs font-medium"
          >
            {tag}
          </Badge>
        ))}
      </div>
    )}

    <p className="text-sm text-muted-foreground leading-relaxed">
      <span className="font-medium text-card-foreground">Why this matches: </span>
      {result.reason}
    </p>
  </div>
);

export default ResultCard;
