import { useState } from "react";
import { supabase } from "../supabaseClient";
import { FiEye, FiEyeOff } from "react-icons/fi";

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✅ Password updated successfully. Redirecting to login...");

      setTimeout(async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#111827] text-white px-4">
      <div className="absolute top-20 left-20 w-72 h-72 bg-orange-400/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <form
        onSubmit={handleUpdatePassword}
        className="relative w-full max-w-lg bg-white/[0.08] border border-white/20 rounded-[32px] p-8 backdrop-blur-2xl shadow-2xl shadow-blue-500/20"
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎤</div>

          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-white via-cyan-200 to-orange-300 bg-clip-text text-transparent">
            Reset Password
          </h1>

          <p className="text-gray-300 text-base">
            Create a new secure password for your SpeechAI account.
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-2xl border border-orange-400/30 bg-orange-500/10 px-4 py-3 text-center text-sm text-orange-200">
            {message}
          </div>
        )}

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            className="w-full px-5 py-4 pr-14 rounded-2xl bg-black/30 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-orange-400 transition-all duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-orange-300 transition-all duration-300"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm new password"
          className="w-full mb-5 px-5 py-4 rounded-2xl bg-black/30 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-orange-400 transition-all duration-300"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className={`w-full bg-gradient-to-r from-orange-400 to-orange-600 text-black font-bold py-4 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(251,146,60,0.35)] ${
            loading
              ? "opacity-60 cursor-not-allowed"
              : "hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;