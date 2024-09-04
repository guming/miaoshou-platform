import { clerkMiddleware } from "@clerk/nextjs/server";

// import { updateSession } from '@/utils/supabase/middleware'

// export async function middleware(request: NextRequest) {
//   // update user's auth session
//   return await updateSession(request)
// }

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
