import { authMiddleware, WithClerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextFetchEvent } from "next/server";

export default function combinedMiddleware(req: NextRequest, evt: NextFetchEvent) {
  return authMiddleware({
    publicRoutes: [
      '/',
      '/events/:id',
      '/api/webhook/clerk',
      '/api/webhook/stripe',
      '/api/uploadthing'
    ],
    ignoredRoutes: [
      '/api/webhook/clerk',
      '/api/webhook/stripe',
      '/api/uploadthing'
    ]
  })(req, evt);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ],
};
