"use client";
import { ManagerType } from "@/api/Manager/types";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange"; // Import the DatePicker component
import { DateRange } from "react-day-picker"
import {
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  columns: ColumnDef<ManagerType>[];
  data: ManagerType[];
}

export function DataTable({ columns, data }: DataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const filteredData = React.useMemo(() => {
      if (!dateRange?.from || !dateRange?.to) return data; 
  
      return data.filter((item) => {
        const itemDate = new Date(item.createdDate); 
        return itemDate >= dateRange?.from && itemDate <= dateRange?.to;
      });
    }, [data, dateRange]);
  
    const totalProfit = React.useMemo(() => {
      return filteredData.reduce((total, item) => {
        return total + (item.total_Profit || 0); // Ensure `profit` exists on the item
      }, 0);
    }, [filteredData]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Item ..."
          value={(table.getColumn("productName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("productName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="py-4 flex justify-center items-center flex-grow">
        <span className="font-semibold">Total Profit: </span>
        <span>{totalProfit.toFixed(2)}</span>
      </div>
      <div className="py-4 items-end ml-auto">
        <DatePickerWithRange
          className="max-w-sm"
          onSelect={setDateRange} 
        />
      </div>
      </div>
         
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
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
