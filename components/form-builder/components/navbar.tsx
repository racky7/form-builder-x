import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <div className="flex p-4 border-b">
      <div className="text-2xl flex-1">Form Builder</div>
      <Button>Publish</Button>
    </div>
  );
}
