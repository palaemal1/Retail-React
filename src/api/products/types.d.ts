export type ProductType={
    productId:string,
    productName:string,
    stock:number,
    price:number,
    profit:number,
    loss:number,
    cost:number,
    activeFlag:boolean,
    created_at:string
}
export interface ProductSliceType {
    productID: string;
    productName: string;
    stock: number;
    sellingPrice: number;
  }
  
  export interface CartType extends ProductSliceType {
    count: number;
  }