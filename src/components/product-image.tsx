import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
}

export function ProductImage(props: Props) {
  const { imageUrl, name, className } = props;

  return <img src={imageUrl} alt={name} className={cn("w-8.5 h-8.5 object-cover", className)} />;
}
