import { Button } from "@/components/ui/button"
import { Play, Zap, TrendingUp } from "lucide-react"
import heroImage from "@/assets/hero-bg.jpg"

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/70" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-32 h-32 hero-gradient rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 accent-gradient rounded-full blur-2xl opacity-40 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-40 h-40 hero-gradient rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Zap className="h-4 w-4 text-vidpace-purple" />
            <span className="text-sm font-medium">Automate Your Content Creation</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Put Your Content 
            <span className="hero-gradient bg-clip-text text-transparent animate-gradient">
              {" "}On Autopilot
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We work with content creators to streamline video production, optimize for growth, 
            and scale your channel while you focus on what matters most.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">500%</div>
              <div className="text-sm text-muted-foreground">Average Growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Content Pipeline</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">100+</div>
              <div className="text-sm text-muted-foreground">Creators Served</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={scrollToContact}
              className="group"
            >
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Start Your Journey
            </Button>
            <Button 
              variant="glass" 
              size="xl"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <TrendingUp className="h-5 w-5" />
              See Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}