import Image from "next/image"
import Link from "next/link"

const Logo = () => {
    return (
        <Link href="/">
            <Image
                src="/assets/logo.svg"
                width={90}
                height={90}
                alt="Logo picture"
                style={{ width: 'auto', height: 'auto' }}
                // className="w-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto"
            />
        </Link>
    );
}

export default Logo;