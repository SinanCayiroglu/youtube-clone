import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connect from "@/utils/db"
import User from "@/utils/models/User"
import bcrypt from "bcryptjs"

export const options:NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID??"",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET??"",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Enter your username",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password",
                },
            },
            async authorize(credentials) {
                if (!credentials) {
                    console.error("Error: Credentials are undefined")
                    return null
                  }
                await connect()
                try {
                    const user = await User.findOne({ name: credentials.username })
                    if (user && bcrypt.compareSync(credentials.password, user.password)) {
                        return user
                    } else {
                        return null
                    }
                } catch (error) {
                    console.error("Error during authentication:", error)
                    return null
                }
            },
        }),
    ],
}


