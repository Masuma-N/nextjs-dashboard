import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  providers: [], // 
} satisfies NextAuthConfig; 


