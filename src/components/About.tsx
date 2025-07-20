import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Clock, Target } from "lucide-react"

export const About = () => {
  const features = [
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced professionals who understand the content creation landscape"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Track record of helping creators achieve significant growth"
    },
    {
      icon: Clock,
      title: "Efficient Delivery",
      description: "Projects completed on schedule with consistent quality"
    },
    {
      icon: Target,
      title: "Lasting Partnerships",
      description: "Building long-term relationships with our creator community"
    }
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="hero-gradient bg-clip-text text-transparent">VidPace</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Since our founding, we've added significant value to video content creation for our clients. 
              Great service begins and ends with experienced and friendly professionals, which is why we 
              put so much consideration into selecting only the best to join our team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <Card key={index} variant="glass" className="smooth-transition hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 hero-gradient rounded-lg">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              We complete projects efficiently and on schedule, and go above and beyond to form 
              lasting relationships with our clients in the ever-evolving world of content creation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}