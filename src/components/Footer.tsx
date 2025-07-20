import { Play } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
              <Play className="h-5 w-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold">VidPace</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-muted-foreground">
              © 2024 VidPace. Putting content creation on autopilot.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}