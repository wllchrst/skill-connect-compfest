"use client";
import Image from "next/image";
import loginPage from "../../assets/login-page.png";

import FullScreenCenterLayout from "../../layout/full-screen-center-layout";

export default function LoginPage() {
  return (
    <FullScreenCenterLayout>
      <div className="flex p-2 gap-2 h-full w-full">
        <div className="border border-pink w-2/3">
          <Image src={loginPage} alt="" />
        </div>
        <div className="border border-pink w-1/3"></div>
      </div>
    </FullScreenCenterLayout>
  );
}
