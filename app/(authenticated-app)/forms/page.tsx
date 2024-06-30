import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import FormCard from "./_components/form-card";
import CreateFormModal from "./_components/create-form-modal";

export default async function DashboardPage() {
  const session = await auth();

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
      <div className="pt-10 pb-16 bg-gray-50 flex-1">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-700">
              Your Forms
            </h1>
            <CreateFormModal />
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 mt-7 py-1 gap-6">
              <FormCard className="col-span-12 md:col-span-6 lg:col-span-2" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
