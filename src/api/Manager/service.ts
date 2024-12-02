import axi from "@/config/axios";
import type {ManagerType} from "./types";
const baseUrl="/Sale";
import { APIResponse } from "@/shared/types";
const managerView=async ():Promise<APIResponse<ManagerType[]>>=>{
    const res=await axi.get<APIResponse<ManagerType[]>>(`${baseUrl}/view/inventory/profitRevenue`)
    console.log(res.data)
    return res.data;
}
export default {managerView}