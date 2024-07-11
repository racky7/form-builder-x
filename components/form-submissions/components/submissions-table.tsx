import { ColumnDef } from "@tanstack/react-table";

type SingleSubmission = {
  [fieldId: string]: string | null;
};

type SubmissionsTableProps = {
  submissionsData: SingleSubmission[];
};

export default function SubmissionsTable({
  submissionsData,
}: SubmissionsTableProps) {
  const columns: ColumnDef<SingleSubmission>[] = submissionsData.map((key) => {
    return {
      header: "XYZ FieldName",
      accessorKey: key,
    };
  });

  return <div></div>;
}
