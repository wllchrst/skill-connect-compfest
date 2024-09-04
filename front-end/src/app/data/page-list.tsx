import { IPage } from "@/app/interfaces/page-interface";
import { IoHomeOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import {
  IoPeopleOutline,
  IoBookOutline,
  IoBookSharp,
  IoPersonOutline,
  IoPersonSharp,
} from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";

const pageList: IPage[] = [
  {
    name: "Home",
    icon: <IoHomeOutline size={20} />,
    iconActive: <IoHomeSharp size={20} />,
    path: "/pages/home",
  },
  {
    name: "Community",
    icon: <IoPeopleOutline size={20} />,
    iconActive: <IoPeopleSharp size={20} />,
    path: "/pages/community",
  },
  {
    name: "Course",
    icon: <IoBookOutline size={20} />,
    iconActive: <IoBookSharp size={20} />,
    path: "/pages/course",
  },
  {
    name: "Profile",
    icon: <IoPersonOutline size={20} />,
    iconActive: <IoPersonSharp size={20} />,
    path: "/pages/profile",
  },
];

export default pageList;
