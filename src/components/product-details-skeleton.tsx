import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-3 px-3">
      <Skeleton className="h-12 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-14 w-full rounded-lg lg:h-48" />
    </div>
  );
}
