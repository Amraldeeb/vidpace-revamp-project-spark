import { Button } from "@/components/ui/button"
import vidpaceLogo from "@/assets/vidpace-logo.png"

export const Header = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={vidpaceLogo} 
            alt="VidPace Logo" 
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold">VidPace</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-muted-foreground hover:text-foreground transition-colors"
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