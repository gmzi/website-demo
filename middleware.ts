import { authMiddleware, ClerkLoaded, redirectToSignIn, RedirectToUserProfile } from "@clerk/nextjs";
import { navItems } from "./lib/navItems";
import {redirect} from 'next/navigation';

const AUTHORIZED_USER_ID = process.env.AUTHORIZED_USER_ID;
const publicRoutesArray = Object.entries(navItems).map(([path, {name}])=> path)
 
export default authMiddleware({
  ignoredRoutes: publicRoutesArray,
  debug: false, 
  afterAuth(auth, req, evt){
    // if (auth.userId !== AUTHORIZED_USER_ID) {redirect somewhere} else {redirect to editor}
    // filter for unauthorized users goes here. Try to redirect them to sign in page
    // DOCS: https://clerk.com/docs/references/nextjs/auth-middleware#using-after-auth-for-fine-grained-control

    // https://clerk.com/docs/account-portal/custom-redirects?utm_source=www.google.com&utm_medium=referral&utm_campaign=none

    // if (auth.userId !== AUTHORIZED_USER_ID){
    //   console.log(req.url)
    //   console.log(auth.userId)
    //   return redirectToSignIn({returnBackUrl: req.url})
    // }

    if (!auth.userId){
      return redirectToSignIn({returnBackUrl: req.url})
    }
    
  }

});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};