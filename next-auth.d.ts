import NextAuth from 'next-auth';
import NextAuthJwt from "next-auth/jwt";
declare module "next-auth"{
    interface Session{
        userId:string;
    }

}
declare module "next-auth/jwt"{
    interface JWT{
        userId:string;
    }
}