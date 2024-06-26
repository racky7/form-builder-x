import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="flex justify-between p-4 border-b">
        <div className="text-2xl">Form Builder</div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit">Sign out</Button>
        </form>
      </div>
      <div className="p-4">
        <Button size="lg">+ Create New</Button>
      </div>
    </div>
  );
}
