import NextAuth, { NextAuthOptions } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials";
import { TypeORMAdapter } from "@auth/typeorm-adapter";
import EmailProvider from "next-auth/providers/email";
import AppleProvider from "next-auth/providers/apple";
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as any;

        return {
            userId: 1,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 5,
  },
  callbacks: {
    async session({ session, user, token }) {
      //@ts-ignore
      session.userId=token?.userId;
      // console.log("sessionnnnnnnnnn", { session, user, token });
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // console.log("jwttttttttttttttt", {
      //   token,
      //   user,
      //   account,
      //   profile,
      // });
      if(user){
        token.userId = user?.userId;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
