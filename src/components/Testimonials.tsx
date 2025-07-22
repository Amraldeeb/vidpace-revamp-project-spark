
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "VidPace transformed my channel completely! Their content strategy helped me grow from 10K to 500K subscribers in just 8 months. The team is incredibly professional and understands the YouTube algorithm perfectly."
    },
    {
      name: "Mike Chen",
      role: "Gaming YouTuber",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "The SEO optimization and thumbnail designs from VidPace are top-notch. My videos now consistently get 10x more views than before. They really know how to make content that performs."
    },
    {
      name: "Emma Rodriguez",
      role: "Lifestyle Influencer",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "Working with VidPace has been a game-changer. Their social media management freed up so much of my time, and their content strategy increased my engagement by 400%. Highly recommend!"
    },
    {
      name: "David Thompson",
      role: "Tech Reviewer",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "VidPace's YouTube channel management is exceptional. They helped me optimize my content pipeline and now I'm consistently hitting trending. The growth has been incredible!"
    },
    {
      name: "Lisa Park",
      role: "Educational Content Creator",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "The long-form and short-form content strategy from VidPace doubled my subscriber count in 6 months. Their understanding of different content formats is unmatched."
    },
    {
      name: "Alex Rivera",
      role: "Business Coach",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "VidPace's social media ads campaigns brought me 300% more leads. Their targeting and creative approach really resonates with my audience. Fantastic ROI!"
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="accent-gradient bg-clip-text text-transparent">Creators</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what content creators are saying about their experience with VidPace.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} variant="glow" className="smooth-transition hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-card border rounded-lg px-6 py-3">
            <div className="flex gap-1">
              {renderStars(5)}
            </div>
            <span className="text-lg font-semibold">4.9/5</span>
            <span className="text-muted-foreground">from 100+ creators</span>
          </div>
        </div>
      </div>
    </section>
  )
}
