import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import "./globals.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "password") {
      router.push("/");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
