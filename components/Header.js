import styles from "../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

// Header component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Header = () => (
  <header className={styles.header}>
    <div className={styles.left}>
      <Link href="/">
        <a className={styles.logo}>
          <Image src="/logo.svg" width="32" height="32" alt="Logo" />
          <span className='text-blue-500 font-bold pl-2'>beshort</span>
        </a>
      </Link>
    </div>
    <div className={styles.right}>
      <SignedOut>
        <Link href="/sign-in">Sign in</Link>
        <Link href="/sign-up">Sign up</Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </header>
);

export default Header;
