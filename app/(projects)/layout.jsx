import Logo from '@/ui/navigation/Logo';
import { MainNavigation } from '@/ui/navigation/MainNavigation';

const Layout = ({ children, pageHeading }) => {
    return (
        <>
            <header className="absolute top-0 right-0 w-full z-10">
                <MainNavigation />
            </header>
            {children}
            <footer className="fixed flex flex-row bottom-3 left-0 right-0 text-[40px] uppercase z-10 justify-between px-10">
                <div className="flex flex-row items-center grow">
                    <span className="pr-1.5">/</span>
                    <h1>{pageHeading}</h1>
                </div>
                <div className="self-end">
                    <Logo />
                </div>
            </footer>
        </>
    );
}

export default Layout;