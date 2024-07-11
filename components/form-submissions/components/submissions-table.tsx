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

type SingleSubmission = {
  [fieldId: string]: string | null;
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
    return {
      header: element.innerText,
      accessorKey: fieldId,
    };
  });

  const table = useReactTable({
    data: submissionsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
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
