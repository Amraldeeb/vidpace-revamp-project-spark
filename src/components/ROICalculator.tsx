import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, DollarSign, Youtube, Crown, Zap, Star, Rocket, Clock, Users, CheckCircle, AlertCircle, Mail, Calendar, Gamepad2, Laptop, Heart, GraduationCap, PiggyBank } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import emailjs from '@emailjs/browser'

export const ROICalculator = () => {
// EmailJS Configuration - Replace with your actual IDs
const EMAILJS_SERVICE_ID = 'service_9g1l3ap' // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_xmx9gqr' // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'oGiTlm62hWPMpKBa9' // Replace with your EmailJS public key


const packages = [
  {
    id: 'starter',
    name: 'Starter',
    price: 400,
    description: 'From 0 → 10K subscribers: Launch & Position',
    badge: 'Most Popular',
    badgeColor: 'bg-blue-600',
    avgGrowth: 150
  },
  {
    id: 'viral',
    name: 'Viral',
    price: 250,
    description: 'Short-form content focus: Maximize Reach',
    badge: 'Trending',
    badgeColor: 'bg-gray-600',
    avgGrowth: 200
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 600,
    description: 'From 10K → 50K subscribers: Build & Expand',
    badge: 'Best Value',
    badgeColor: 'bg-blue-600',
    avgGrowth: 120
  },
  {
    id: 'pro',
    name: 'Pro (Full Automation)',
    price: 1200,
    description: 'From 50K → 100K+ subscribers: Lead & Monetize',
    badge: 'Celebrity',
    badgeColor: 'bg-red-600',
    avgGrowth: 80
  }
]

const industryPresets = [
  { name: 'Gaming', views: 75000, cpm: 4.50, growth: 180, icon: <Gamepad2 /> },
  { name: 'Tech Reviews', views: 45000, cpm: 8.20, growth: 120, icon: <Laptop /> },
  { name: 'Lifestyle/Vlog', views: 35000, cpm: 6.80, growth: 150, icon: <Heart /> },
  { name: 'Education', views: 25000, cpm: 12.00, growth: 100, icon: <GraduationCap /> },
  { name: 'Finance', views: 20000, cpm: 15.50, growth: 90, icon: <PiggyBank /> }
]

const successStories = [
  { name: "Sarah M.", niche: "Lifestyle", growth: "10K → 85K", time: "8 months", package: "Growth" },
  { name: "Mike T.", niche: "Tech", growth: "5K → 120K", time: "12 months", package: "Pro" },
  { name: "Lisa K.", niche: "Finance", growth: "0 → 45K", time: "6 months", package: "Starter" }
]

const calculateROI = () => {
  // Input states
  const [currentViews, setCurrentViews] = useState('')
  const [currentRevenue, setCurrentRevenue] = useState('') // Changed from CPM to revenue
  const [targetGrowth, setTargetGrowth] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('')
  const [selectedPreset, setSelectedPreset] = useState('')
  
  // Lead capture states
  const [showResults, setShowResults] = useState(false)
  const [email, setEmail] = useState('')
  const [showFullResults, setShowFullResults] = useState(false)
  const [emailSending, setEmailSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  
  // Additional revenue sources
  const [hasSponsorship, setHasSponsorship] = useState(false)
  const [sponsorshipValue, setSponsorshipValue] = useState('')
  const [sponsorshipCount, setSponsorshipCount] = useState('')
  
  const [hasAffiliate, setHasAffiliate] = useState(false)
  const [affiliateValue, setAffiliateValue] = useState('')
  const [affiliateCount, setAffiliateCount] = useState('')
  
  const [hasProduct, setHasProduct] = useState(false)
  const [productValue, setProductValue] = useState('')
  const [productCount, setProductCount] = useState('')
  
  // Calculated results
  const [results, setResults] = useState(null)
  const [urgencyTimer, setUrgencyTimer] = useState(15 * 60) // 15 minutes

  // Initialize EmailJS
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY !== 'oGiTlm62hWPMpKBa9') {
      emailjs.init(EMAILJS_PUBLIC_KEY)
    }
  }, [])

  // Urgency timer
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Apply industry preset
  const applyPreset = (preset) => {
    const estimatedRevenue = (preset.views / 1000) * preset.cpm
    setCurrentViews(preset.views.toString())
    setCurrentRevenue(estimatedRevenue.toFixed(0))
    setTargetGrowth(preset.growth.toString())
    setSelectedPreset(preset.name)
  }

  // Reset all inputs
  const resetInputs = () => {
    setCurrentViews('')
    setCurrentRevenue('')
    setTargetGrowth('')
    setSelectedPackage('')
    setSelectedPreset('')
    setEmail('')
    setShowResults(false)
    setShowFullResults(false)
    setEmailSent(false)
    setResults(null)
  }

  // Get selected package details
  const getSelectedPackageDetails = () => {
    return packages.find(pkg => pkg.id === selectedPackage)
  }

  // Calculate results whenever inputs change
  useEffect(() => {
    if (currentViews && currentRevenue && targetGrowth && selectedPackage) {
      calculateROI()
      setShowResults(true)
    }
  }, [currentViews, currentRevenue, targetGrowth, selectedPackage, hasSponsorship, sponsorshipValue, sponsorshipCount, hasAffiliate, affiliateValue, affiliateCount, hasProduct, productValue, productCount])

  const calculateROI = () => {
    const views = parseFloat(currentViews) || 0
    const revenue = parseFloat(currentRevenue) || 0
    const growth = parseFloat(targetGrowth) || 0
    const packageDetails = getSelectedPackageDetails()
    const cost = packageDetails ? packageDetails.price : 0

    // Current monthly revenue (user input)
    const currentAdRevenue = revenue

    // More realistic growth calculation (diminishing returns)
    const realGrowthMultiplier = 1 + (growth / 100) * 0.8 // 20% discount for realism
    const projectedViews = views * realGrowthMultiplier
    
    // Projected ad revenue with growth + quality improvement
    const projectedAdRevenue = revenue * realGrowthMultiplier * 1.15 // 15% quality boost

    // Additional revenue streams
    let currentAdditionalRevenue = 0
    let projectedAdditionalRevenue = 0

    if (hasSponsorship && sponsorshipValue && sponsorshipCount) {
      const sponsorRevenue = parseFloat(sponsorshipValue) * parseFloat(sponsorshipCount)
      currentAdditionalRevenue += sponsorRevenue
      projectedAdditionalRevenue += sponsorRevenue * realGrowthMultiplier
    }

    if (hasAffiliate && affiliateValue && affiliateCount) {
      const affiliateRevenue = parseFloat(affiliateValue) * parseFloat(affiliateCount)
      currentAdditionalRevenue += affiliateRevenue
      projectedAdditionalRevenue += affiliateRevenue * realGrowthMultiplier
    }

    if (hasProduct && productValue && productCount) {
      const productRevenue = parseFloat(productValue) * parseFloat(productCount)
      currentAdditionalRevenue += productRevenue
      projectedAdditionalRevenue += productRevenue * realGrowthMultiplier
    }

    // Total revenues
    const currentTotalRevenue = currentAdRevenue + currentAdditionalRevenue
    const projectedTotalRevenue = projectedAdRevenue + projectedAdditionalRevenue
    
    // Monthly uplift
    const monthlyUplift = projectedTotalRevenue - currentTotalRevenue
    
    // Annual uplift
    const annualUplift = monthlyUplift * 12
    
    // ROI calculation
    const roi = cost > 0 ? (monthlyUplift / cost) * 100 : 0
    
    // Payback period (months)
    const paybackPeriod = cost > 0 && monthlyUplift > 0 ? cost / monthlyUplift : 0

    // Conservative and aggressive scenarios
    const conservativeUplift = monthlyUplift * 0.6
    const aggressiveUplift = monthlyUplift * 1.4

    // Calculate implied CPM for display
    const impliedCPM = views > 0 ? (revenue / (views / 1000)) : 0

    setResults({
      currentMonthlyRevenue: currentTotalRevenue,
      projectedMonthlyRevenue: projectedTotalRevenue,
      monthlyUplift,
      annualUplift,
      roi,
      projectedViews,
      packageDetails,
      paybackPeriod,
      conservativeUplift,
      aggressiveUplift,
      improvedCPM: impliedCPM * 1.15
    })
  }

  const handleEmailSubmit = async () => {
    if (!email || emailSending) return

    setEmailSending(true)

    try {
      // Prepare email data
      const templateParams = {
        user_email: email,
        current_views: formatNumber(parseFloat(currentViews) || 0),
        current_revenue: formatCurrency(parseFloat(currentRevenue) || 0),
        target_growth: targetGrowth + '%',
        selected_package: getSelectedPackageDetails()?.name || 'None',
        monthly_uplift: formatCurrency(results?.monthlyUplift || 0),
        annual_uplift: formatCurrency(results?.annualUplift || 0),
        roi_percentage: results?.roi?.toFixed(0) + '%' || '0%',
        payback_period: results?.paybackPeriod?.toFixed(1) + ' months' || '0 months',
        timestamp: new Date().toLocaleString()
      }

      // Check if EmailJS is configured
      if (EMAILJS_SERVICE_ID === 'service_9g1l3ap' || EMAILJS_TEMPLATE_ID === 'template_xmx9gqr') {
        console.log('EmailJS Configuration Required. Replace the following in your component:')
        console.log('EMAILJS_SERVICE_ID:', EMAILJS_SERVICE_ID)
        console.log('EMAILJS_TEMPLATE_ID:', EMAILJS_TEMPLATE_ID)
        console.log('EMAILJS_PUBLIC_KEY:', EMAILJS_PUBLIC_KEY)
        console.log('\nEmail template data that would be sent:', templateParams)
        
        // Show results anyway for development
        setShowFullResults(true)
        setEmailSent(true)
      } else {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams
        )
        
        setEmailSent(true)
        setShowFullResults(true)
      }
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Error sending email. Please try again.')
    } finally {
      setEmailSending(false)
    }
  }

  // Generate chart data
  const getChartData = () => {
    if (!results) return []
    
    const months = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6']
    return months.map((month, index) => ({
      month,
      'Current Revenue': results.currentMonthlyRevenue,
      'With VidPace': results.currentMonthlyRevenue + (results.monthlyUplift * (index + 1) / 6)
    }))
  }

  // Generate comparison data for bar chart
  const getComparisonData = () => {
    if (!results) return []
    
    return [
      {
        name: 'Monthly Revenue',
        Current: results.currentMonthlyRevenue,
        'With VidPace': results.projectedMonthlyRevenue
      }
    ]
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getPackageIcon = (packageId) => {
    switch (packageId) {
      case 'starter': return <Star className="h-5 w-5" />
      case 'viral': return <Zap className="h-5 w-5" />
      case 'growth': return <TrendingUp className="h-5 w-5" />
      case 'pro': return <Crown className="h-5 w-5" />
      default: return <Calculator className="h-5 w-5" />
    }
  }

  return (
    <div className="w-full p-4">
      <div className="max-w-7xl mx-auto">
        {/* Urgency Bar */}
        {urgencyTimer > 0 && (
          <div className="bg-red-600 text-white text-center py-2 rounded-lg mb-4 animate-pulse">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="font-semibold">
                Limited Time: Free Growth Analysis expires in {formatTime(urgencyTimer)}
              </span>
            </div>
          </div>
        )}

        {/* Component Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-10 w-10 text-red-500" />
            <h2 className="text-4xl font-bold text-white">ROI Calculator</h2>
          </div>
          <p className="text-lg text-gray-300">Calculate your potential revenue growth with VidPace</p>
          
          {/* Social Proof */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-gray-700">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-white text-sm">2,847 creators growing with us</span>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-gray-700">
              <TrendingUp className="h-4 w-4 text-gray-400" />
              <span className="text-white text-sm">Average 180% growth in 6 months</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="mt-6">
            <div className="flex items-center justify-center gap-4 mb-3">
              <p className="text-gray-300">Quick Start - Choose Your Niche:</p>
              <Button
                onClick={resetInputs}
                variant="outline"
                size="sm"
                className="bg-gray-800/60 border-gray-600 text-red-400 hover:bg-gray-700/80 hover:border-red-500 transition-all"
              >
                🔄 Reset All
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 max-w-4xl mx-auto">
              {industryPresets.map((preset) => (
                <Button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  variant="outline"
                  size="sm"
                  className={`bg-gray-800/60 border-gray-600 text-white hover:bg-gray-700/80 hover:border-red-500 transition-all p-2 h-auto flex flex-col gap-1 ${
                    selectedPreset === preset.name ? 'bg-red-600/20 border-red-500' : ''
                  }`}
                >
                  <span className="text-lg">{preset.icon}</span>
                  <span className="text-xs">{preset.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-2xl bg-gray-900/95 backdrop-blur-sm border border-gray-700">
            <CardHeader className="bg-gradient-to-r from-red-600 to-black text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calculator className="h-6 w-6" />
                Your Current YouTube Metrics
              </CardTitle>
              <CardDescription className="text-gray-300">
                Enter your current YouTube channel performance data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Basic Metrics */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentViews" className="text-gray-200 font-medium flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-red-400" />
                    Current Monthly Views
                    <span className="text-gray-400 text-sm ml-2">(Find in YouTube Analytics)</span>
                  </Label>
                  <Input
                    id="currentViews"
                    type="number"
                    placeholder="e.g. 50,000"
                    value={currentViews}
                    onChange={(e) => setCurrentViews(e.target.value)}
                    className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="currentRevenue" className="text-gray-200 font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    Current Monthly Ad Revenue ($)
                    <span className="text-gray-400 text-sm ml-2">(Estimate if unsure)</span>
                  </Label>
                  <Input
                    id="currentRevenue"
                    type="number"
                    step="0.01"
                    placeholder="e.g. 300"
                    value={currentRevenue}
                    onChange={(e) => setCurrentRevenue(e.target.value)}
                    className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="targetGrowth" className="text-gray-200 font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    Target Growth Percentage (%)
                    <span className="text-gray-400 text-sm ml-2">(VidPace target is 100%+)</span>
                  </Label>
                  <Input
                    id="targetGrowth"
                    type="number"
                    placeholder="e.g. 100"
                    value={targetGrowth}
                    onChange={(e) => setTargetGrowth(e.target.value)}
                    className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="vidpacePackage" className="text-gray-200 font-medium flex items-center gap-2">
                    <Crown className="h-4 w-4 text-yellow-400" />
                    VidPace Package
                    <span className="text-gray-400 text-sm ml-2">(Select your desired plan)</span>
                  </Label>
                  <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                    <SelectTrigger className="mt-2 bg-gray-800 border-gray-600 text-white focus:border-yellow-500 focus:ring-yellow-500">
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-gray-700">
                      {packages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id} className="hover:bg-gray-700 focus:bg-gray-700">
                          <div className="flex items-center gap-3">
                            {getPackageIcon(pkg.id)}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{pkg.name}</span>
                                <span className={`text-xs px-2 py-1 rounded-full text-white ${pkg.badgeColor}`}>
                                  {pkg.badge}
                                </span>
                              </div>
                              <div className="text-sm text-gray-400">${pkg.price}/month</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Revenue Sources */}
              <div className="space-y-4 border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-purple-400" />
                  Additional Revenue Sources
                </h3>
                
                {/* Sponsorships */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sponsorship"
                      checked={hasSponsorship}
                      onCheckedChange={(checked) => setHasSponsorship(checked === true)}
                      className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label htmlFor="sponsorship" className="text-gray-200 font-medium">Sponsorships (per month)</Label>
                  </div>
                  {hasSponsorship && (
                    <div className="grid grid-cols-2 gap-3 ml-6">
                      <Input
                        placeholder="Deals per month"
                        type="number"
                        value={sponsorshipCount}
                        onChange={(e) => setSponsorshipCount(e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                      />
                      <Input
                        placeholder="Average deal value ($)"
                        type="number"
                        value={sponsorshipValue}
                        onChange={(e) => setSponsorshipValue(e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                      />
                    </div>
                  )}
                </div>

                {/* Affiliate Sales */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="affiliate"
                      checked={hasAffiliate}
                      onCheckedChange={(checked) => setHasAffiliate(checked === true)}
                      className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label htmlFor="affiliate" className="text-gray-200 font-medium">Affiliate Sales (per month)</Label>
                  </div>
                  {hasAffiliate && (
                    <div className="grid grid-cols-2 gap-3 ml-6">
                      <Input
                        placeholder="Sales per month"
                        type="number"
                        value={affiliateCount}
                        onChange={(e) => setAffiliateCount(e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                      />
                      <Input
                        placeholder="Average commission ($)"
                        type="number"
                        value={affiliateValue}
                        onChange={(e) => setAffiliateValue(e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                      />
                    </div>
                  )}
                </div>

                {/* Product/Service Sales */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="product"
                      checked={hasProduct}
                      onCheckedChange={(checked) => setHasProduct(checked === true)}
                      className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label htmlFor="product" className="text-gray-200 font-medium">Product/Service Sales (per month)</Label>
                  </div>
                  {hasProduct && (
                    <div className="grid grid-cols-2 gap-3 ml-6">
                      <Input
                        placeholder="Sales per month"
                        type="number"
                        value={productCount}
                        onChange={(e) => setProductCount(e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                      />
                      <Input
                        placeholder="Average profit ($)"
                        type="number"
                        value={productValue}
                        onChange={(e) => setProductValue(e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-2xl bg-gray-900/95 backdrop-blur-sm border border-gray-700">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-6 w-6" />
                Your Growth Potential
              </CardTitle>
              <CardDescription className="text-gray-300">
                See how VidPace can transform your YouTube revenue
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {showResults ? (
                <div className="space-y-6">
                  {/* Selected Package Display */}
                  {results?.packageDetails && (
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-3 mb-2">
                        {getPackageIcon(results.packageDetails.id)}
                        <h3 className="font-semibold text-white">{results.packageDetails.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full text-white ${results.packageDetails.badgeColor}`}>
                          {results.packageDetails.badge}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{results.packageDetails.description}</p>
                      <p className="text-lg font-bold text-yellow-400">${results.packageDetails.price}/month</p>
                    </div>
                  )}

                  {/* Current vs Projected */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <p className="text-sm text-gray-400 mb-1">Current Monthly Revenue</p>
                      <p className="text-2xl font-bold text-white">{formatCurrency(results.currentMonthlyRevenue)}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-700 to-emerald-800 rounded-lg border border-green-600">
                      <p className="text-sm text-green-200 mb-1">Projected Monthly Revenue</p>
                      <p className="text-2xl font-bold text-green-100">{formatCurrency(results.projectedMonthlyRevenue)}</p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div>
                        <p className="text-sm text-gray-400 font-medium">Extra Monthly Revenue</p>
                        <p className="text-xl font-bold text-white">{formatCurrency(results.monthlyUplift)}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-400" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div>
                        <p className="text-sm text-gray-400 font-medium">Extra Annual Revenue</p>
                        <p className="text-xl font-bold text-white">{formatCurrency(results.annualUplift)}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-400" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div>
                        <p className="text-sm text-gray-400 font-medium">ROI vs VidPace Cost</p>
                        <p className="text-xl font-bold text-white">{results.roi.toFixed(0)}%</p>
                      </div>
                      <Calculator className="h-8 w-8 text-red-400" />
                    </div>

                    {results.paybackPeriod > 0 && results.paybackPeriod !== Infinity && (
                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div>
                          <p className="text-sm text-gray-400 font-medium">Payback Period</p>
                          <p className="text-xl font-bold text-white">{results.paybackPeriod.toFixed(1)} months</p>
                        </div>
                        <Clock className="h-8 w-8 text-orange-400" />
                      </div>
                    )}
                  </div>

                  {/* Lead Capture / Full Results */}
                  {!showFullResults ? (
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 space-y-4">
                      <h3 className="font-semibold text-white flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-400" />
                        Unlock Full Growth Projections
                      </h3>
                      <p className="text-sm text-gray-400">Enter your email to receive a detailed report and unlock advanced insights.</p>
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-grow bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                        />
                        <Button onClick={handleEmailSubmit} disabled={emailSending} className="bg-blue-600 hover:bg-blue-700 text-white">
                          {emailSending ? 'Sending...' : 'Get My Report'}
                        </Button>
                      </div>
                      {emailSent && <p className="text-green-400 text-sm flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Report sent! Check your inbox.</p>}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Growth Summary */}
                      <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Rocket className="h-5 w-5" />
                          Growth Summary
                        </h3>
                        <p className="text-sm opacity-90">
                          With {targetGrowth}% growth, your monthly views would increase from{' '}
                          <span className="font-semibold">{formatNumber(parseFloat(currentViews) || 0)}</span> to{' '}
                          <span className="font-semibold">{formatNumber(results.projectedViews)}</span> views.
                        </p>
                        <p className="text-sm opacity-90 mt-1">
                          Your implied CPM would improve from{' '}
                          <span className="font-semibold">{formatCurrency(parseFloat(currentRevenue) / (parseFloat(currentViews) / 1000) || 0)}</span> to{' '}
                          <span className="font-semibold">{formatCurrency(results.improvedCPM)}</span>.
                        </p>
                      </div>

                      {/* Scenario Analysis */}
                      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 space-y-2">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-400" />
                          Scenario Analysis (Monthly Uplift)
                        </h3>
                        <p className="text-sm text-gray-400">Conservative: <span className="font-semibold text-white">{formatCurrency(results.conservativeUplift)}</span></p>
                        <p className="text-sm text-gray-400">Aggressive: <span className="font-semibold text-white">{formatCurrency(results.aggressiveUplift)}</span></p>
                      </div>

                      {/* Revenue Trend Chart */}
                      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <h3 className="font-semibold text-white mb-4">Projected Revenue Trend</h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={getChartData()} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                            <XAxis dataKey="month" stroke="#9a9a9a" />
                            <YAxis stroke="#9a9a9a" tickFormatter={(value) => `$${formatNumber(value)}`} />
                            <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
                            <Legend />
                            <Line type="monotone" dataKey="Current Revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="With VidPace" stroke="#82ca9d" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Monthly Revenue Comparison Bar Chart */}
                      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <h3 className="font-semibold text-white mb-4">Monthly Revenue Comparison</h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={getComparisonData()} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                            <XAxis dataKey="name" stroke="#9a9a9a" />
                            <YAxis stroke="#9a9a9a" tickFormatter={(value) => `$${formatNumber(value)}`} />
                            <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
                            <Legend />
                            <Bar dataKey="Current" fill="#8884d8" />
                            <Bar dataKey="With VidPace" fill="#82ca9d" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Success Stories */}
                      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                          <Users className="h-5 w-5 text-teal-400" />
                          Our Success Stories
                        </h3>
                        <div className="space-y-3">
                          {successStories.map((story, index) => (
                            <div key={index} className="flex items-start gap-3 bg-gray-700/50 p-3 rounded-lg">
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                              <div>
                                <p className="text-white font-medium">{story.name} ({story.niche})</p>
                                <p className="text-sm text-gray-300">Growth: <span className="font-semibold">{story.growth}</span> in <span className="font-semibold">{story.time}</span> with <span className="font-semibold">{story.package}</span> package.</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-4 text-lg font-semibold shadow-lg">
                        Start Growing with VidPace
                      </Button>

                      {/* Schedule Call CTA */}
                      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 text-center space-y-3">
                        <h3 className="font-semibold text-white flex items-center justify-center gap-2">
                          <Calendar className="h-5 w-5 text-orange-400" />
                          Ready to Discuss Your Strategy?
                        </h3>
                        <p className="text-sm text-gray-400">Book a free 15-minute strategy call with our experts.</p>
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                          Schedule a Call
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Enter your YouTube metrics to see your growth potential</p>
                  <p className="text-gray-600 text-sm mt-2">Fill in all required fields above to calculate your ROI</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="text-lg">© 2024 VidPace. Put Your Content On Autopilot.</p>
          <p className="text-sm opacity-75 mt-2">Grow your YouTube channel with data-driven strategies.</p>
        </div>
      </div>
    </div>
  )
}
}
