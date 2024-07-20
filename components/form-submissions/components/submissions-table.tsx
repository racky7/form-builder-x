"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormBuilderContext } from "@/context";
import { format } from "date-fns";

type SingleSubmission = {
  [fieldId: string]: string | string[] | null;
};

type SubmissionsTableProps = {
  submissionsData: SingleSubmission[];
};

export default function SubmissionsTable({
  submissionsData,
}: SubmissionsTableProps) {
  const { fieldsOrder, fieldsSchema } = useFormBuilderContext();
  const columns: ColumnDef<SingleSubmission>[] = fieldsOrder.map((fieldId) => {
    const element = document.createElement("div");
    element.innerHTML = fieldsSchema[fieldId].name;
    const fieldData = fieldsSchema[fieldId].field;
    return {
      header: element.innerText,
      accessorKey: fieldId,
      cell: (info) => {
        if (fieldData.type === "date") {
          return format(info.getValue() as Date, "PPP");
        }

        if (fieldData.type === "checkboxes") {
          const optionIds = info.getValue() as string[];
          return optionIds
            ?.map((optionId) => {
              return fieldData.options.find((item) => item._id === optionId)
                ?.name;
            })
            .join(", ");
        }

        return info.getValue();
      },
    };
  });

  const table = useReactTable({
    data: submissionsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md">
      <Table className="min-w-full border border-gray-200">
        <TableHeader className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="h-1">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="border border-gray-200 text-sm text-gray-700  pl-4 pr-4 sm:pl-6"
                  >
                    <div className="py-5 truncate">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className="max-w-60 border border-gray-200 min-w-20 pl-4 pr-4 text-sm text-gray-700 sm:pl-6"
                    >
                      <div className="py-4 truncate">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No submissions.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
