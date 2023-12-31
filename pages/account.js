import Layout from "@/components/Layout";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Account() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  if (session) {
    return (
      <Layout>
        <div className="lg:pl-40 lg:pr-20 pt-5 ">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10">
            <div className="bg-gray-200 w-full p-10 rounded-2xl min-h-[120] ">
              <h1>Hello, {session?.user.name}</h1>
              <button
                className="bg-gray-800 p-2 mt-10 text-white rounded-lg px-4 shadow-md border border-gray-200 inline-flex items-center gap-2"
                onClick={() => signOut()}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="lg:pl-40 lg:pr-20 pt-5 ">
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10">
          <div className="bg-gray-200 w-full p-10 rounded-2xl min-h-[120] ">
            <h1>Sign In</h1>
            <div className="mt-5">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
            <div>
              <button
                className="bg-white p-2 mb-1 text-black rounded-lg px-4 shadow-md border border-gray-200  items-center gap-2"
                onClick={async () =>
                  await signIn("credentials", { redirect: false, email: email, password: password })
                }>
                Sign in with Email
              </button>
            </div>

            <button
              className="bg-white p-2 mt-1 text-black rounded-lg px-4 shadow-md border border-gray-200 inline-flex items-center gap-2"
              onClick={() => {
                signIn("google");
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 48 48">
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              Login with google
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
