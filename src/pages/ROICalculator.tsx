import { Header } from "@/components/Header"
import { ROICalculator } from "@/components/ROICalculator"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"

const ROICalculatorPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <ROICalculator />
      <Contact />
      <Footer />
    </div>
  )
}

export default ROICalculatorPage
