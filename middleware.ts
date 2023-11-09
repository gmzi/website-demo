import { authMiddleware, ClerkLoaded, redirectToSignIn, RedirectToUserProfile } from "@clerk/nextjs";
import { navItems } from "./lib/navItems";
import {redirect} from 'next/navigation';

const AUTHORIZED_USER_ID = process.env.AUTHORIZED_USER_ID;
const publicRoutesArray = Object.entries(navItems).map(([path, {name}])=> path)
publicRoutesArray.push('/(personal)/(.*)');
publicRoutesArray.push('/shows(.*)');
publicRoutesArray.push('/server(.*)');
publicRoutesArray.push('/api(.*)');
 
export default authMiddleware({
  ignoredRoutes: publicRoutesArray,
  debug: false, 
});
 
export const config = {
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: ['/editor(.*)'],
};