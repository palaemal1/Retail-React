import { columns } from "./Columns"
import { DataTable } from "./data-table"
import { fetchManager } from '@/api/Manager';


export default  function DemoPage() {
    const {data} =fetchManager.useQuery();
  

  return (
    <div className=" container flex justify-center items-center w-full py-10 mt-10">
          <div className="w-full max-w-6xl">
            
            <DataTable columns={columns} data={data || []} />
          </div>
    </div>
  )
}
