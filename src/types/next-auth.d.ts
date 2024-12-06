// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       name: string;
//       image: string;
//       isVerified: boolean;
//     };
//   }
// }

import { DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        isVerified?: boolean;
    }
    interface Session {
        user: {
          id: string;
          name: string;
          email: string;
          emailVerified?: boolean | null; // Optional or nullable
        };
      }
    
      interface JWT {
        id: string;
        name: string;
        email: string;
      }
}
