import { useNavigate } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext';
import { Mail, Shield, LogOut, ChevronRight, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, orders } = useCanteen();

  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  // Get user's orders
  const userOrders = orders.filter(order => order.customer === user.name || orders.length > 0);
  const completedOrders = userOrders.filter(order => order.status === 'Completed').length;
  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-orange-50 to-white overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-[2rem] p-8 text-white mb-8 shadow-xl">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-3xl bg-white bg-opacity-20 flex items-center justify-center text-5xl font-black shadow-xl backdrop-blur-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* User Info */}
            <div className="flex-1 pt-2">
              <h1 className="text-4xl font-black tracking-tight mb-2">{user.name}</h1>
              <p className="text-white text-opacity-90 font-semibold flex items-center gap-2 mb-3">
                <Mail size={18} /> {user.email}
              </p>
              <div className="flex gap-3 items-center">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${user.role === 'admin'
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-orange-600'
                  }`}>
                  {user.role === 'admin' ? 'Admin' : 'User'}
                </span>
                <span className="text-white text-opacity-80 text-sm font-semibold">
                  ID: {user.studentId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Orders Stat */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 font-semibold text-sm">Orders</span>
              <Clock className="text-orange-500" size={24} />
            </div>
            <p className="text-4xl font-black text-slate-900">{userOrders.length}</p>
            <p className="text-xs text-slate-400 mt-2 font-medium">Total orders placed</p>
          </div>

          {/* Completed Stat */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 font-semibold text-sm">Completed</span>
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <p className="text-4xl font-black text-slate-900">{completedOrders}</p>
            <p className="text-xs text-slate-400 mt-2 font-medium">Successfully delivered</p>
          </div>

          {/* Spent Stat */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 font-semibold text-sm">Spent</span>
              <TrendingUp className="text-blue-500" size={24} />
            </div>
            <p className="text-4xl font-black text-slate-900">₹{totalSpent}</p>
            <p className="text-xs text-slate-400 mt-2 font-medium">Total amount spent</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Order History */}
          <button
            onClick={() => navigate('/orders')}
            className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:shadow-orange-100/50 hover:-translate-y-1 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                  <Clock className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Order History</h3>
                  <p className="text-xs text-slate-500 mt-1">View all your orders</p>
                </div>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-orange-500 transition-colors" size={24} />
            </div>
          </button>

          {/* Admin Dashboard - Only for Admins */}
          {user.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 hover:shadow-lg hover:shadow-red-100/50 hover:-translate-y-1 transition-all text-left group relative overflow-hidden"
            >
              {/* Admin Indicator */}
              <div className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-black">
                ⚙️
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-200 rounded-xl flex items-center justify-center group-hover:bg-red-300 transition-colors">
                    <Shield className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Admin Dashboard</h3>
                    <p className="text-xs text-slate-500 mt-1">Manage canteen operations</p>
                  </div>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-red-500 transition-colors" size={24} />
              </div>
            </button>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-50 to-red-100 text-red-600 rounded-2xl p-4 font-bold hover:from-red-100 hover:to-red-200 transition-all flex items-center justify-center gap-2 border border-red-200 group shadow-sm hover:shadow-md"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
