import { useMutation, useQuery, UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query'
import productService from './service';
import type { AddProductType } from './types';
import { APIResponse } from '@/shared/types';

export const addProductMutation={
    useMutation:(opt?:UseMutationOptions<unknown,Error,AddProductType,unknown>)=>
        useMutation({
            mutationKey:['addProduct'],
            mutationFn:(payload:AddProductType)=>productService.addNewProduct(payload),
            ...opt
        })
}

export const productById={
    useQuery:(id:string,opt?:Partial<UseQueryOptions<AddProductType,Error>>)=>
        useQuery<AddProductType,Error>({
            queryKey:['productById'],
            queryFn:async()=>{
                if(!id){
                    throw new Error('ID is not found!');
                }
                const response:APIResponse<AddProductType>=
                await productService.getProductById(id)
                return response.data;
            },
            ...opt
        })
}