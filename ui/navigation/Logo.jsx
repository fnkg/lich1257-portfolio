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
            />
        </Link>
    );
}

export default Logo;