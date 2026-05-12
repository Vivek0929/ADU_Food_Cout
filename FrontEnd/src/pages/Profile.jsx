import { User, Mail, Phone, MapPin, Settings, Shield, Bell, CreditCard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const profileSections = [
    { icon: <User className="text-indigo-600" />, title: "Personal Info", desc: "Update your name, photo, and ID" },
    { icon: <Mail className="text-indigo-600" />, title: "Email & Security", desc: "Manage password and recovery email" },
    { icon: <Phone className="text-indigo-600" />, title: "Contact Details", desc: "Change phone number and addresses" },
    { icon: <CreditCard className="text-indigo-600" />, title: "Payments", desc: "Saved cards and digital wallets" },
    { icon: <Shield className="text-indigo-600" />, title: "Privacy", desc: "Manage data sharing and account visibility" },
    { icon: <Bell className="text-indigo-600" />, title: "Notifications", desc: "Alerts for orders and promotions" },
  ];

  return (
    <div className="flex-1 p-8 bg-[#F8F9FF] overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm mb-8 flex flex-wrap items-center gap-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-orange-100 group-hover:scale-105 transition-transform duration-300">
              {user?.name?.charAt(0) || "U"}
            </div>
            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
              <Settings size={20} />
            </button>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user?.name || "User Name"}</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2 mt-1">
              <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                {user?.role === "admin" ? "Admin" : "Student"}
              </span>
              {user?.studentId && `ID: ${user.studentId}`}
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <Mail size={16} /> {user?.email || "user@adu.edu"}
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <MapPin size={16} /> Block B, Room 402
              </div>
            </div>
          </div>

          <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-slate-200">
            Edit Profile
          </button>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profileSections.map((section, idx) => (
            <button key={idx} className="bg-white rounded-3xl border border-slate-100 p-6 flex items-center gap-5 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all text-left">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                {section.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{section.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{section.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Danger Zone */}
        <div className="mt-8">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 rounded-3xl p-5 font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2 group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Sign Out of Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
