import {
  Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import NotFoundView from "@/modules/notFound/NotFoundView";
import SaleReport from "@/modules/SaleReport/page"
import MainLayout from "@/layouts/MainLayout";
import Page from "@/modules/products/page";
import ItemCard from "@/modules/products/ItemCard";
import AuthLayout from "@/layouts/AuthLayout";
import LoginView from "@/modules/auth/login/LoginView";
import AdminView from "@/modules/admin/page";
import AddNewProduct from "@/modules/admin/products/AddNewProduct";
import UpdateProduct from "@/modules/admin/products/UpdateProduct"
const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
          {
            path:'',
            element:<Page/>
          },
          {
            path:'/productList',
            element:<Page/>
          },
          {
            path:'sale/report',
            element:<SaleReport/>
          },
          {
            path:'/item/:id',
            element:<ItemCard/>
          },
          {
            path:'/manager/view',
            element:<AdminView/>
          },
          {
            path:'/addNewProduct',
            element:<AddNewProduct/>
          },
          {
            path:'/updateProduct/:id',
            element:<UpdateProduct/>
          }

          
        ]
    },
    {
      path:'/auth',
      element:<AuthLayout/>,
      children:[
        {
          path:"",
          element:<Navigate to="login" replace/>
        },
        {
          path:"login",
          element:<LoginView/>
        }
      ]
    },
    {
      path:'*',
      element:<NotFoundView/>
    },
   

])

const Wrapper = () => {
  const queryClient = new QueryClient();
  return (
    <>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}></RouterProvider>

          </QueryClientProvider>
        </Provider>
    </>
  )
}

export default Wrapper