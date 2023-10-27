import { createBrowserRouter } from "react-router-dom";
import Root from "../components/root/Root";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
import SignIn from "../pages/signIn/SignIn";
import Register from "../pages/register/Register";
import PrivetRoutes from "./PrivetRoutes";
import MyCart from "../pages/myCart/MyCart";
import AddProduct from "../pages/addProduct/AddProduct";
import AllCarsUnderBrand from "../pages/allCarsUnderBrand/AllCarsUnderBrand";
import CarDetails from "../pages/carDetails/CarDetails";
import UpdateCarInfo from "../pages/updateCarInfo/UpdateCarInfo";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: '/',
          element: <Home></Home>,
        },
        {
          path: '/allCarsUnderBrand/:brandName',
          element: <AllCarsUnderBrand></AllCarsUnderBrand>,
        },
        {
          path: '/details/:_id',
          element: <PrivetRoutes><CarDetails></CarDetails></PrivetRoutes>,
          loader: () => fetch("https://automotive-server-fr7lqmtf0-tomal-s-projects.vercel.app/products")
        },
        {
          path: '/updateCarInfo/:_id',
          element: <PrivetRoutes><UpdateCarInfo></UpdateCarInfo></PrivetRoutes>,
          loader: ({params}) => fetch(`https://automotive-server-fr7lqmtf0-tomal-s-projects.vercel.app/products/updateCarInfo/${params._id}`)
        },
        {
          path: '/addProduct',
          element: <PrivetRoutes><AddProduct></AddProduct></PrivetRoutes>,
        },
        {
          path: '/myCart',
          element: <PrivetRoutes><MyCart></MyCart></PrivetRoutes>,
          loader: () => fetch('https://automotive-server-fr7lqmtf0-tomal-s-projects.vercel.app/carts')
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/signIn',
          element: <SignIn></SignIn>
        }
      ]
    },
  ]);

  export default router;