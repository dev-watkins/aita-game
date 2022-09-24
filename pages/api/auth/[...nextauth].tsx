import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  adapter: PrismaAdapter(prisma),
}


export default NextAuth(authOptions)