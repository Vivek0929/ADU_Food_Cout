import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UtensilsCrossed, User, Mail, Lock, Phone, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", studentId: "", phone: "",
  });

  const handleChange = (e) => {
    clearError();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/");
    } catch { /* error shown via context */ }
  };

  const fields = [
    { name: "name",      label: "Full Name",    type: "text",     icon: User,     placeholder: "Vivekananda Chary" },
    { name: "email",     label: "Email",         type: "email",    icon: Mail,     placeholder: "you@adu.edu" },
    { name: "studentId", label: "Student ID",    type: "text",     icon: User,     placeholder: "ADU20240901" },
    { name: "phone",     label: "Phone (opt.)",  type: "tel",      icon: Phone,    placeholder: "+91 9999999999" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
            <UtensilsCrossed size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Create account</h1>
          <p className="text-slate-500 mt-1">Join ADU Food Court</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm font-medium">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ name, label, type, icon: Icon, placeholder }) => (
              <div key={name}>
                <label className="block text-[13px] font-bold text-slate-500 mb-1.5">{label}</label>
                <div className="relative">
                  <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={type}
                    name={name}
                    required={name !== "studentId" && name !== "phone"}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition"
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="block text-[13px] font-bold text-slate-500 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold rounded-xl shadow-md shadow-orange-200 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Already registered?{" "}
            <Link to="/login" className="text-orange-500 font-bold hover:text-orange-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
