"use client";
import pageList from "@/app/data/page-list";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import skillConnectLogo from "../../../../public/SkillConnectLogo.png";
import { InputTransparent } from "@/components/ui/input-transparent";

function NavbarUpper() {
  const pathName = usePathname();
  const router = useRouter();

  function clickHandle(path: string) {
    router.push(path);
  }
  const activeClassname = "bg-white text-black";

  return (
    <div className={"flex flex-col gap-1"}>
      <div className={"flex justify-center items-center mt-2 mb-5"}>
        <Image
          src={skillConnectLogo}
          alt={"Skill Connect Logo"}
          className={"w-[80%]"}
        />
      </div>

      {/* <div className="flex mb-3 ">
        <InputTransparent placeholder="Search" />
      </div> */}

      {pageList.map((page, index) => (
        <div
          key={index}
          className={`flex transition-all delay-100 hover:transition-all items-center gap-5 p-3 hover:bg-[rgb(255,255,255,0.8)] hover:text-black rounded-md font-bold ${
            page.path == pathName ? activeClassname : ""
          }`}
          onClick={() => clickHandle(page.path)}
        >
          <div>{page.path == pathName ? page.iconActive : page.icon}</div>
          <div>
            <Link href={page.path} className={"text-base"}>
              {page.name}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NavbarUpper;
