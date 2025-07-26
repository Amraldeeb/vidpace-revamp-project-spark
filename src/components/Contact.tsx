import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Send, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import emailjs from '@emailjs/browser';


export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  const { toast } = useToast()

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
    toast({
      title: "Please fill in all fields",
      variant: "destructive"
    });
    return;
  }

  const serviceID = 'service_9g1l3ap';     // replace with your EmailJS service ID
  const templateID = 'template_qpwkovw';   // replace with your EmailJS template ID
  const userID = 'oGiTlm62hWPMpKBa9';           // replace with your EmailJS user/public key

  const templateParams = {
    from_name: `${formData.firstName} ${formData.lastName}`,
    from_email: formData.email,
    message: formData.message
  };

  emailjs.send(serviceID, templateID, templateParams, userID)
    .then(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible."
      });
      setFormData({ firstName: '', lastName: '', email: '' });
    })
    .catch(() => {
      toast({
        title: "Failed to send message.",
        description: "Please try again later.",
        variant: "destructive"
      });
    });
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="hero-gradient bg-clip-text text-transparent">Get Started?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss how we can help automate your content creation and scale your channel
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Schedule a Call Card */}
            <Card variant="glow" className="smooth-transition hover:scale-105">
              <CardHeader className="text-center">
                <div className="p-4 accent-gradient rounded-full w-fit mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Schedule A Call</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  Book a meeting with our content strategy experts to discuss your goals and create a custom plan.
                </p>
               <Link to="/schedule" className="w-full block">
  <Button variant="accent" size="lg" className="w-full">
    <Calendar className="h-5 w-5" />
    Book Your Call
  </Button>
</Link>
              </CardContent>
            </Card>

            {/* Contact Form Card */}
            <Card variant="glass">
              <CardHeader className="text-center">
                <div className="p-4 hero-gradient rounded-full w-fit mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={5}
                      className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    ></textarea>
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    <Send className="h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}