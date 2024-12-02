import {columns} from './Columns'
import { DataTable } from "./data-table"
import { fetchProducts } from "@/api/products/index"
export default  function DemoPage() {

  const {data} =fetchProducts.useQuery();
   
  return (
    
    <div className=" container flex justify-center items-center w-full py-6">
          <div className="w-full max-w-6xl">
            
            <DataTable columns={columns} data={data || []} />
          </div>
    </div>
  )
}
