import { useParams,useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  addToCart,
  removeFromCart,
  clearCart,
  submitOrder,
} from "@/store/features/itemSlice";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { fetchProductById } from "@/api/products/index";
const ItemCard = () => {
  const navigate=useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.item.cart);

  const Decrease = () => {
    if (counter > 0) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  };

  const Increase = () => {
    setCounter((preCounter) => preCounter + 1);
  };

  const { id } = useParams();
  if (!id) {
    return <div>Product ID is missing.</div>;
  }
  const { data } = fetchProductById.useQuery(id);
  const product = data?.[0];

  
  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          pId: product.productId,
          productName: product.productName,
          price: product.price,
          stock: product.stock,
          counter,
        })
      );
    }
  };

  const handleRemoveCart = (pId: string) => {
    dispatch(removeFromCart(pId));
  };

  const clearAll = () => {
    dispatch(clearCart());
  };

  const handlePurchase = () => {
    dispatch(submitOrder());
    setIsDialogOpen(true);  
    setTimeout(() => {
      setIsDialogOpen(false); 
      navigate("/productList"); 
    }, 2000);
    clearAll();
  };

  const goBack=()=>{
    navigate("/productList");
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex gap-52 ">
        <div className="w-full ms-40   mt-10">
          <Card className="w-full mt-6">
            <CardHeader>
              <CardTitle>{product?.productName}</CardTitle>
              <CardDescription>
                {product?.price || "Product not found"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvNUgQZ_FcR-G_q6tN40_r-cTQKkKtElNyaQ&s"
                alt="Image description"
                className=" h-48 rounded-lg"
              />
              <p className="mt-4">
                This is some text below the image within the card content.
              </p>
              <div className="text-center">
                <Button
                  className="rounded-full p-4 bg-lime-500 text-white"
                  onClick={() => Decrease()}>
                  -
                </Button>
                <span className="mx-5">{counter}</span>
                <Button
                  className="rounded-full p-4 bg-lime-500 text-white"
                  onClick={() => Increase()}>
                  +
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-1/2 mx-3">
                <Button
                  className="w-full bg-lime-500 text-white me-4"
                  variant="outline"
                  onClick={handleAddToCart} disabled={counter===0}>
                  Add to Cart
                </Button>
              </div>
              <div className="w-1/2 mx-3">
                <Button
                  className="w-full bg-red-500 text-white" onClick={()=>goBack()}
                  variant="outline">
                  Back
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full mt-10">
          <Card className="ps-5 w-auto mt-6">
            <CardHeader>
              <CardTitle>Your Purchase Cart</CardTitle>
              <CardDescription className="italic text-lg font-medium">
                Welcome from Pearl Center
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption className="caption-top">
                  A list of your recent invoices.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]"> ID </TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className=""> Total </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.productID}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>${item.sellingPrice}</TableCell>
                      <TableCell>${item.sellingPrice * item.count}</TableCell>
                      <TableCell>
                        <Button
                          className="bg-red-500"
                          onClick={() => handleRemoveCart(item.productID)}>
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={3}>Total Price</TableCell>

                    <TableCell>
                      $
                      {cart.reduce(
                        (total, item) => total + item.sellingPrice * item.count,
                        0
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="w-1/2 mx-3">
                <AlertDialog open={isDialogOpen}>
                  <AlertDialogTrigger as-child>
                    <Button
                      className="w-full bg-lime-500 text-white me-4"
                      variant="outline"
                      onClick={handlePurchase}>
                      Purchase
                    </Button>
                    <AlertDialogContent className="fixed top-10  right-10 m-4 p-6 bg-white rounded-lg shadow-lg z-50">
                      <p className="text-center">
                        Thank you for your purchase!
                      </p>
                    </AlertDialogContent>
                  </AlertDialogTrigger>
                </AlertDialog>
              </div>
              <div className="w-1/2 mx-3">
                <Button
                  className="w-full bg-blue-500 text-white" onClick={()=>goBack()}
                  variant="outline">
                  Back
                </Button>
              </div>
              <div className="w-1/2 mx-3">
                <Button
                  className="w-full bg-red-500 text-white"
                  variant="outline"
                  onClick={clearAll}>
                  Cancel All
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
