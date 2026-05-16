import { useState, useEffect } from "react";
import { User, Mail, ShieldCheck, Clock } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/users", {
          credentials: 'include'
        });
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="p-10 text-center text-slate-500">Loading users...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto w-full px-4 pt-4 pb-24 lg:pb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-slate-900">User Management</h2>
        <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
          {users.length} Total Users
        </div>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${user.role === 'admin' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
              <User size={24} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-bold text-slate-900 truncate">{user.name || 'No Name'}</h3>
                {user.role === 'admin' && (
                  <span className="bg-orange-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Admin</span>
                )}
              </div>
              <div className="flex items-center gap-4 text-slate-500 text-[13px]">
                <div className="flex items-center gap-1 truncate">
                  <Mail size={14} />
                  {user.email}
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <Clock size={14} />
                  Joined {new Date(user.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:self-center">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold ${user.role === 'admin' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                <ShieldCheck size={14} />
                {user.role === 'admin' ? 'Full Access' : 'User Access'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 rounded-2xl p-4 border border-blue-100">
        <h4 className="text-blue-800 font-bold text-sm mb-1">Security Note</h4>
        <p className="text-blue-600 text-xs leading-relaxed">
          Passwords are encrypted using BCRYPT hashing and cannot be viewed in plain text. This is a security best practice to protect user data.
        </p>
      </div>
    </div>
  );
};

export default AdminUsers;
