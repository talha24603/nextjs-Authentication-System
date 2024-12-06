import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import CredendentialProvider from 'next-auth/providers/credentials'
import { User } from "./model/user"
import bcrypt, { compare } from 'bcryptjs'
import { connectDb } from "./lib/utils"
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }), CredendentialProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",

                },
            },
            authorize: async (credentials) => {
                const email = credentials.email as string | undefined
                const password = credentials.password as string | undefined
                if (!email || !password)
                    throw new CredentialsSignin("please provide both email and password")
                await connectDb()
                const user = await User.findOne({ email }).select("+password")
                if (!user) throw new CredentialsSignin("Invalid email or password")
                if (!user.password) throw new CredentialsSignin("Invalid email or password")

                const isMatch = await compare(password, user.password)
                console.log("User found:", user);
                console.log("Password match:", isMatch);

                if (!isMatch)
                    throw new CredentialsSignin("password does not match")


                return { name: user.name, email: user.email, id: user._id.toString(), isVerified: user.isVerified };
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt',
      },
    pages: {
        signIn: "/login"
    },
    debug: true,
    callbacks: {
        signIn: async ({ user, account }) => {
            if (account?.provider === "google") {
                try {
                    const { name, email, id } = user;
                    console.log("user: ", user);
                    await connectDb()
                    const alreadyUser = await User.findOne({ email });
                    if (!alreadyUser) {
                        const newUser = await User.create({ name, email, googleId: id, isVerified: true })
                        console.log("newUser", newUser);

                    }
                    console.log("alreadyUser", alreadyUser);

                    return true

                } catch (error) {
                    throw new AuthError("Error while creating user")

                }

            }
            
            if(account?.provider === "credentials"){
                console.log("user signed with credentials: ", user);
                return true
            }
    
            return false;
        },
        async jwt({ user, token }) {
            console.log("JWT callback:", { token, user });

            if (user) {
                token.id = user.id,
                    token.name = user.name,
                    token.email = user.email
            }
            return token;
        },
        async session({ session, token }) {
            console.log("Session callback:", { session, token });

            if (token) {
                session.user = {
                    id: token.id as string,
                    name: token.name as string,
                    email: token.email as string,
                    emailVerified: null
                }
            }
            return session
        }
    }
})