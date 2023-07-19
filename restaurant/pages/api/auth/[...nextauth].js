import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { Restaurant } from "@/models/Restaurant";

// const adminEmails = ["ehtashamtoor50@gmail.com"];

export const AuthOptions = {
  // pages: {
  //   signIn: "/auth/signin/restaurant",
  // },
  providers: [
    CredentialsProvider({
      name: "Restaurant Login",
      // credentials: {
      //   username: { label: "Username", type: "text" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials, req) {
        // Add your custom authentication logic here
        console.log(credentials);
        const { username, password } = credentials;

        const user = await getUserByName(username);

        if (!user) {
          throw new Error("No user found");
        }
        console.log(user);

        const passwordsMatch = await bcrypt.compare(password, user.password);
        console.log(passwordsMatch);

        if (!passwordsMatch) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
    // CredentialsProvider({
    //   name: "Customer Login",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     // Add your custom authentication logic here
    //     const { email, password } = credentials;
    //     console.log("Customer login:", email, password);

    //     // Example: Fetch user from database
    //     const user = await getUserByEmail(email);

    //     if (!user) {
    //       throw new Error("No user found");
    //     }

    //     // Example: Compare password hashes
    //     const passwordsMatch = await bcrypt.compare(password, user.password);

    //     if (!passwordsMatch) {
    //       throw new Error("Invalid password");
    //     }

    //     // Return user object on successful authentication
    //     return user;
    //   },
    // }),
  ],
  adapter: MongoDBAdapter(clientPromise),
};

// export default NextAuth(AuthOptions);
export default (req, res) => NextAuth(req, res, AuthOptions);

async function getUserByName(username) {
  const user = await Restaurant.findOne({ name: username });
  if (!user) return null;

  return user;
}
