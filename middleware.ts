import { authMiddleware, ClerkLoaded, redirectToSignIn, RedirectToUserProfile } from "@clerk/nextjs";
import { navItems } from "./lib/navItems";
import {redirect} from 'next/navigation';

const AUTHORIZED_USER_ID = process.env.AUTHORIZED_USER_ID;
const publicRoutesArray = Object.entries(navItems).map(([path, {name}])=> path)
publicRoutesArray.push('/shows(.*)');
 
export default authMiddleware({
  ignoredRoutes: publicRoutesArray,
  debug: false, 
  afterAuth(auth, req, evt){
    if (!auth.userId){
      return redirectToSignIn({returnBackUrl: req.url})
    }
  }
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};