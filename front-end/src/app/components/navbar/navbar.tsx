import pageList from "@/app/data/page-list";
import Link from "next/link";
import NavbarUpper from "@/app/components/navbar/navbar-upper";
import ProfileNavbar from "@/app/components/navbar/profile-navbar";
import NavbarBottom from "@/app/components/navbar/navbar-bottom";

function Navbar() {
    return <div className={'p-3'}>
        <NavbarUpper/>
        <NavbarBottom/>
        <ProfileNavbar/>
    </div>
}

export default Navbar