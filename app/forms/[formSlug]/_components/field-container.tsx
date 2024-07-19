import { cn } from "@/lib/utils";

type FieldContainerProps = {
  children: React.ReactNode;
  isError: boolean;
};

export default function FieldContainer({
  children,
  isError,
}: FieldContainerProps) {
  return (
    <div
      className={cn(
        "w-full bg-white rounded-lg border pt-1 border-gray-300",
        isError ? "border-red-500" : null
      )}
    >
      <div className="w-full h-4 flex"></div>
      {children}
    </div>
  );
}
