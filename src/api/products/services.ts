import axi from "@/config/axios";
import type {ProductType} from "./types"
import { APIResponse } from "@/shared/types";
const baseUrl="/Product";
const getProducts=async ():Promise<APIResponse<ProductType[]>>=>{
    const res=await axi.get<APIResponse<ProductType[]>>(`${baseUrl}/GetAllProduct`)
    console.log(res.data)
    return res.data;
}

const getProductById=async(id:string):Promise<APIResponse<ProductType[]>>=>{
    const res=await axi.get<APIResponse<ProductType[]>>(`Sale/getProduct/byId?id=${id}`);
    return res.data;
}


export default {getProducts,getProductById}