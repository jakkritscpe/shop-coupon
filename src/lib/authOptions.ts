// src/lib/authOptions.ts

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        // console.log("USER FOUND:", user)
        if (user?.password && (await bcrypt.compare(credentials.password, user.password))) {
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          }
        } else {
          throw new Error('Invalid email or password')
        }
      },
    }),
  ],
  pages: {
    signIn: "/coupon159", // 👈 ใช้หน้า login ของคุณเอง
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      // console.log("JWT token:", token)
      return token
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session
    },
  },
}
