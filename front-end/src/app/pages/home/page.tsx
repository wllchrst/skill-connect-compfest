"use client";
import { useUserContext } from "@/app/contexts/user-context";
import MainPageLayout from "@/app/layout/main-page-layout";
import UserService from "@/app/service/user-service";
import { Button } from "@/components/ui/button";

function HomePage() {
  const { user } = useUserContext();
  return (
    <MainPageLayout>
      <Button>click me</Button>
    </MainPageLayout>
  );
}

export default HomePage;
