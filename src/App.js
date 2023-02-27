import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AdminPanel from "./admin/AdminPanel";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Contact from "./pages/Contact";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Places from "./pages/Places";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <div className="wrapper">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/places" element={<Places />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/places/details/:id" element={<Details />} />
              <Route path="/login" element={<Login />} />
              <Route path="/adminpanel" element={<AdminPanel />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
