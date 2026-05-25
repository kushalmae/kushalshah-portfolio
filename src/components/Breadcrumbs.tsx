import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export interface BreadcrumbTrailItem {
  label: string;
  /** Site-relative path. Omit on the current page (last item). */
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbTrailItem[];
  /** Extra classes for the outer `<nav>`. */
  className?: string;
  /** Pin below the site header while scrolling (long-form detail pages). */
  sticky?: boolean;
  /** Offset for the reading-progress bar directly under the header. */
  belowReadingProgress?: boolean;
}

/** Visible breadcrumb trail composed of the shadcn `Breadcrumb` primitives. The
 * matching `BreadcrumbList` JSON-LD payload is emitted separately via `Seo`'s
 * `jsonLd` prop so search results show the trail. */
const Breadcrumbs = ({
  items,
  className,
  sticky = false,
  belowReadingProgress = false,
}: BreadcrumbsProps) => {
  if (items.length === 0) return null;

  const trail = (
    <Breadcrumb className={cn("text-xs", sticky ? "mb-0" : "mb-8", className)}>
      <BreadcrumbList className="gap-1.5 sm:gap-1.5 text-xs">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <span key={`${item.label}-${idx}`} className="contents">
              <BreadcrumbItem
                className={cn(
                  isLast && "truncate max-w-[min(100%,24rem)]"
                )}
              >
                {isLast || !item.to ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.to}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="opacity-50" />}
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );

  if (!sticky) return trail;

  return (
    <div
      className={cn(
        "sticky z-30 mb-6 py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0",
        "border-b border-line bg-background/90 backdrop-blur-md",
        belowReadingProgress ? "top-[4.0625rem]" : "top-16"
      )}
    >
      {trail}
    </div>
  );
};

export default Breadcrumbs;
