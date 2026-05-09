"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  return (
    <div className="flex gap-4 items-center">
      {session ? (
        <>
          <p>{session.user?.name}</p>

<button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn("github")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login with GitHub
        </button>
      )}
    </div>
  );
}