import NavbarUpper from "@/app/components/navbar/navbar-upper";
import ProfileNavbar from "@/app/components/navbar/profile-navbar";
import NavbarBottom from "@/app/components/navbar/navbar-bottom";

function Navbar() {
  return (
    <div className={"p-3 flex flex-col justify-between h-full"}>
      <div>
        <NavbarUpper />
        <NavbarBottom />
      </div>
      <ProfileNavbar />
    </div>
  );
}

export default Navbar;
