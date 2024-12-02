// import xlsx, { IJsonSheet } from 'json-as-xlsx';
// import { fetchProducts } from "@/api/products/index"
// export function downloadToExcel(){
//     const {data} =fetchProducts.useQuery();
//     const columns:IJsonSheet[]=[
//         {
//             sheet:"Products",
//             columns:[
//                 {label:"Product Id",value:'productId'},
//                 {label:"Product Name",value:'productName'},
//                 {label:"Stock",value:'stock'},
//                 {label:"Price",value:'price'}
//             ],
//             content:data??[]
//         }
//     ];
//     const setting={fileName:"Product Excel"};
//     xlsx(columns,setting);
// }
// import xlsx, { IJsonSheet } from 'json-as-xlsx';
// import type { ProductType } from "@/api/products/types";
// export function downloadToExcel(data: ProductType[]) {
//     const columns: IJsonSheet[] = [
//         {
//             sheet: "Products",
//             columns: [
//                 { label: "Product Id", value: 'productId' },
//                 { label: "Product Name", value: 'productName' },
//                 { label: "Stock", value: 'stock' },
//                 { label: "Price", value: 'price' }
//             ],
//             content: data ?? []  // Default to an empty array if data is undefined
//         }
//     ];

//     const setting = { fileName: "Product Excel" };

//     // Trigger the download
//     xlsx(columns, setting);
// }
