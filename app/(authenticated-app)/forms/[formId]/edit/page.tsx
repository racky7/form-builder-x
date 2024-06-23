import { FORM_FIELD_CONFIG, FORM_FIELD_ITEMS } from "@/lib/form-elements";
import Navbar from "./_components/navbar";

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <div className="h-fit w-80 border-r p-4 grid grid-cols-2 gap-4">
          {FORM_FIELD_ITEMS.map((type) => {
            return (
              <div
                key={`field-${type}`}
                className="col-span-1 flex flex-col items-center h-fit w-full border p-2"
              >
                {FORM_FIELD_CONFIG[type].icon}
                {FORM_FIELD_CONFIG[type].name}
              </div>
            );
          })}
        </div>
        <div className="flex-1 flex justify-center bg-primary/10">
          Canvas Area
        </div>
      </div>
    </div>
  );
}
