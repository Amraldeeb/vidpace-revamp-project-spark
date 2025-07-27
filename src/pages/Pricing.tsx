import { Header } from "@/components/Header"
import { Pricing } from "@/components/Pricing"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"

const PricingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16">
        <Pricing />
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;