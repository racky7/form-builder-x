import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="w-full min-h-full flex flex-col">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl flex-1">Form Builder</div>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button type="submit">Sign out</Button>
            </form>
          </div>
        </div>
      </nav>
      <div className="pt-10 pb-16 bg-gray-50 flex-1">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-700">
              Your Forms
            </h1>
            <Button>
              <PlusIcon className="h-4 w-4 mr-1" /> <div>New Form</div>
            </Button>
          </div>
        </header>
        <main></main>
      </div>
    </div>
  );
}
