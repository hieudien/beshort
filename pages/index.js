import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import InputArea from '../components/InputArea'
import UrlList from '../components/UrlList'

const SignupLink = () => (
  <Link href="/sign-up">
    <a className={styles.cardContent}>
      <img src="/icons/user-plus.svg" />
      <div>
        <h3>Sign up for an account</h3>
        <p>
          Sign up and sign in to manage your shorted URL
        </p>
      </div>
      <div className={styles.arrow}>
        <img src="/icons/arrow-right.svg" />
      </div>
    </a>
  </Link>
);

// Main component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Main = () => (
  <main className={styles.main}>
    <h1 className='text-blue-500 font-bold text-4xl text-center'>beshort</h1>
    <p className='text-center text-gray-500'>let short</p>
    <InputArea/>
    <div className={styles.cards}>
        <SignedIn>
          <UrlList/>
        </SignedIn>
        <SignedOut>
          <SignupLink />
        </SignedOut>
    </div>
  </main>
);

// Footer component
const Footer = () => (
  <footer className={styles.footer}>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{" "}
      <img src="/clerk.svg" alt="Clerk.dev" className={styles.logo} />
      +
      <img src="/nextjs.svg" alt="Next.js" className={styles.logo} />
    </a>
  </footer>
);

const Home = () => (
  <div className={styles.container + ' sm:flex'}>
    <Head className="justify-items-center">
      <title>beshort</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
    </Head>
    <Main />
    <Footer />
  </div>
);

export default Home;
