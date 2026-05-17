import { Navigate } from 'react-router-dom';
import { useCanteen } from '../../context/CanteenContext';

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, isLoadingAuth } = useCanteen();

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col items-center justify-center p-4">
        <style>{`
          @keyframes bar-loading {
            0% { left: -40%; width: 40%; }
            50% { left: 20%; width: 60%; }
            100% { left: 100%; width: 40%; }
          }
          .bar-anim {
            position: absolute;
            height: 100%;
            background: linear-gradient(90deg, #f97316, #ea580c);
            border-radius: 9999px;
            animation: bar-loading 1.6s infinite ease-in-out;
          }
        `}</style>
        <div className="flex flex-col items-center gap-6 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-xs w-full text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-lg animate-bounce">
            🍲
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <span className="font-bold text-slate-800 text-lg">Verifying session...</span>
            <p className="text-sm text-slate-500 mb-2">Checking your credentials</p>
            {/* Custom BarLoader themed to ADU Canteen */}
            <div className="w-full h-1.5 bg-orange-100 rounded-full overflow-hidden relative">
              <div className="bar-anim"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
