import { BrowserRouter } from "react-router-dom";
import { CanteenProvider } from "./context/CanteenContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  return (
    <AuthProvider>
      <CanteenProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CanteenProvider>
    </AuthProvider>
  );
}

export default App;