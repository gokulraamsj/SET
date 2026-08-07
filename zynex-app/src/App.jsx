import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Team from "./components/Team";
import Events from "./components/Events";
import Internships from "./components/Internships";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import heroBg from "./assets/hero-bg.jpeg";
import "./App.css";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Team />
      <Events />
      <Internships />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="app" style={{ backgroundImage: `url(${heroBg})` }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;