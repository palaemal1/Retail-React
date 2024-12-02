"use client"
import {Link} from "react-router-dom"
import { ColumnDef } from "@tanstack/react-table"
import type { ProductType } from "@/api/products/types"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<ProductType>[] = [
  {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
  }, 
  {
        accessorKey:"productId",
        header:"ProductId"
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    id:"button",
    cell:({row})=>{
      const product = row.original
      return (
        <Link to={`/updateProduct/${product.productId}`}><Button variant="ghost" className="bg-green-500">Update</Button></Link>
      )
    }
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
            <DropdownMenuLabel >Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.productId)}
            >
              Copy product ID
            </DropdownMenuItem> 
             <DropdownMenuSeparator />
            
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  
  
]
