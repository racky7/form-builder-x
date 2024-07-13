import { signOut } from "@/auth";
import Navbar from "./_components/navbar";
import { getUserSession } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();

  return (
    <div className="w-full min-h-full flex flex-col">
      <Navbar
        name={session?.user.name ?? ""}
        email={session?.user.email ?? ""}
      />
      {children}
    </div>
  );
}
