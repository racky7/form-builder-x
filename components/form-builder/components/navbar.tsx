import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="grid grid-cols-12 bg-white text-gray-700 items-center p-4 border-b border-slate-200">
      <div className="col-span-8 flex items-center">
        <Link
          href="/forms"
          className="p-2 block text-primary transition ease-in-out delay-150 hover:-translate-x-1"
        >
          <ArrowLeftIcon />
        </Link>
        <div className="block pl-2 border-l border-gray-200">
          <h1 className="font-semibold truncate cursor-pointer text-gray-600 hover:border-b hover:border-gray-300">
            My Form
          </h1>
        </div>
      </div>
      <div className="col-span-4 flex justify-end items-center">
        <Button>Save</Button>
      </div>
    </nav>
  );
}
