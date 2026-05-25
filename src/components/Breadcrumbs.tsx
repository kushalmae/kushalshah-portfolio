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
}

/** Visible breadcrumb trail composed of the shadcn `Breadcrumb` primitives. The
 * matching `BreadcrumbList` JSON-LD payload is emitted separately via `Seo`'s
 * `jsonLd` prop so search results show the trail. */
const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  if (items.length === 0) return null;

  return (
    <Breadcrumb className={cn("mb-8 text-xs", className)}>
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
};

export default Breadcrumbs;
