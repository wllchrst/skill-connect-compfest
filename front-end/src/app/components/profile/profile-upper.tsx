"use client";
import { IUser } from "@/app/interfaces/user-interface";
import Image from "next/image";

interface I {
  user: IUser;
}

function ProfileUpper({ user }: I) {
  return (
    <div className="flex">
      <div className="w-52 h-52 object-cover rounded-md overflow-hidden flex items-center justify-center">
        <Image src={user.profilePictureLink} alt="" width={200} height={200} />
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex flex-col">
          <h2 className="mt-10 scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
            {user.name}
          </h2>
          <small className="text-sm font-medium leading-none text-gray-400">
            {user.email}
          </small>
        </div>

        <blockquote className="border-l-2 pl-3 italic text-sm">
          {user.description == "" ? "Description" : user.description}
        </blockquote>
      </div>
    </div>
  );
}

export default ProfileUpper;
