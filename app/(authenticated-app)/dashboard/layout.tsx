import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-full flex flex-col">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-semibold text-primary">
              FormBuilderX
            </div>
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
      {children}
    </div>
  );
}
