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
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      <input
        className="mb-2 w-full p-2 border"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-2 w-full p-2 border"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignIn}
        className="bg-blue-500 text-white px-4 py-2 w-full rounded"
      >
        Sign In
      </button>
    </div>
  );
}
