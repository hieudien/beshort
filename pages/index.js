import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useState } from 'react';
import { getShortUrl } from '../services/beshort'

const ClerkFeatures = () => (
  <Link href="/user">
    <a className={styles.cardContent}>
      <img src="/icons/layout.svg" />
      <div>
        <h3>Explore features provided by Clerk</h3>
        <p>
          Interact with the user button, user profile, and more to preview what
          your users will see
        </p>
      </div>
      <div className={styles.arrow}>
        <img src="/icons/arrow-right.svg" />
      </div>
    </a>
  </Link>
);

const InputArea = () => {
  const [longUrl, setLongUrl] = useState('https://bit.ly/3hwbp8G')
  const [shortedURL, setShortedUrl] = useState()
  const [error, setError] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await getShortUrl(longUrl)
    if (result.error) {
      setError(error)
      return
    }
    console.log(result);
  }
  return (
    <div className='pt-8'>
      <form className='flex' onSubmit={handleSubmit}>
        <input onChange={e => setLongUrl(e.target.value)} className='bg-gray-200 shadow-inner rounded-l p-2 flex-1' id='longUrl' type='text' aria-label='Long URL' placeholder='Enter long url' />
        <button className='bg-blue-500 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r' type='submit'>
          short it!
        </button>
      </form>
      { error && (
        <div className='mt-8 pt-5 pb-5 pl-5 pr-5 bg-red-200 rounded text-red-600 font-bold'>
        {error} 
      </div>
      )}
      { shortedURL && (
        <div className='mt-8 pt-8 pb-8 pl-5 pr-5 bg-blue-200 rounded'>
          Your shorted: 
          <a href={shortedURL} target='_blank' className='underline italic'> { shortedURL } </a>
        </div>
      )}
      
    </div>
  )
}

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
    <p className='text-center text-gray-500'>always short</p>
    <InputArea/>
    <div className={styles.cards}>
      <div className={styles.card}>
        <SignedIn>
          <ClerkFeatures />
        </SignedIn>
        <SignedOut>
          <SignupLink />
        </SignedOut>
      </div>
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
  <div className={styles.container}>
    <Head>
      <title>Create Next App</title>
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
