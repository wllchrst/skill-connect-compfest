import { useUserContext } from "@/app/contexts/user-context";
import { useState } from "react";
import { IoLogOutOutline, IoLogOut } from "react-icons/io5";

function ProfileNavbar() {
  const { user } = useUserContext();
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="scroll-m-20 text-1xl font-semibold tracking-tight m-0">
            {user.name}
          </h3>
          <p className="text-sm text-muted-foreground m-0">{user.email}</p>
        </div>

        <div
          className=""
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {isHovering ? <IoLogOut size={24} /> : <IoLogOutOutline size={24} />}
        </div>
      </div>
    </div>
  );
}

export default ProfileNavbar;
