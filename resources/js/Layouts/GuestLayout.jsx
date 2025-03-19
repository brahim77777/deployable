import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Logo from "../../../public/Logo.svg"

export default function Guest({ children }) {
    return (
        <div className="min-h-screen  flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <h1 className=' text-center text-4xl font-extrabold mb-4 font-serif -translate-y-20'>BAZGUI</h1>
                    {/* <img src={Logo} className=" size-32 fill-current -translate-y-20 text-gray-500" /> */}
                </Link>
            </div>

            <div className="w-full sm:max-w-md px-6 py-4 -translate-y-20 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
