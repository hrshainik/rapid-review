import Head from "next/head";
import { useAuth } from "../lib/auth";

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>Rapid Review</title>
        <meta
          name="description"
          content="Just one div can solve your complex commenting problem"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <button onClick={(e) => auth.signinWithGithub()}>Sign In</button>
        <p>{auth?.user?.email}</p>
        <p>{auth?.user?.name}</p>
        <button onClick={(e) => auth.signout()}>Sign Out</button>
      </div>
    </div>
  );
}
