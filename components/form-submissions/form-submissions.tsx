"use client";

import { trpc } from "@/lib/trpc/client";
import SubmissionsTable from "./components/submissions-table";
import { match } from "ts-pattern";
import { useParams } from "next/navigation";
import { submissionsDataConfig } from "@/lib/form";

export default function FormSubmissions() {
  const params = useParams<{ formSlug: string }>();
  const getFormSubmissionsQuery =
    trpc.formSubmission.getFormSubmissions.useQuery({
      formSlug: params.formSlug,
    });

  return (
    <div className="w-full h-full py-10 bg-gray-50">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:flex items-center justify-between">
          <div className="flex items-center col-span-1">
            <h1 className="truncate pr-2 leading-tight tracking-tight text-gray-700">
              Submissions of XYZ Form
            </h1>
          </div>
          <div></div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mt-4">
            {match(getFormSubmissionsQuery)
              .returnType<React.ReactNode>()
              .with({ status: "loading" }, () => <div>Loading...</div>)
              .with({ status: "error" }, () => {
                return <div>Error</div>;
              })
              .with({ status: "success" }, ({ data }) => {
                console.log(data);
                const submissionsData = submissionsDataConfig
                  .parse(data)
                  .map((data) => {
                    return {
                      ...data.submission,
                    };
                  });
                return <SubmissionsTable submissionsData={submissionsData} />;
              })
              .exhaustive()}
          </div>
        </div>
      </main>
    </div>
  );
}
