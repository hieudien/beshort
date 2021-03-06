import '../styles/globals.css'

import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'
import UrlHandler from "../services/urlHanlder"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * List pages you want to be publicly accessible, or leave empty if
 * every page requires authentication. Use this naming strategy:
 *  "/"              for pages/index.js
 *  "/foo"           for pages/foo/index.js
 *  "/foo/bar"       for pages/foo/bar.js
 *  "/foo/[...bar]"  for pages/foo/[...bar].js
 */
const publicPages = ["/", "/sign-in/[[...index]]", "/sign-up/[[...index]]"]

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()
  /**
   * If the current route is listed as public, render it directly.
   * Otherwise, use Clerk to require authentication.
   */
  return (
    <UrlHandler.Provider initialState={[]}>
      <ClerkProvider
        frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
        navigate={(to) => router.push(to)}
      >
        <Layout>
          <ToastContainer/>
          {publicPages.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <>
              <SignedIn>
                <Component {...pageProps} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          )}
        </Layout>
      </ClerkProvider>
    </UrlHandler.Provider>
  )
}

export default MyApp;
