"use client";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/api";
import { useParams } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

//import { useState } from "react";
const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  stock: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: "Stock must be a valid number" }),
  price: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: "Stock must be a valid number" }),
  cost: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: "Stock must be a valid number" }),
});

const UpdateProduct = () => {
  const { id } = useParams();

  const { data } = api.admin.productById.useQuery(id);
  
  // const [updateData] = useState({
  //       productName: data?.productName,
  //       stock: data?.stock,
  //       price: data?.price,
  //       cost: data?.cost
  // })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName:"",
      stock: 1,
      price: 0.0,
      cost: 0.0,
    },
  });

 
  useEffect(() => {
    console.log(data);
    if (data) {
      form.setValue("productName", data.productName || "");
      form.setValue("stock", data.stock);
      form.setValue("price", data.price);
      form.setValue("cost", data.cost);
    }
  }, [data,form]);
 
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // const payload = {
    //   productName: values.productName,
    //   stock: values.stock,
    //   price: values.price,
    //   cost: values.cost,
    // };
    return values;
   // console.log(values);
  }
  

 
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-15">
        <Card className="justify-center mx-auto items-center ">
          <CardHeader>
            <CardTitle className="justify-center mx-auto">
              {" "}
              Update Product
            </CardTitle>
            <CardDescription className="justify-center mx-auto font-bold">
              Pearl Center
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start items-start mx-5 w-full sm:w-96">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Name" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="mt-1 text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start items-start mx-5 w-full sm:w-96">
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Stock" {...field} />
                    </FormControl>
                    <FormMessage className="mt-1 text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start items-start mx-5 w-full sm:w-96">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.00"
                        placeholder="Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start items-start mx-5 w-full sm:w-96">
                    <FormLabel>Cost</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.00"
                        placeholder="Cost"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <div className="my-9 py-5 mx-5">
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UpdateProduct;
