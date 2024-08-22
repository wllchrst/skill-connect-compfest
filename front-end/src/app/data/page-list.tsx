import {IPage} from "@/app/interfaces/page-interface";
import {FaHome} from "react-icons/fa";
import {FaPeopleGroup} from "react-icons/fa6";

const pageList: IPage[] = [
    {name: "Home", icon: <FaHome size={20}/>, path: "/pages/home"},
    {name: "Community", icon: <FaPeopleGroup size={20}/>, path: "/pages/community"},
]

export default pageList;