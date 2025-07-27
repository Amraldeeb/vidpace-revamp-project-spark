import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import vidpaceLogo from "@/assets/vidpace-logo.png"

export const Header = () => {
    const navigate = useNavigate()
  const location = useLocation()
 const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      // Use a timeout to ensure the page has rendered before attempting to scroll
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100); 
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 text-black">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={vidpaceLogo} 
            alt="VidPace Logo" 
            className="h-8 w-auto"
          />
          <span className="text-lg font-semibold text-gray-700">Youtube Management</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-gray-600 hover:text-black transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="text-gray-600 hover:text-black transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="text-gray-600 hover:text-black transition-colors"
          >
            Pricing
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-gray-600 hover:text-black transition-colors"
          >
            Contact
          </button>
        </nav>

        <Button 
          variant="hero" 
          size="sm"
          onClick={() => scrollToSection('contact')}
        >
          Get Started
        </Button>
      </div>
    </header>
  )
}