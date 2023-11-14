import { authMiddleware } from "@clerk/nextjs";
import { navItems } from "./lib/navItems";

const publicRoutesArray = Object.entries(navItems).map(([path, {name}])=> path)
publicRoutesArray.push('/(personal)/(.*)');
publicRoutesArray.push('/shows(.*)');
publicRoutesArray.push('/server(.*)');
publicRoutesArray.push('/api(.*)');
// remove path below to enable auth:
publicRoutesArray.push('/editor(.*)');
 
export default authMiddleware({
  ignoredRoutes: publicRoutesArray,
  debug: false, 
});
 
export const config = {
  matcher: ['/editor(.*)'],
};