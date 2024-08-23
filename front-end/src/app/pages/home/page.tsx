'use client';
import MainPageLayout from "@/app/layout/main-page-layout";
import UserService from "@/app/service/user-service";
import { Button } from "@/components/ui/button";

const user = new UserService();


function HomePage(){
    return <MainPageLayout>
        <Button >click me</Button>
    </MainPageLayout>
}

export default HomePage;