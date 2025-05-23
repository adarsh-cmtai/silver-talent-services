// src/pages/AdminLoginPage.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Attempting admin login with:", { email, password });

    // --- IMPORTANT: Mock Admin Login Logic ---
    if (email === "admin@example.com" && password === "password123") {
      // Successful login
      alert("Admin login successful!");
      // In a real app: store token/session
      // console.log("Storing admin token/session...");

      // Navigate to the Admin Dashboard
      navigate("/admin/dashboard"); // <--- MODIFIED HERE
    } else {
      setError("Invalid admin credentials. Please try again.");
    }
    // --- End Admin Login Logic ---
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* The pt- values in Layout.jsx should handle navbar offset if this page is within Layout */}
      {/* If AdminLoginPage is NOT within Layout, it needs its own padding if navbar is globally fixed */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Admin Login
        </h2>
        <p className="text-center text-gray-600">
          Access the administrative panel.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </Button>
          </div>
        </form>
        <p className="text-xs text-center text-gray-500">
            Hint: Use admin@example.com / password123 for demo.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;