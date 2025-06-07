"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebaseConfig";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in!");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    alert("Signed out!");
  };

  if (loading) return <p className="p-4 text-center">Checking user...</p>;

  if (user) {
    return (
      <div className="p-4 max-w-sm mx-auto text-center">
        <h2 className="text-xl font-bold mb-4">Welcome, {user.email}</h2>
        <button
          onClick={handleSignOut}
          className="bg-[#88D6A2] text-[#743749] py-2 w-full font-bold rounded-lg border-2 border-[#743749] hover:scale-105 transition"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-[#EBE1D8] text-[#743749]">
      <h1 className="text-3xl font-bold mb-2 text-center">Sign In</h1>
      <form
      onSubmit={(e) => {
    e.preventDefault(); // prevent reload
    handleSignIn();
  }}
        className="max-w-md mx-auto flex flex-col gap-6 border-2 border-[#743749] p-6 rounded-xl bg-white"
      >
      <input
        className="border border-[#743749] p-2 w-full rounded-md text-[#743749]"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-[#743749] p-2 w-full rounded-md text-[#743749]"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignIn}
        className="bg-[#88D6A2] text-[#743749] py-2 w-full font-bold rounded-lg border-2 border-[#743749] hover:scale-105 transition"
        // className="bg-blue-500 text-white px-4 py-2 w-full rounded"
      >
        Sign In
      </button>
      </form>
    </div>
  );
}