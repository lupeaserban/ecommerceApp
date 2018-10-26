// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Folder from "@material-ui/icons/Folder";

// import ContentPaste from "@material-ui/icons/ContentPaste";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
// core components/views
import Home from "views/Home/Home.jsx";
import Projects from "views/Projects/Projects.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Clients from "views/Clients/Clients.jsx";
import Organizer from "views/Organizer/Organizer.jsx";
import Maps from "views/Maps/Maps.jsx";

const dashboardRoutes = [
  {
    path: "/home",
    sidebarName: "Home",
    navbarName: "Home",
    icon: Dashboard,
    component: Home
  },
  {
    path: "/projects",
    sidebarName: "Projects",
    navbarName: "Projects",
    icon: Folder,
    component: Projects
  },
  {
    path: "/user",
    sidebarName: "Users",
    navbarName: "Users",
    icon: Person,
    component: UserProfile
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
    path: "/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    icon: LocationOn,
    component: Maps
  },
  { redirect: true, path: "/", to: "/", navbarName: "Redirect" }
];

export default dashboardRoutes;
