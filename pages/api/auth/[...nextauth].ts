  import NextAuth, { NextAuthOptions } from "next-auth";
  import NaverProvider from "next-auth/providers/naver";
 
   export const authOptions: NextAuthOptions = {
     providers: [
       NaverProvider({
         clientId: process.env.NAVER_CLIENT_ID || "",
         clientSecret: process.env.NAVER_CLIENT_SECRET || "",
       }), 
     ],
   	  pages: {
	    signIn: '/auth/signin',
	    signOut: '/auth/signout',
	    error: '/auth/error', // Error code passed in query string as ?error=
	    verifyRequest: '/auth/verify-request', // (used for check email message)
	    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
	  },
   };

   const handler = NextAuth(authOptions);

   export { handler as GET, handler as POST };