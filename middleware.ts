import { authMiddleware } from "@clerk/nextjs";
import { navItems } from "./lib/navItems";

const publicRoutesArray = Object.entries(navItems).map(([path, {name}])=> path)
 
export default authMiddleware({
  ignoredRoutes: publicRoutesArray,
  debug: false
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};