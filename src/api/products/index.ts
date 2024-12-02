import productServices from "./services"
import { APIResponse } from "@/shared/types"
import type { ProductType } from "./types"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"

export const fetchProducts = {
	useQuery: (opt?: UseQueryOptions<ProductType[], Error>) =>
		useQuery<ProductType[], Error>({
			queryKey: ["getProducts"],
			queryFn: async () => {
				const response: APIResponse<ProductType[]> =
					await productServices.getProducts()

				return response.data
			},
			...opt,
		}),
}

// export const fetchProductById={
// 	useQuery:(id:string,opt?:Partial<UseQueryOptions<ProductType[],Error>>)=>
// 		useQuery<ProductType,Error>({
// 			queryKey:	['fetchProductById',id],
// 			queryFn:	async()=>{
// 				if (!id) {
//                     throw new Error('ID is required')
//                 }
//                 const response: APIResponse<ProductType[]> =
//                     await productServices.getProductById(id)

//                 return response.data
// 			},
// 			...opt
// 		})
// }

export const fetchProductById = {
	useQuery: (id: string, opt?: Partial<UseQueryOptions<ProductType[], Error>>) =>
	  useQuery<ProductType[], Error>( 
		{
		  queryKey: ['fetchProductById', id], 
		  queryFn: async () => {
			if (!id) {
			  throw new Error('ID is required');
			}
			const response: APIResponse<ProductType[]> = await productServices.getProductById(id);
			console.log(response.data);
			return response.data; 
			
		  },
		  ...opt,
		}
	  ),
  };
  
