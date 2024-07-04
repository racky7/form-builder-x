import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import FormsSection from "./forms-section";
import CreateFormModal from "./create-form-modal";
import { useState } from "react";

export default function DashboardArea() {
  const [showCreateFormModal, setShowCreateFormModal] = useState(false);

  const handleCreateFormModal = (value: boolean) => {
    setShowCreateFormModal(value);
  };

  return (
    <>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-700">
            Your Forms
          </h1>
          <Button
            onClick={() => {
              handleCreateFormModal(true);
            }}
          >
            <PlusIcon className="h-4 w-4 mr-1" /> <div>New Form</div>
          </Button>
        </div>
      </header>
      <main>
        <FormsSection handleModal={handleCreateFormModal} />
      </main>
      <CreateFormModal
        open={showCreateFormModal}
        handleModal={handleCreateFormModal}
      />
    </>
  );
}
