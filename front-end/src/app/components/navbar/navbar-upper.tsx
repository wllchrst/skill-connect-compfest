import pageList from "@/app/data/page-list";
import Link from "next/link";

function NavbarUpper() {
    return <div className={'flex flex-col gap-2'}>
        {pageList.map((page, index) => (
            <div key={index} className={'flex items-center gap-3'}>
                <div>
                    {page.icon}
                </div>
                <div>
                    <Link href={page.path} className={'text-lg'}>
                        {page.name}
                    </Link>
                </div>
            </div>
        ))}
    </div>
}

export default NavbarUpper