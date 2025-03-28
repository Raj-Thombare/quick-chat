import axios, { AxiosError } from "axios";
import NextAuth, { Account, AuthOptions, ISODateString } from "next-auth"
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google"
import { LOGIN_URL } from "@/lib/apiEndPoints";
import { redirect } from "next/navigation";
import GitHubProvider from "next-auth/providers/github";


export interface CustomSession {
    user?: CustomUser;
    expires: ISODateString;
}

export interface CustomUser {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    provider?: string | null;
    token?: string | null;
}

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/"
    },
    callbacks: {
        async signIn({ user, account }: { user: CustomUser, account: Account | null }) {
            try {
                const payload = {
                    email: user.email,
                    name: user.name,
                    image: user?.image,
                    oauth_id: account?.providerAccountId,
                    provider: account?.provider
                }

                const { data } = await axios.post(LOGIN_URL, payload);
                user.id = data?.user?.id?.toString();
                user.token = data?.user?.token;

                return true;

            } catch (error) {
                if (error instanceof AxiosError) {
                    return redirect(`/auth/error?message=${error.message}`);
                }
                return redirect(
                    `/auth/error?message=Something went wrong.please try again!`
                );
            }
        },

        async session({ session, token }: { session: CustomSession, user: CustomUser, token: JWT }) {
            session.user = token.user as CustomUser;
            return session
        },

        async jwt({ token, user, }) {
            if (user) {
                token.user = user;
            }
            return token;
        }
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
}

export default NextAuth(authOptions)