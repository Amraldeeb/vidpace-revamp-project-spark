import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { useEffect } from "react"

const Schedule = () => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Schedule Your <span className="accent-gradient bg-clip-text text-transparent">Strategy Call</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Book a free consultation with our content strategy experts. Let's discuss your goals and create a custom plan to scale your channel.
            </p>
          </div>
        </div>
      </section>

      {/* Calendly Embed Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Calendly inline widget */}
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/vidpace/zoom-meeting"
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What to Expect in Your <span className="accent-gradient bg-clip-text text-transparent">Strategy Call</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Channel Analysis</h3>
              <p className="text-muted-foreground">
                We'll review your current content strategy and identify opportunities for growth and optimization.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Growth Strategy</h3>
              <p className="text-muted-foreground">
                Get a personalized roadmap with actionable steps to scale your channel and increase engagement.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
              <p className="text-muted-foreground">
                Learn how VidPace can help automate your content creation and accelerate your growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Schedule