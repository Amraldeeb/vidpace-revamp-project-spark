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
      price: "$900",
      period: "/month",
      description: "From 0 → 10K subscribers: Launch & Position",
      subtitle: "Perfect for serious creators ready to get started with professional support.",
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
      id: "autopilot",
      name: "Autopilot",
      price: "$1,800",
      period: "/month",
      description: "General Niche: Complete Hands-Off Content",
      subtitle: "Perfect for entrepreneurs who want a fully automated content machine.",
      icon: <Rocket className="h-6 w-6" />,
      badge: "Premium",
      badgeVariant: "secondary" as const,
      target: "Passive income channel",
      features: [
        "12 long-form videos/month (fully scripted & produced)",
        "8 short-form videos/month for cross-platform reach",
        "AI-powered voiceovers or professional narration",
        "Automated posting schedule & optimization",
        "Faceless or general niche content strategy",
        "Monthly performance analytics & optimization reports"
      ],
      highlights: [
        "You do nothing. We handle everything—scripting, voiceover, editing, posting, and growth.",
        "Perfect for building passive income channels with zero effort required from you."
      ]
    },
    {
      id: "growth",
      name: "Growth",
      price: "$2,800",
      period: "/month",
      description: "From 10K → 50K subscribers: Build & Expand",
      subtitle: "Your channel is gaining traction — now let's step it up aggressively.",
      icon: <Star className="h-6 w-6" />,
      badge: "Best Value",
      badgeVariant: "secondary" as const,
      target: "50,000 subscribers",
      features: [
        "8 long-form videos/month",
        "10 short-form videos/month for multi-platform distribution",
        "Premium thumbnails with A/B testing",
        "Unique editing style & brand consistency",
        "Weekly audience engagement & community management",
        "Bi-weekly strategy calls with dedicated team"
      ],
      highlights: [
        "You keep creating. We elevate your brand and engagement — consistently and creatively."
      ]
    },
    {
      id: "pro",
      name: "Elite",
      subtitle_name: "(Full Scale)",
      price: "$5,000",
      period: "/month",
      description: "From 50K → 100K+ subscribers: Lead & Monetize",
      subtitle: "You're ready to build an empire. We become your full-time creative partner.",
      icon: <Crown className="h-6 w-6" />,
      badge: "Celebrity",
      badgeVariant: "destructive" as const,
      target: "100,000+ subscribers",
      features: [
        "16+ long-form videos/month with custom strategy",
        "12+ short-form videos/month for viral potential",
        "Premium custom thumbnails & brand design system",
        "Strategic content direction & storytelling framework",
        "Dedicated team + dedicated account manager",
        "Brand deals support, sponsorship negotiation, monetization setup",
        "Weekly planning sessions + detailed performance reports"
      ],
      highlights: [
        "Complete channel management, brand positioning, and monetization strategy — fully handled."
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                index === 0 ? 'border-primary/50 shadow-lg shadow-primary/20' : 
                index === 1 ? 'border-2 border-primary shadow-xl shadow-primary/30 scale-105' :
                index === 2 ? 'border-accent/50 shadow-lg shadow-accent/20' : 
                'border-accent/50 shadow-lg shadow-accent/20'
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 opacity-5 ${
                index === 0 ? 'hero-gradient' : 
                index === 1 ? 'hero-gradient' :
                index === 2 ? 'accent-gradient' : 
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
                    index === 2 ? 'bg-accent/10 text-accent' : 
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
