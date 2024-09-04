import Image from "next/image";
import Link from "next/link";
import profilePic from "/public/logos/logo-transparent-png.png";
const Logo = () => {
  return (
    <>
      <Link href={"/"}>
        <Image
          src={profilePic}
          alt="logo"
          width={150}
          height={150}
          className="
                    w-24
                  "
        />
      </Link>
    </>
  );
};

export default Logo;
