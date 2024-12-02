import { APIResponse } from '@/shared/types';
import type {AddProductType} from './types'
import axi from "@/config/axios";
const baseUrl='/Product';
const addNewProduct=async (payload:AddProductType)=>{
    const res=await axi.post(`${baseUrl}/AddNewProduct`,payload);
    return res.data;
}

const getProductById =async(id:string):Promise<APIResponse<AddProductType>>=>{
    const res=await axi.get<APIResponse<AddProductType>>(`/Sale/getProduct/byId?id=${id}`);
    return res.data;
}
export default {addNewProduct,getProductById}