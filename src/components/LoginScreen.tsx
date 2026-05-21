import { useState } from "react";
import { Lock, Eye, EyeOff, Sparkles } from "lucide-react";

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simple, personal, secure access key. Can be updated easily.
  const CORRECT_PASSCODE = "admin123"; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Mimic quick server response
    setTimeout(() => {
      if (password === CORRECT_PASSCODE) {
        sessionStorage.setItem("demo_hub_authenticated", "true");
        onLoginSuccess();
      } else {
        setError("Chave de acesso incorreta. Tente novamente.");
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Abstract light grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      {/* Futuristic glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
        
        {/* Brand identity */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-10 w-10 rounded-xl bg-indigo-650 bg-indigo-650/90 items-center justify-center text-white mx-auto">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          
          <div className="space-y-1">
            <h2 className="text-base font-black tracking-wider uppercase text-white">GoWeb Hub</h2>
            <p className="text-[10px] text-slate-400">Acesso restrito para administração</p>
          </div>
        </div>

        {/* Informative tips */}
        <div className="bg-indigo-950/20 border border-indigo-900/20 rounded-xl p-3 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2.5">
          <Sparkles className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            Esta plataforma é privada e requer a sua chave pessoal de acesso. Dica: A chave padrão é <code className="text-indigo-300 font-bold bg-indigo-900/30 px-1.5 py-0.5 rounded font-mono">admin123</code>.
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Chave de Acesso</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira a sua chave secreta..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && (
              <p className="text-[11px] text-red-400 font-semibold pl-1 pt-1">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-650 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 text-xs cursor-pointer shadow-lg shadow-indigo-950/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
            ) : (
              <span>Entrar no Hub</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
