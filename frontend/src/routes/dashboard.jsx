// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Folder from "@material-ui/icons/Folder";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
// core components/views
import Account from "views/Account/Account.jsx";
import Products from "views/Projects/Products.jsx";
import Product from "views/Projects/Product.jsx";
import UpdateUser  from "views/Users/UpdateUser.jsx"
import CreateUser  from "views/Users/CreateUser.jsx"
import Login from "views/Login/Login.jsx";
import Users from "views/Users/Users.jsx";
import User from "views/Users/User.jsx";
import Maps from "views/Maps/Maps.jsx";
import CreateProduct from "../views/Projects/CreateProduct.jsx";
import UpdateProduct from "../views/Projects/UpdateProduct.jsx";


const dashboardRoutes = [
  {
    path: "/account",
    sidebarName: "My Account",
    navbarName: "My Account",
    icon: Person,
    component: Account,
    invisible: true
  },
  {
    path: "/login",
    sidebarName: "Login Page",
    navbarName: "Login or Sign Up",
    icon: Person,
    component: Login,
    
  },
  {
    path: "/products/:id",
    icon: "Products",
    navbarName: "Product",
    component: Product,
    invisible: true
  },
  {
    path: "/createproduct",
    navbarName: "Create Product",
    component: CreateProduct,
    invisible: true
  },
  {
    path: "/updateproduct/:id",
    navbarName: "Update User",
    component: UpdateProduct,
    invisible: true
  },
  {
    path: "/products",
    sidebarName: "Products",
    navbarName: "Products",
    icon: Folder,
    component: Products
  },
  {
    path: "/updateuser/:id",
    navbarName: "Update User",
    component: UpdateUser,
    invisible: true
  },
  {
    path: "/createuser",
    navbarName: "Create User",
    component: CreateUser,
    invisible: true
  },
  {
    path: "/users/:name",
    icon: "content_paste",
    component: User,
    invisible: true
  },
  {
    path: "/users",
    sidebarName: "Users",
    navbarName: "Users",
    icon: BubbleChart,
    component: Users
  },
  {
    path: "/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    icon: LocationOn,
    component: Maps
  },
  { redirect: true, path: "/", to: "/login", navbarName: "Redirect" }
];

export default dashboardRoutes;
