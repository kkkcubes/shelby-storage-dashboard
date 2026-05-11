import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    // Google Login
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID!,

      clientSecret:
        process.env
          .GOOGLE_CLIENT_SECRET!,
    }),

    // Wallet Login
    CredentialsProvider({
      name: "wallet",

      credentials: {
        wallet: {},
      },

      async authorize(
        credentials
      ) {
        if (
          credentials?.wallet
        ) {
          return {
            id:
              credentials.wallet,

            wallet:
              credentials.wallet,
          };
        }

        return null;
      },
    }),
  ],

  secret:
    process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({
      session,
      token,
    }) {
      if (session.user) {
        session.user.email =
          token.email as string;

        // Add wallet to session
        (
          session.user as any
        ).wallet =
          token.wallet;
      }

      return session;
    },

    async jwt({
      token,
      user,
    }) {
      if (user) {
        token.email =
          user.email;

        token.wallet =
          (user as any).wallet;
      }

      return token;
    },
  },
});

export {
  handler as GET,
  handler as POST,
};