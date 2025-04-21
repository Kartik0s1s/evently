import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="wrapper flex flex-col items-center justify-between gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
            className="transition-opacity hover:opacity-80"
          />
        </Link>

        <nav className="flex gap-6 text-gray-600">
          <Link href="/about" className="hover:text-black transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-black transition">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-black transition">
            Privacy Policy
          </Link>
        </nav>

        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Evently. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
