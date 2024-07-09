import { TooltipProvider } from "@/components/ui/tooltip";
import { FormBuilderContextProvider } from "@/context";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <FormBuilderContextProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </FormBuilderContextProvider>
  );
}
