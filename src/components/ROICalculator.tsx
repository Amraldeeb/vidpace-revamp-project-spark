import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, DollarSign, Youtube, Crown, Zap, Star, Rocket, Clock, Users, CheckCircle, AlertCircle, Mail, Calendar } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import emailjs from '@emailjs/browser'

export const ROICalculator = () => {
const EMAILJS_SERVICE_ID = 'service_9g1l3ap' // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_qpwkovw' // Replace with your EmailJS template ID
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
  { name: 'Gaming', views: 75000, cpm: 4.50, growth: 180 },
  { name: 'Tech Reviews', views: 45000, cpm: 8.20, growth: 120 },
  { name: 'Lifestyle/Vlog', views: 35000, cpm: 6.80, growth: 150 },
  { name: 'Education', views: 25000, cpm: 12.00, growth: 100 },
  { name: 'Finance', views: 20000, cpm: 15.50, growth: 90 }
]

const successStories = [
  { name: "Sarah M.", niche: "Lifestyle", growth: "10K → 85K", time: "8 months", package: "Growth" },
  { name: "Mike T.", niche: "Tech", growth: "5K → 120K", time: "12 months", package: "Pro" },
  { name: "Lisa K.", niche: "Finance", growth: "0 → 45K", time: "6 months", package: "Starter" }
]


  // Input states
  const [currentViews, setCurrentViews] = useState('')
  const [currentCPM, setCurrentCPM] = useState('')
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
    setCurrentViews(preset.views.toString())
    setCurrentCPM(preset.cpm.toString())
    setTargetGrowth(preset.growth.toString())
    setSelectedPreset(preset.name)
  }

  // Get selected package details
  const getSelectedPackageDetails = () => {
    return packages.find(pkg => pkg.id === selectedPackage)
  }

  // Calculate results whenever inputs change
  useEffect(() => {
    if (currentViews && currentCPM && targetGrowth && selectedPackage) {
      calculateROI()
      setShowResults(true)
    }
  }, [currentViews, currentCPM, targetGrowth, selectedPackage, hasSponsorship, sponsorshipValue, sponsorshipCount, hasAffiliate, affiliateValue, affiliateCount, hasProduct, productValue, productCount])

  const calculateROI = () => {
    const views = parseFloat(currentViews) || 0
    const cpm = parseFloat(currentCPM) || 0
    const growth = parseFloat(targetGrowth) || 0
    const packageDetails = getSelectedPackageDetails()
    const cost = packageDetails ? packageDetails.price : 0

    // Current ad revenue
    const currentAdRevenue = (views / 1000) * cpm

    // More realistic growth calculation (diminishing returns)
    const realGrowthMultiplier = 1 + (growth / 100) * 0.8 // 20% discount for realism
    const projectedViews = views * realGrowthMultiplier
    
    // Projected ad revenue with slight CPM improvement
    const improvedCPM = cpm * 1.1 // 10% CPM improvement from better content
    const projectedAdRevenue = (projectedViews / 1000) * improvedCPM

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
    const paybackPeriod = cost > 0 ? cost / monthlyUplift : 0

    // Conservative and aggressive scenarios
    const conservativeUplift = monthlyUplift * 0.6
    const aggressiveUplift = monthlyUplift * 1.4

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
      improvedCPM
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
        current_cpm: currentCPM,
        target_growth: targetGrowth + '%',
        selected_package: getSelectedPackageDetails()?.name || 'None',
        monthly_uplift: formatCurrency(results?.monthlyUplift || 0),
        annual_uplift: formatCurrency(results?.annualUplift || 0),
        roi_percentage: results?.roi?.toFixed(0) + '%' || '0%',
        payback_period: results?.paybackPeriod?.toFixed(1) + ' months' || '0 months',
        timestamp: new Date().toLocaleString()
      }

      // Check if EmailJS is configured
      if (EMAILJS_SERVICE_ID === 'service_9g1l3ap' || EMAILJS_TEMPLATE_ID === 'template_qpwkovw') {
        console.log('EmailJS not configured. Template params would be:', templateParams)
        alert('EmailJS not configured yet. Check console for template data.')
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
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-white text-sm">2,847 creators growing with us</span>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-gray-700">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span className="text-white text-sm">Average 180% growth in 6 months</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="mt-6">
            <p className="text-gray-300 mb-3">Quick Start - Choose Your Niche:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {industryPresets.map((preset) => (
                <Button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  variant="outline"
                  size="sm"
                  className={`bg-gray-800/60 border-gray-600 text-white hover:bg-gray-700/80 hover:border-red-500 transition-all ${
                    selectedPreset === preset.name ? 'bg-red-600/20 border-red-500' : ''
                  }`}
                >
                  {preset.name}
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
                  <Label htmlFor="currentViews" className="text-gray-200 font-medium">
                    Current Monthly Views
                    <span className="text-gray-400 text-sm ml-2">(Find in YouTube Analytics)</span>
                  </Label>
                  <Input
                    id="currentViews"
                    type="number"
                    placeholder="e.g. 50000"
                    value={currentViews}
                    onChange={(e) => setCurrentViews(e.target.value)}
                    className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="currentCPM" className="text-gray-200 font-medium">
                    Current Average CPM ($)
                    <span className="text-gray-400 text-sm ml-2">(Typical range: $2-$15)</span>
                  </Label>
                  <Input
                    id="currentCPM"
                    type="number"
                    step="0.01"
                    placeholder="e.g. 6.00"
                    value={currentCPM}
                    onChange={(e) => setCurrentCPM(e.target.value)}
                    className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="targetGrowth" className="text-gray-200 font-medium">
                    Target Growth Percentage (%)
                    <span className="text-gray-400 text-sm ml-2">(Our avg: 180%)</span>
                  </Label>
                  <Input
                    id="targetGrowth"
                    type="number"
                    placeholder="e.g. 180"
                    value={targetGrowth}
                    onChange={(e) => setTargetGrowth(e.target.value)}
                    className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div>
                  <Label htmlFor="vidpacePackage" className="text-gray-200 font-medium">VidPace Package</Label>
                  <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                    <SelectTrigger className="mt-2 bg-gray-800 border-gray-600 text-white focus:border-red-500 focus:ring-red-500">
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600 text-white">
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
                              <div className="text-sm text-gray-400">${pkg.price}/month • Avg {pkg.avgGrowth}% growth</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Success Stories */}
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-sm font-semibold text-gray-200 mb-3">Recent Success Stories</h3>
                <div className="space-y-2">
                  {successStories.map((story, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs bg-gray-800/50 p-2 rounded border border-gray-700">
                      <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-300"><strong className="text-white">{story.name}</strong> ({story.niche}): {story.growth} in {story.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-2xl bg-gray-900/95 backdrop-blur-sm border border-gray-700">
            <CardHeader className="bg-gradient-to-r from-black to-red-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-6 w-6" />
                Your Growth Potential
              </CardTitle>
              <CardDescription className="text-gray-300">
                See how VidPace can transform your YouTube revenue
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {showResults && results ? (
                <div className="space-y-6">
                  {/* Revenue Comparison Chart */}
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                      Revenue Comparison
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getComparisonData()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="name" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatCurrency(value)} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              color: '#F3F4F6'
                            }}
                            formatter={(value) => [formatCurrency(value), '']}
                          />
                          <Bar dataKey="Current" fill="#6B7280" name="Current Revenue" />
                          <Bar dataKey="With VidPace" fill="#DC2626" name="With VidPace" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Quick Results - Always Visible */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <p className="text-sm text-gray-400 mb-1">Current Monthly Revenue</p>
                      <p className="text-2xl font-bold text-white">{formatCurrency(results.currentMonthlyRevenue)}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-lg border border-red-600/50">
                      <p className="text-sm text-red-300 mb-1">Potential Monthly Revenue</p>
                      <p className="text-2xl font-bold text-red-400">{formatCurrency(results.projectedMonthlyRevenue)}</p>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-blue-600/20 to-gray-700/20 rounded-lg border border-blue-500/50">
                    <p className="text-sm text-blue-300 mb-1">Extra Revenue Per Month</p>
                    <p className="text-3xl font-bold text-blue-400">{formatCurrency(results.monthlyUplift)}</p>
                    <p className="text-sm text-blue-300 mt-1">
                      ROI: {results.roi.toFixed(0)}% • Payback: {results.paybackPeriod.toFixed(1)} months
                    </p>
                  </div>

                  {/* Email Capture Gate */}
                  {!showFullResults && (
                    <div className="bg-gradient-to-r from-red-600 to-black text-white p-6 rounded-lg border border-red-600/50">
                      <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Get Your Complete Growth Analysis
                      </h3>
                      <p className="mb-4 text-gray-200 text-center">
                        See detailed projections, risk analysis, and your personalized growth roadmap
                      </p>
                      <div className="flex gap-2 max-w-md mx-auto">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white text-gray-900 border-0"
                          disabled={emailSending}
                        />
                        <Button
                          onClick={handleEmailSubmit}
                          disabled={!email || emailSending}
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold whitespace-nowrap disabled:opacity-50"
                        >
                          {emailSending ? 'Sending...' : 'Get Analysis'}
                        </Button>
                      </div>
                      <p className="text-xs mt-2 text-gray-300 text-center">Free • No spam • Instant access</p>
                    </div>
                  )}

                  {/* Full Results - After Email */}
                  {showFullResults && (
                    <>
                      {/* Growth Projection Chart */}
                      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Rocket className="h-5 w-5 text-blue-400" />
                          6-Month Growth Projection
                        </h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={getChartData()}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                              <XAxis dataKey="month" stroke="#9CA3AF" />
                              <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatCurrency(value)} />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: '#1F2937', 
                                  border: '1px solid #374151',
                                  color: '#F3F4F6'
                                }}
                                formatter={(value) => [formatCurrency(value), '']}
                              />
                              <Legend />
                              <Line type="monotone" dataKey="Current Revenue" stroke="#6B7280" strokeWidth={2} strokeDasharray="5 5" />
                              <Line type="monotone" dataKey="With VidPace" stroke="#DC2626" strokeWidth={3} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Scenario Analysis */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-white">Scenario Analysis</h3>
                        <div className="grid grid-cols-3 gap-2 text-center text-sm">
                          <div className="p-3 bg-gray-700/50 rounded border border-gray-600">
                            <p className="text-gray-300 font-medium">Conservative</p>
                            <p className="text-gray-200 font-bold">{formatCurrency(results.conservativeUplift)}/mo</p>
                          </div>
                          <div className="p-3 bg-blue-600/20 rounded border border-blue-500">
                            <p className="text-blue-300 font-medium">Expected</p>
                            <p className="text-blue-200 font-bold">{formatCurrency(results.monthlyUplift)}/mo</p>
                          </div>
                          <div className="p-3 bg-red-600/20 rounded border border-red-500">
                            <p className="text-red-300 font-medium">Aggressive</p>
                            <p className="text-red-200 font-bold">{formatCurrency(results.aggressiveUplift)}/mo</p>
                          </div>
                        </div>
                      </div>

                      {/* Key Insights */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-white">Key Insights</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-400" />
                            <span className="text-gray-300">Your CPM could improve from ${results.projectedMonthlyRevenue > 0 ? (results.currentMonthlyRevenue / (parseFloat(currentViews) / 1000)).toFixed(2) : '0'} to ${results.improvedCPM.toFixed(2)} with better content</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-400" />
                            <span className="text-gray-300">Break-even after {results.paybackPeriod.toFixed(1)} months</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-400" />
                            <span className="text-gray-300">Annual ROI potential: {formatCurrency(results.annualUplift)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Competitive Urgency */}
                      <div className="p-4 bg-red-900/20 border border-red-600/50 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-red-300 text-sm">Competitive Risk</p>
                            <p className="text-red-200 text-xs mt-1">
                              Every month you wait, competitors using automation gain {formatCurrency(results.monthlyUplift * 0.1)} more advantage over you.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Success Confirmation */}
                      {emailSent && (
                        <div className="p-4 bg-blue-900/20 border border-blue-500/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-blue-400" />
                            <div>
                              <p className="font-semibold text-blue-300 text-sm">Analysis Sent!</p>
                              <p className="text-blue-200 text-xs mt-1">
                                Check your email for your complete growth analysis and next steps.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    {showFullResults && (
                      <>
                        <Button className="w-full bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900 text-white py-4 text-lg font-semibold shadow-lg border border-red-600/50">
                          <Calendar className="h-5 w-5 mr-2" />
                          Book Free Strategy Call
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full border-2 border-gray-600 text-gray-200 hover:bg-gray-800 hover:border-red-500 py-4 text-lg font-semibold bg-gray-900/50"
                        >
                          Start Growing with VidPace
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Enter your YouTube metrics to see your growth potential</p>
                  <p className="text-gray-500 text-sm mt-2">Fill in all fields above to calculate your ROI</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
