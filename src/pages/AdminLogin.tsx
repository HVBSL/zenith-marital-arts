import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Lock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const AdminLogin = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [passwd, setPasswd] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdmin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbySTueDQfgizQr0-KSMYzJCBPW_Dq0A0HBIdc-Y0dPsqvBGgNmFvJtf-VPUtGu4aAhC/exec",
        {
          method: "POST",
          body: JSON.stringify({
            mobileNo,
            passwd,
          }),
        }
      );

      const data = await response.json();
      console.log("Login Response:", data);

      if (data.status === "success" && data.user && data.user.length > 0) {
        const userData = data.user[0];
        login({
          name: userData.name,
          mobile: userData.mobile,
          status: userData.status,
        });
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Failed to connect to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-card-foreground mb-2">
              Super Admin
            </h1>
            <p className="text-muted-foreground font-body">Sign in to manage events</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-600 font-body">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-heading font-semibold text-card-foreground">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  required
                  className="pl-10 py-2.5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-heading font-semibold text-card-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={passwd}
                  onChange={(e) => setPasswd(e.target.value)}
                  required
                  className="pl-10 py-2.5"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-2.5 font-heading font-semibold"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
