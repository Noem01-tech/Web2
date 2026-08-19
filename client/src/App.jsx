import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoginPage } from "./pages/loginPage";
import { Dashboard } from "./pages/dashboard";

const AppContent = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Dashboard /> : <LoginPage />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;