import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, Rocket } from "lucide-react"

export const Pricing = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  const packages = [
    {
      id: "starter",
      name: "Starter",
      price: "$400",
      period: "/month",
      description: "From 0 → 10K subscribers: Launch & Position",
      subtitle: "Perfect for creators ready to get started but need full support.",
      icon: <Zap className="h-6 w-6" />,
      badge: "Most Popular",
      badgeVariant: "default" as const,
      target: "10,000 subscribers",
      features: [
        "4 long-form videos/month",
        "4 short-form videos/month for increased reach",
        "High-quality, tailored thumbnails",
        "Creative banner, intro/outro",
        "Search-optimized titles & descriptions",
        "Monthly growth report + clear next steps"
      ],
      highlights: [
        "You record. We handle editing, posting, thumbnails, channel visuals, and growth.",
        "No revisions — we manage every detail from start to finish."
      ]
    },
    {
      id: "growth",
      name: "Growth",
      price: "$600",
      period: "/month",
      description: "From 10K → 50K subscribers: Build & Expand",
      subtitle: "Your channel is gaining traction — now let's step it up.",
      icon: <Star className="h-6 w-6" />,
      badge: "Best Value",
      badgeVariant: "secondary" as const,
      target: "50,000 subscribers",
      features: [
        "6 long-form videos/month",
        "6 short-form videos/month that can be used with other social media platforms",
        "Premium thumbnails for every video",
        "Unique editing style that holds attention",
        "Regular posting & audience engagement support",
        "Bi-weekly strategy calls"
      ],
      highlights: [
        "You keep creating. We elevate your brand and engagement — consistently and creatively."
      ]
    },
    {
      id: "pro",
      name: "Pro",
      subtitle_name: "(Full Automation)",
      price: "$1,200",
      period: "/month",
      description: "From 50K → 100K+ subscribers: Lead & Monetize",
      subtitle: "You're ready to build a brand and revenue. We become your full-time creative partner.",
      icon: <Crown className="h-6 w-6" />,
      badge: "Celebrity",
      badgeVariant: "destructive" as const,
      target: "100,000+ subscribers",
      features: [
        "12+ long-form videos/month",
        "8+ short-form videos/month for shareability",
        "Premium custom thumbnails & creative design",
        "Strategic content direction & storytelling",
        "Dedicated team and channel strategy",
        "Brand deals support, pitch decks, monetization setup",
        "Weekly planning sessions + performance reports"
      ],
      highlights: [
        "Complete channel management, brand output, and monetization strategy — handled."
      ]
    }
  ]

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Rocket className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Choose Your Growth Path</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Pricing That 
            <span className="hero-gradient bg-clip-text text-transparent animate-gradient">
              {" "}Scales With You
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From launching your first video to building a monetized brand, 
            we have the perfect package to accelerate your YouTube journey.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                index === 0 ? 'border-primary/50 shadow-lg shadow-primary/20' : 
                index === 1 ? 'border-2 border-primary shadow-xl shadow-primary/30 scale-105' : 
                'border-accent/50 shadow-lg shadow-accent/20'
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 opacity-5 ${
                index === 0 ? 'hero-gradient' : 
                index === 1 ? 'hero-gradient' : 
                'accent-gradient'
              }`} />
              
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute top-4 right-4">
                  <Badge variant={pkg.badgeVariant} className="text-xs font-semibold">
                    {pkg.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${
                    index === 0 ? 'bg-primary/10 text-primary' : 
                    index === 1 ? 'bg-primary/10 text-primary' : 
                    'bg-accent/10 text-accent'
                  }`}>
                    {pkg.icon}
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      {pkg.name}
                      {pkg.subtitle_name && <span className="text-lg font-normal text-muted-foreground ml-1">{pkg.subtitle_name}</span>}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-muted-foreground">
                      {pkg.description}
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className="text-muted-foreground">{pkg.period}</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pkg.subtitle}
                </p>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                {/* Highlights */}
                {pkg.highlights.map((highlight, idx) => (
                  <div key={idx} className="p-4 bg-muted/50 rounded-lg border border-border/50">
                    <p className="text-sm font-medium text-foreground/90 italic">
                      "{highlight}"
                    </p>
                  </div>
                ))}

                {/* Target */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Target:
                  </h4>
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm font-semibold text-primary">
                      {pkg.target}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    What's Included:
                  </h4>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="relative z-10 pt-6">
                <Button 
                  variant={index === 1 ? "hero" : "outline"}
                  size="lg"
                  className="w-full group"
                  onClick={scrollToContact}
                >
                  <Rocket className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  Get Started with {pkg.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Channel?
            </h3>
            <p className="text-muted-foreground mb-8">
              Join 100+ creators who have scaled their channels with our proven system. 
              Let's discuss which package is perfect for your goals.
            </p>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={scrollToContact}
              className="group"
            >
              <Star className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Schedule Your Strategy Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}