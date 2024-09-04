import ToastBuilder from "@/app/builder/toast-builder";
import { useUserContext } from "@/app/contexts/user-context";
import { login_path } from "@/app/data/page-paths";
import { getFirstTwoInitials } from "@/app/helpers/helper";
import UserService from "@/app/service/user-service";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoLogOutOutline, IoLogOut } from "react-icons/io5";

const userService = UserService.getInstance();

function ProfileNavbar() {
  const { user } = useUserContext();
  const [isHovering, setIsHovering] = useState(false);
  const [divHovering, setDivHovering] = useState(false);
  const toast = new ToastBuilder("Log Out");
  const router = useRouter();

  function logOutHandle() {
    const result = userService.logOut();
    if (result == true) {
      toast.normal("Logged out");
      router.push(login_path);
    } else toast.destructive("Something went wrong");
  }

  return (
    <div
      className="flex justify-between items-center"
      onMouseEnter={() => setDivHovering(true)}
      onMouseLeave={() => setDivHovering(false)}
    >
      <div className="flex items-center gap-4">
        <Avatar className="flex-shrink-0">
          <AvatarImage src={user.profilePictureLink} alt={user.name} />
          <AvatarFallback>{getFirstTwoInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h3
            className={"scroll-m-20 text-1xl font-semibold tracking-tight m-0 "}
          >
            {user.name}
          </h3>
          <p className="text-sm text-muted-foreground m-0">{user.email}</p>
        </div>
      </div>

      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => logOutHandle()}
      >
        {isHovering ? <IoLogOut size={24} /> : <IoLogOutOutline size={24} />}
      </div>
    </div>
  );
}

export default ProfileNavbar;
