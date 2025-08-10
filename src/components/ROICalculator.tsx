import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, DollarSign, Youtube, Crown, Zap, Star, Rocket } from 'lucide-react'

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    price: 400,
    description: 'From 0 → 10K subscribers: Launch & Position',
    badge: 'Most Popular',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 'viral',
    name: 'Viral',
    price: 250,
    description: 'Short-form content focus: Maximize Reach',
    badge: 'Trending',
    badgeColor: 'bg-green-500'
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 600,
    description: 'From 10K → 50K subscribers: Build & Expand',
    badge: 'Best Value',
    badgeColor: 'bg-orange-500'
  },
  {
    id: 'pro',
    name: 'Pro (Full Automation)',
    price: 1200,
    description: 'From 50K → 100K+ subscribers: Lead & Monetize',
    badge: 'Celebrity',
    badgeColor: 'bg-purple-500'
  }
]

export const ROICalculator = () => {
  // Input states
  const [currentViews, setCurrentViews] = useState('')
  const [currentCPM, setCurrentCPM] = useState('')
  const [targetGrowth, setTargetGrowth] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('')
  
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

  // Get selected package details
  const getSelectedPackageDetails = () => {
    return packages.find(pkg => pkg.id === selectedPackage)
  }

  // Calculate results whenever inputs change
  useEffect(() => {
    if (currentViews && currentCPM && targetGrowth && selectedPackage) {
      calculateROI()
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

    // Projected views after growth
    const projectedViews = views * (1 + growth / 100)
    
    // Projected ad revenue
    const projectedAdRevenue = (projectedViews / 1000) * cpm

    // Additional revenue streams
    let currentAdditionalRevenue = 0
    let projectedAdditionalRevenue = 0

    if (hasSponsorship && sponsorshipValue && sponsorshipCount) {
      const sponsorRevenue = parseFloat(sponsorshipValue) * parseFloat(sponsorshipCount)
      currentAdditionalRevenue += sponsorRevenue
      projectedAdditionalRevenue += sponsorRevenue * (1 + growth / 100)
    }

    if (hasAffiliate && affiliateValue && affiliateCount) {
      const affiliateRevenue = parseFloat(affiliateValue) * parseFloat(affiliateCount)
      currentAdditionalRevenue += affiliateRevenue
      projectedAdditionalRevenue += affiliateRevenue * (1 + growth / 100)
    }

    if (hasProduct && productValue && productCount) {
      const productRevenue = parseFloat(productValue) * parseFloat(productCount)
      currentAdditionalRevenue += productRevenue
      projectedAdditionalRevenue += productRevenue * (1 + growth / 100)
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

    setResults({
      currentMonthlyRevenue: currentTotalRevenue,
      projectedMonthlyRevenue: projectedTotalRevenue,
      monthlyUplift,
      annualUplift,
      roi,
      projectedViews,
      packageDetails
    })
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Youtube className="h-12 w-12 text-red-500" />
            <h1 className="text-5xl font-bold text-white">YouTube Growth ROI Calculator</h1>
          </div>
          <p className="text-xl text-purple-100">Calculate your potential revenue growth with Vidpace</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
            <Rocket className="h-5 w-5 text-red-400" />
            <span className="text-white font-medium">Automate Your Content Creation</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border-0">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calculator className="h-6 w-6" />
                Your Current YouTube Metrics
              </CardTitle>
              <CardDescription className="text-purple-100">
                Enter your current YouTube channel performance data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Basic Metrics */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentViews" className="text-gray-700 font-medium">Current Monthly Views</Label>
                  <Input
                    id="currentViews"
                    type="number"
                    placeholder="e.g. 50000"
                    value={currentViews}
                    onChange={(e) => setCurrentViews(e.target.value)}
                    className="mt-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="currentCPM" className="text-gray-700 font-medium">Current Average CPM ($)</Label>
                  <Input
                    id="currentCPM"
                    type="number"
                    step="0.01"
                    placeholder="e.g. 6.00"
                    value={currentCPM}
                    onChange={(e) => setCurrentCPM(e.target.value)}
                    className="mt-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="targetGrowth" className="text-gray-700 font-medium">Target Growth Percentage (%)</Label>
                  <Input
                    id="targetGrowth"
                    type="number"
                    placeholder="e.g. 100"
                    value={targetGrowth}
                    onChange={(e) => setTargetGrowth(e.target.value)}
                    className="mt-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <Label htmlFor="vidpacePackage" className="text-gray-700 font-medium">Vidpace Package</Label>
                  <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                    <SelectTrigger className="mt-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent>
                      {packages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id}>
                          <div className="flex items-center gap-3">
                            {getPackageIcon(pkg.id)}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{pkg.name}</span>
                                <span className={`text-xs px-2 py-1 rounded-full text-white ${pkg.badgeColor}`}>
                                  {pkg.badge}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600">${pkg.price}/month</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Revenue Sources */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800">Additional Revenue Sources</h3>
                
                {/* Sponsorships */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sponsorship"
                      checked={hasSponsorship}
                      onCheckedChange={(checked) => setHasSponsorship(checked === true)}
                      className="border-purple-300 data-[state=checked]:bg-purple-600"
                    />
                    <Label htmlFor="sponsorship" className="text-gray-700 font-medium">Sponsorships</Label>
                  </div>
                  {hasSponsorship && (
                    <div className="grid grid-cols-2 gap-3 ml-6">
                      <Input
                        placeholder="Deals per month"
                        type="number"
                        value={sponsorshipCount}
                        onChange={(e) => setSponsorshipCount(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                      <Input
                        placeholder="Average deal value ($)"
                        type="number"
                        value={sponsorshipValue}
                        onChange={(e) => setSponsorshipValue(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
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
                      className="border-purple-300 data-[state=checked]:bg-purple-600"
                    />
                    <Label htmlFor="affiliate" className="text-gray-700 font-medium">Affiliate Sales</Label>
                  </div>
                  {hasAffiliate && (
                    <div className="grid grid-cols-2 gap-3 ml-6">
                      <Input
                        placeholder="Sales per month"
                        type="number"
                        value={affiliateCount}
                        onChange={(e) => setAffiliateCount(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                      <Input
                        placeholder="Average commission ($)"
                        type="number"
                        value={affiliateValue}
                        onChange={(e) => setAffiliateValue(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
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
                      className="border-purple-300 data-[state=checked]:bg-purple-600"
                    />
                    <Label htmlFor="product" className="text-gray-700 font-medium">Product/Service Sales</Label>
                  </div>
                  {hasProduct && (
                    <div className="grid grid-cols-2 gap-3 ml-6">
                      <Input
                        placeholder="Sales per month"
                        type="number"
                        value={productCount}
                        onChange={(e) => setProductCount(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                      <Input
                        placeholder="Average profit ($)"
                        type="number"
                        value={productValue}
                        onChange={(e) => setProductValue(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border-0">
            <CardHeader className="bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-6 w-6" />
                Your Growth Potential
              </CardTitle>
              <CardDescription className="text-pink-100">
                See how Vidpace can transform your YouTube revenue
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {results ? (
                <div className="space-y-6">
                  {/* Selected Package Display */}
                  {results.packageDetails && (
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-3 mb-2">
                        {getPackageIcon(results.packageDetails.id)}
                        <h3 className="font-semibold text-gray-800">{results.packageDetails.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full text-white ${results.packageDetails.badgeColor}`}>
                          {results.packageDetails.badge}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{results.packageDetails.description}</p>
                      <p className="text-lg font-bold text-purple-700">${results.packageDetails.price}/month</p>
                    </div>
                  )}

                  {/* Current vs Projected */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg border">
                      <p className="text-sm text-gray-600 mb-1">Current Monthly Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(results.currentMonthlyRevenue)}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700 mb-1">Projected Monthly Revenue</p>
                      <p className="text-2xl font-bold text-green-800">{formatCurrency(results.projectedMonthlyRevenue)}</p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="text-sm text-blue-700 font-medium">Extra Monthly Revenue</p>
                        <p className="text-xl font-bold text-blue-800">{formatCurrency(results.monthlyUplift)}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-blue-600" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                      <div>
                        <p className="text-sm text-purple-700 font-medium">Extra Annual Revenue</p>
                        <p className="text-xl font-bold text-purple-800">{formatCurrency(results.annualUplift)}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                      <div>
                        <p className="text-sm text-orange-700 font-medium">ROI vs Vidpace Cost</p>
                        <p className="text-xl font-bold text-orange-800">{results.roi.toFixed(0)}%</p>
                      </div>
                      <Calculator className="h-8 w-8 text-orange-600" />
                    </div>
                  </div>

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
                  </div>

                  {/* CTA */}
                  <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-4 text-lg font-semibold shadow-lg">
                    Start Growing with Vidpace
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Enter your YouTube metrics to see your growth potential</p>
                  <p className="text-gray-400 text-sm mt-2">Fill in all fields above to calculate your ROI</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-purple-100">
          <p className="text-lg">© 2024 Vidpace. Put Your Content On Autopilot.</p>
          <p className="text-sm opacity-75 mt-2">Grow your YouTube channel with data-driven strategies.</p>
        </div>
      </div>
    </div>
  )
}