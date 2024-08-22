import {IChildren} from "@/app/interfaces/children-interface";
import Navbar from "@/app/components/navbar/navbar";

function MainPageLayout({children}: IChildren) {
    return <div className={'h-screen flex justify-between gap-3 p-5'}>
        <div className={'w-[15%] rounded-md p-2 bg-[#212121]'}>
            <Navbar/>
        </div>
        <div className={' w-[85%] rounded-md p-2 bg-[#212121]'}>
            {children}
        </div>
    </div>
}

export default MainPageLayout