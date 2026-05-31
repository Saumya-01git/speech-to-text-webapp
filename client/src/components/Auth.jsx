import { useState } from "react";
import { supabase } from "../supabaseClient";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Auth() {
  const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");
const [signupEmail, setSignupEmail] = useState("");
const [signupPassword, setSignupPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [message, setMessage] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const email = authMode === "login" ? loginEmail : signupEmail;
const password = authMode === "login" ? loginPassword : signupPassword;
  const handleForgotPassword = async () => {
  setMessage("");

  if (!email) {
    setMessage("Please enter your email first");
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    if (error.message.includes("rate limit")) {
  setMessage("⚠️ Too many email requests. Please wait a few minutes and try again.");
} else {
  setMessage(error.message);
}
  } else {
    setMessage("✅ Password reset link sent to your email");
  }
};

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email)) {
    setMessage("Please enter a valid email address");
    return;
    }

    if (authMode === "signup") {
  const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (!strongPasswordRegex.test(password)) {
    setMessage("Password must be at least 8 characters and include 1 letter and 1 number");
    return;
  }
}
setAuthLoading(true);

try {
  const { error } =
    authMode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

  if (error) {
  if (error.message === "Invalid login credentials") {
    setMessage("❌ Incorrect email or password");
  } else {
    setMessage(error.message);
  }
} else {
  setMessage(
    authMode === "login"
      ? "✅ Login successful"
      : "✅ Signup successful. Check your email to verify your account."
  );
    }
} finally {
  setAuthLoading(false);
}
  };

  return (
  <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#111827] text-white px-4">

    <div className="absolute top-20 left-20 w-72 h-72 bg-orange-400/20 blur-3xl rounded-full"></div>
    <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]"></div>
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <div className="absolute top-32 left-1/4 w-32 h-32 rounded-full border border-cyan-400/20 bg-cyan-400/3 backdrop-blur-xl"></div>

<div className="absolute bottom-32 right-1/4 w-40 h-40 rounded-full border border-orange-400/20 bg-orange-400/5 backdrop-blur-xl"></div>

<div className="absolute top-1/2 right-20 w-16 h-16 rounded-full border border-blue-400/20 bg-blue-400/5 backdrop-blur-xl"></div>
    <div className="absolute w-[650px] h-[650px] bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-cyan-400/20 blur-3xl rounded-full"></div>
    <form
      onSubmit={handleAuth}
      className="relative w-full max-w-lg bg-white/[0.08] border border-white/20 rounded-[32px] p-8 backdrop-blur-2xl shadow-2xl shadow-blue-500/20 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(59,130,246,0.25)] transition-all duration-500"
    >
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🎤</div>

        <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-white via-cyan-200 to-orange-300 bg-clip-text text-transparent">
          SpeechAI
        </h1>

        <p className="text-gray-300 text-base">
          {authMode === "login"
            ? "Welcome back. Continue your speech-to-text workspace."
            : "Create your account and save your transcriptions securely."}
        </p>
      </div>
      
      {message && (
  <div className="mb-4 rounded-2xl border border-orange-400/30 bg-orange-500/10 px-4 py-3 text-center text-sm text-orange-200 shadow-[0_0_20px_rgba(251,146,60,0.15)]">
    {message}
  </div>
)} 


      <input
        type="email"
        placeholder="Email address"
        className="w-full mb-4 px-5 py-4 rounded-2xl bg-black/30 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-orange-400 transition-all duration-300"
        value={email}
onChange={(e) =>
  authMode === "login"
    ? setLoginEmail(e.target.value)
    : setSignupEmail(e.target.value)
}
        required
      />

      <div className="relative mb-5">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="w-full px-5 py-4 pr-14 rounded-2xl bg-black/30 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-orange-400 transition-all duration-300"
    value={password}
    onChange={(e) =>
      authMode === "login"
        ? setLoginPassword(e.target.value)
        : setSignupPassword(e.target.value)
    }
    required
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-orange-300 transition-all duration-300"
  >
    {showPassword ? (
  <FiEyeOff size={20} />
) : (
  <FiEye size={20} />
)}
  </button>
</div>
 {authMode === "login" && (
  <div className="text-right mb-5">
    <button
      type="button"
      onClick={handleForgotPassword}
      className="text-sm text-cyan-300 hover:text-orange-300 transition-all duration-300"
    >
      Forgot Password?
    </button>
  </div>
)}

      <button
  disabled={authLoading}
  className={`w-full bg-gradient-to-r from-orange-400 to-orange-600 text-black font-bold py-4 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(251,146,60,0.35)] ${
    authLoading
      ? "opacity-60 cursor-not-allowed"
      : "hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
  }`}
>
  {authLoading
    ? authMode === "login"
      ? "Logging in..."
      : "Signing up..."
    : authMode === "login"
    ? "Login"
    : "Sign Up"}
</button>

      

      <p className="mt-6 text-center text-gray-200">
        {authMode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
  setMessage("");
  setShowPassword(false);
  setAuthMode(authMode === "login" ? "signup" : "login");
}}
          className="text-orange-300 hover:text-orange-200 font-semibold transition-all duration-300"
        >
          {authMode === "login" ? "Sign up" : "Login"}
        </button>
      </p>
    </form>
    <p className="absolute bottom-10 text-center text-gray-400 text-sm">
  Secure • Fast • AI-Powered Transcription
</p>
  </div>
);
}

export default Auth;