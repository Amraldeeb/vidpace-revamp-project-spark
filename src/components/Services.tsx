import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Video, 
  Megaphone, 
  Users, 
  FileText, 
  Mic, 
  Search, 
  Youtube,
  X,
  Check
} from "lucide-react"

export const Services = () => {
  const servicesWeProvide = [
  {
    icon: Megaphone,
    title: "Social Media Ads",
    description: "Strategic advertising campaigns to boost your reach and engagement"
  },
  {
    icon: Users,
    title: "Youtube Channel Management",
    description: "Complete content strategy and daily management"
  },
  {
    icon: FileText,
    title: "Long & Short Form Content",
    description: "Engaging video content and professional thumbnails for all platforms"
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Video optimization for search engines with authentic voice-over and scripts"
  },
  {
    icon: Youtube,
    title: "YouTube Channel Management",
    description: "End-to-end YouTube channel growth and optimization"
  }
]

const servicesWeDontProvide = [
  "Videography",
  "Generic content templates",
  "One-size-fits-all solutions", 
  "Automated bot interactions",
  "Low-quality mass production"
]

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="accent-gradient bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive content creation services designed to scale your channel and maximize your impact
          </p>
        </div>

        {/* Services We Provide */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            <Check className="h-6 w-6 text-green-500" />
            What We Deliver
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesWeProvide.map((service, index) => (
              <Card key={index} variant="glow" className="smooth-transition hover:scale-105">
                <CardHeader>
                  <div className="p-3 accent-gradient rounded-lg w-fit mb-4">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services We Don't Provide */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            <X className="h-6 w-6 text-red-500" />
            What We Don't Do
          </h3>
          <Card variant="glass" className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {servicesWeDontProvide.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  )
}