// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Folder from "@material-ui/icons/Folder";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notification from "@material-ui/icons/NotificationImportant";
// core components/views
import Account from "views/Account/Account.jsx";
import Projects from "views/Projects/Projects.jsx";
import Login from "views/Login/Login.jsx";
import Clients from "views/Clients/Clients.jsx";
import Organizer from "views/Organizer/Organizer.jsx";
import Maps from "views/Maps/Maps.jsx";
import Notifications from "views/Notifications/Notifications";

const dashboardRoutes = [
  {
    path: "/account",
    sidebarName: "My Account",
    navbarName: "My Account",
    icon: Person,
    component: Account
  },
  {
    path: "/projects",
    sidebarName: "Projects",
    navbarName: "Projects",
    icon: Folder,
    component: Projects
  },
  {
    path: "/login",
    sidebarName: "Login Page",
    navbarName: "Login or Sign Up",
    icon: Person,
    component: Login,
    invisible: true
  },
  {
    path: "/clients",
    sidebarName: "Clients",
    navbarName: "Clients",
    icon: BubbleChart,
    component: Clients
  },
  {
    path: "/organizer",
    sidebarName: "Organizer",
    navbarName: "Organizer",
    icon: "content_paste",
    component: Organizer
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    icon: Notification,
    component: Notifications
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
