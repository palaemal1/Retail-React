"use client"
import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table";
import { ManagerType } from "@/api/Manager/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { format } from 'date-fns';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export const columns: ColumnDef<ManagerType>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "sellCount",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Selling Count
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "sellingQty",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Selling Qty
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "residualQty",
    header: "Residual Qty",
  },
  {
    accessorKey: "total_Profit",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Profit
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey:"total_Revenue",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Revenue
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "createdDate",
    cell: info => {
      const value = info.getValue();
      let date: Date;
      if (typeof value === "string" || typeof value === "number") {
        date = new Date(value);
      } else if (value instanceof Date) {
        date = value;
      } else {
        date = new Date(NaN);
      }
  
      return isNaN(date.getTime()) 
        ? 'Invalid Date'
        : format(date, "LLL dd, yyyy");
    },
  },
  
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.productId)}
            >
              Copy payment ID
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
