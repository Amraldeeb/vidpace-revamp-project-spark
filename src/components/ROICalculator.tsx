import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, DollarSign, Youtube, Crown, Zap, Star, Rocket, Clock, Users, CheckCircle, AlertCircle, Mail, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import emailjs from '@emailjs/browser';

export const ROICalculator = () => {
  const EMAILJS_SERVICE_ID = 'service_9g1l3ap'; // Replace with your EmailJS service ID
  const EMAILJS_TEMPLATE_ID = 'template_xmx9gqr'; // Replace with your EmailJS template ID
  const EMAILJS_PUBLIC_KEY = 'oGiTlm62hWPMpKBa9'; // Replace with your EmailJS public key

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
  ];

  const industryPresets = [
    { name: 'Gaming', views: 75000, cpm: 4.50, growth: 180 },
    { name: 'Tech Reviews', views: 45000, cpm: 8.20, growth: 120 },
    { name: 'Lifestyle/Vlog', views: 35000, cpm: 6.80, growth: 150 },
    { name: 'Education', views: 25000, cpm: 12.00, growth: 100 },
    { name: 'Finance', views: 20000, cpm: 15.50, growth: 90 }
  ];

  const successStories = [
    { name: "Sarah M.", niche: "Lifestyle", growth: "10K → 85K", time: "8 months", package: "Growth" },
    { name: "Mike T.", niche: "Tech", growth: "5K → 120K", time: "12 months", package: "Pro" },
    { name: "Lisa K.", niche: "Finance", growth: "0 → 45K", time: "6 months", package: "Starter" }
  ];

  // Input states
  const [currentViews, setCurrentViews] = useState('');
  const [currentCPM, setCurrentCPM] = useState('');
  const [targetGrowth, setTargetGrowth] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');
  
  // Lead capture states
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [showFullResults, setShowFullResults] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  // Additional revenue sources
  const [hasSponsorship, setHasSponsorship] = useState(false);
  const [sponsorshipValue, setSponsorshipValue] = useState('');
  const [sponsorshipCount, setSponsorshipCount] = useState('');
  
  const [hasAffiliate, setHasAffiliate] = useState(false);
  const [affiliateValue, setAffiliateValue] = useState('');
  const [affiliateCount, setAffiliateCount] = useState('');
  
  const [hasProduct, setHasProduct] = useState(false);
  const [productValue, setProductValue] = useState('');
  const [productCount, setProductCount] = useState('');
  
  // Calculated results
  const [results, setResults] = useState(null);
  const [urgencyTimer, setUrgencyTimer] = useState(15 * 60); // 15 minutes

  // Initialize EmailJS
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY !== 'oGiTlm62hWPMpKBa9') {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  // Urgency timer
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Apply industry preset
  const applyPreset = (preset) => {
    setCurrentViews(preset.views.toString());
    setCurrentCPM(preset.cpm.toString());
    setTargetGrowth(preset.growth.toString());
    setSelectedPreset(preset.name);
  };

  // Get selected package details
  const getSelectedPackageDetails = () => {
    return packages.find(pkg => pkg.id === selectedPackage);
  };

  // Calculate results whenever inputs change
  useEffect(() => {
    if (currentViews && currentCPM && targetGrowth && selectedPackage) {
      calculateROI();
      setShowResults(true);
    }
  }, [currentViews, currentCPM, targetGrowth, selectedPackage, hasSponsorship, sponsorshipValue, sponsorshipCount, hasAffiliate, affiliateValue, affiliateCount, hasProduct, productValue, productCount]);

  const calculateROI = () => {
    const views = parseFloat(currentViews) || 0;
    const cpm = parseFloat(currentCPM) || 0;
    const growth = parseFloat(targetGrowth) || 0;
    const packageDetails = getSelectedPackageDetails();
    const cost = packageDetails ? packageDetails.price : 0;

    // Current ad revenue
    const currentAdRevenue = (views / 1000) * cpm;

    // More realistic growth calculation (diminishing returns)
    const realGrowthMultiplier = 1 + (growth / 100) * 0.8; // 20% discount for realism
    const projectedViews = views * realGrowthMultiplier;
    
    // Projected ad revenue with slight CPM improvement
    const improvedCPM = cpm * 1.1; // 10% CPM improvement from better content
    const projectedAdRevenue = (projectedViews / 1000) * improvedCPM;

    // Additional revenue streams
    let currentAdditionalRevenue = 0;
    let projectedAdditionalRevenue = 0;

    if (hasSponsorship && sponsorshipValue && sponsorshipCount) {
      const sponsorRevenue = parseFloat(sponsorshipValue) * parseFloat(sponsorshipCount);
      currentAdditionalRevenue += sponsorRevenue;
      projectedAdditionalRevenue += sponsorRevenue * realGrowthMultiplier;
    }

    if (hasAffiliate && affiliateValue && affiliateCount) {
      const affiliateRevenue = parseFloat(affiliateValue) * parseFloat(affiliateCount);
      currentAdditionalRevenue += affiliateRevenue;
      projectedAdditionalRevenue += affiliateRevenue * realGrowthMultiplier;
    }

    if (hasProduct && productValue && productCount) {
      const productRevenue = parseFloat(productValue) * parseFloat(productCount);
      currentAdditionalRevenue += productRevenue;
      projectedAdditionalRevenue += productRevenue * realGrowthMultiplier;
    }

    // Total revenues
    const currentTotalRevenue = currentAdRevenue + currentAdditionalRevenue;
    const projectedTotalRevenue = projectedAdRevenue + projectedAdditionalRevenue;
    
    // Monthly uplift
    const monthlyUplift = projectedTotalRevenue - currentTotalRevenue;
    
    // Annual uplift
    const annualUplift = monthlyUplift * 12;
    
    // ROI calculation
    const roi = cost > 0 ? (monthlyUplift / cost) * 100 : 0;
    
    // Payback period (months)
    const paybackPeriod = cost > 0 ? cost / monthlyUplift : 0;

    // Conservative and aggressive scenarios
    const conservativeUplift = monthlyUplift * 0.6;
    const aggressiveUplift = monthlyUplift * 1.4;

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
    });
  };

  const handleEmailSubmit = async () => {
    if (!email || emailSending) return;

    setEmailSending(true);

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
      };

      // Check if EmailJS is configured
      if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
        console.log('EmailJS not configured. Template params would be:', templateParams);
        alert('EmailJS not configured yet. Check console for template data.');
        setShowFullResults(true);
        setEmailSent(true);
      } else {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams
        );
        
        setEmailSent(true);
        setShowFullResults(true);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email. Please try again.');
    } finally {
      setEmailSending(false);
    }
  };

  // Generate chart data
  const getChartData = () => {
    if (!results) return [];
    
    const months = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'];
    return months.map((month, index) => ({
      month,
      'Current Revenue': results.currentMonthlyRevenue,
      'With VidPace': results.currentMonthlyRevenue + (results.monthlyUplift * (index + 1) / 6)
    }));
  };

  // Generate comparison data for bar chart
  const getComparisonData = () => {
    if (!results) return [];
    
    return [
      {
        name: 'Monthly Revenue',
        Current: results.currentMonthlyRevenue,
        'With VidPace': results.projectedMonthlyRevenue
      }
    ];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getPackageIcon = (packageId) => {
    switch (packageId) {
      case 'starter': return <Star className="h-5 w-5" />;
      case 'viral': return <Zap className="h-5 w-5" />;
      case 'growth': return <TrendingUp className="h-5 w-5" />;
      case 'pro': return <Crown className="h-5 w-5" />;
      default: return <Calculator className="h-5 w-5" />;
    }
  };

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
                  <Label htmlFor="vidpacePackage" className="text-gray-200 font-medium">
                    VidPace Package
                  </Label>
                  <Select
                    value={selectedPackage}
                    onValueChange={(value) => setSelectedPackage(value)}
                  >
                    <SelectTrigger className="w-full mt-2 bg-gray-800 border-gray-600 text-white focus:ring-red-500">
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600 text-white">
                      {packages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id} className="hover:bg-gray-700 focus:bg-gray-700">
                          <div className="flex items-center gap-2">
                            {getPackageIcon(pkg.id)}
                            <div>
                              <div className="font-semibold flex items-center gap-2">
                                {pkg.name}
                                <span className={`text-xs px-2 py-0.5 rounded-full ${pkg.badgeColor}`}>
                                  {pkg.badge}
                                </span>
                              </div>
                              <div className="text-gray-400 text-sm">
                                {formatCurrency(pkg.price)}/month • Avg {pkg.avgGrowth}% growth
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Revenue Streams */}
              <div className="space-y-4 border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  Additional Revenue Streams (Optional)
                </h3>
                <p className="text-gray-400 text-sm">Include other income sources for a more comprehensive ROI</p>

                {/* Sponsorships */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasSponsorship"
                    checked={hasSponsorship}
                    onCheckedChange={setHasSponsorship}
                    className="border-gray-500 data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
                  />
                  <Label htmlFor="hasSponsorship" className="text-gray-300">Sponsorships</Label>
                </div>
                {hasSponsorship && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sponsorshipValue" className="text-gray-200">Avg. Value per Sponsorship ($)</Label>
                      <Input
                        id="sponsorshipValue"
                        type="number"
                        step="0.01"
                        placeholder="e.g. 500"
                        value={sponsorshipValue}
                        onChange={(e) => setSponsorshipValue(e.target.value)}
                        className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sponsorshipCount" className="text-gray-200">Sponsorships per Month</Label>
                      <Input
                        id="sponsorshipCount"
                        type="number"
                        placeholder="e.g. 2"
                        value={sponsorshipCount}
                        onChange={(e) => setSponsorshipCount(e.target.value)}
                        className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>
                )}

                {/* Affiliate Marketing */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasAffiliate"
                    checked={hasAffiliate}
                    onCheckedChange={setHasAffiliate}
                    className="border-gray-500 data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
                  />
                  <Label htmlFor="hasAffiliate" className="text-gray-300">Affiliate Marketing</Label>
                </div>
                {hasAffiliate && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="affiliateValue" className="text-gray-200">Avg. Value per Sale ($)</Label>
                      <Input
                        id="affiliateValue"
                        type="number"
                        step="0.01"
                        placeholder="e.g. 50"
                        value={affiliateValue}
                        onChange={(e) => setAffiliateValue(e.target.value)}
                        className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="affiliateCount" className="text-gray-200">Sales per Month</Label>
                      <Input
                        id="affiliateCount"
                        type="number"
                        placeholder="e.g. 10"
                        value={affiliateCount}
                        onChange={(e) => setAffiliateCount(e.target.value)}
                        className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>
                )}

                {/* Product Sales */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasProduct"
                    checked={hasProduct}
                    onCheckedChange={setHasProduct}
                    className="border-gray-500 data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
                  />
                  <Label htmlFor="hasProduct" className="text-gray-300">Product Sales</Label>
                </div>
                {hasProduct && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productValue" className="text-gray-200">Avg. Value per Product ($)</Label>
                      <Input
                        id="productValue"
                        type="number"
                        step="0.01"
                        placeholder="e.g. 100"
                        value={productValue}
                        onChange={(e) => setProductValue(e.target.value)}
                        className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productCount" className="text-gray-200">Products Sold per Month</Label>
                      <Input
                        id="productCount"
                        type="number"
                        placeholder="e.g. 5"
                        value={productCount}
                        onChange={(e) => setProductCount(e.target.value)}
                        className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-2xl bg-gray-900/95 backdrop-blur-sm border border-gray-700">
            <CardHeader className="bg-gradient-to-r from-red-600 to-black text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-6 w-6" />
                Your Growth Potential
              </CardTitle>
              <CardDescription className="text-gray-300">
                See how VidPace can transform your YouTube revenue
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {!showResults ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-400 text-center">
                  <Calculator className="h-20 w-20 mb-4" />
                  <p className="text-lg">Enter your YouTube metrics to see your growth potential</p>
                  <p className="text-sm">Fill in all fields above to calculate your ROI</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Revenue Comparison Bar Chart */}
                  <div className="">
                    <h3 className="text-lg font-semibold text-white mb-4">Revenue Comparison</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={getComparisonData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" tickFormatter={(value) => `$${value}`} />
                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                        <Legend />
                        <Bar dataKey="Current" fill="#6b7280" />
                        <Bar dataKey="With VidPace" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="flex justify-around text-center mt-4">
                      <div>
                        <p className="text-gray-400 text-sm">Current Monthly Revenue</p>
                        <p className="text-white text-2xl font-bold">{formatCurrency(results?.currentMonthlyRevenue || 0)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Potential Monthly Revenue</p>
                        <p className="text-red-500 text-2xl font-bold">{formatCurrency(results?.projectedMonthlyRevenue || 0)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                    <Card className="bg-gray-800/80 border border-gray-700 p-4">
                      <CardDescription className="text-gray-400">Extra Revenue Per Month</CardDescription>
                      <CardTitle className="text-green-400 text-3xl font-bold mt-2">{formatCurrency(results?.monthlyUplift || 0)}</CardTitle>
                      <p className="text-gray-400 text-sm mt-1">
                        ROI: {results?.roi?.toFixed(0) || 0}% • Payback: {results?.paybackPeriod?.toFixed(1) || 0} months
                      </p>
                    </Card>
                    <Card className="bg-gray-800/80 border border-gray-700 p-4">
                      <CardDescription className="text-gray-400">Projected Views Per Month</CardDescription>
                      <CardTitle className="text-blue-400 text-3xl font-bold mt-2">{formatNumber(results?.projectedViews || 0)}</CardTitle>
                      <p className="text-gray-400 text-sm mt-1">
                        ({formatNumber((results?.projectedViews || 0) - (parseFloat(currentViews) || 0))} increase)
                      </p>
                    </Card>
                  </div>

                  {/* 6-Month Growth Projection Line Chart */}
                  <div className="">
                    <h3 className="text-lg font-semibold text-white mb-4">6-Month Growth Projection</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={getChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                        <XAxis dataKey="month" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" tickFormatter={(value) => `$${value}`} />
                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                        <Legend />
                        <Line type="monotone" dataKey="Current Revenue" stroke="#6b7280" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="With VidPace" stroke="#ef4444" />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 text-sm text-gray-400 mt-2">
                      <span><span className="inline-block w-3 h-3 bg-gray-500 rounded-full mr-1"></span>Current Revenue</span>
                      <span><span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>With VidPace</span>
                    </div>
                  </div>

                  {/* Scenario Analysis */}
                  <div className="">
                    <h3 className="text-lg font-semibold text-white mb-4">Scenario Analysis</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        className={`py-6 text-lg font-bold border-gray-700 ${results?.monthlyUplift === results?.conservativeUplift ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-gray-800/80 text-white hover:bg-gray-700'}`}
                        onClick={() => setResults(prev => prev ? { ...prev, monthlyUplift: prev.conservativeUplift } : null)}
                      >
                        Conservative  
{formatCurrency(results?.conservativeUplift || 0)}/mo
                      </Button>
                      <Button
                        variant="outline"
                        className={`py-6 text-lg font-bold border-gray-700 ${results?.monthlyUplift === (results?.projectedMonthlyRevenue - results?.currentMonthlyRevenue) ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-gray-800/80 text-white hover:bg-gray-700'}`}
                        onClick={() => setResults(prev => prev ? { ...prev, monthlyUplift: prev.projectedMonthlyRevenue - prev.currentMonthlyRevenue } : null)}
                      >
                        Expected  
{formatCurrency(results?.monthlyUplift || 0)}/mo
                      </Button>
                      <Button
                        variant="outline"
                        className={`py-6 text-lg font-bold border-gray-700 ${results?.monthlyUplift === results?.aggressiveUplift ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-gray-800/80 text-white hover:bg-gray-700'}`}
                        onClick={() => setResults(prev => prev ? { ...prev, monthlyUplift: prev.aggressiveUplift } : null)}
                      >
                        Aggressive  
{formatCurrency(results?.aggressiveUplift || 0)}/mo
                      </Button>
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      Key Insights
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Your CPM could improve from {formatCurrency(parseFloat(currentCPM) || 0)} to {formatCurrency(results?.improvedCPM || 0)} with better content</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Break-even after {results?.paybackPeriod?.toFixed(1) || 0} months</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Annual ROI potential: {formatCurrency(results?.annualUplift || 0)}</li>
                    </ul>
                  </div>

                  {/* Competitive Risk */}
                  <div className="bg-gray-800/80 border border-gray-700 p-4 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-yellow-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">Competitive Risk</h3>
                      <p className="text-gray-400 text-sm">Every month you wait, competitors using automation gain {formatCurrency(51)} more advantage over you. Don't fall behind.</p>
                    </div>
                  </div>

                  {/* Lead Capture Form */}
                  {!showFullResults && (
                    <Card className="shadow-lg bg-gradient-to-r from-red-700 to-red-900 text-white border-none">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Mail className="h-6 w-6" />
                          Get Your Complete Growth Analysis
                        </CardTitle>
                        <CardDescription className="text-red-200">
                          See detailed projections, risk analysis, and your personalized growth roadmap
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col md:flex-row gap-4">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-grow bg-red-800 border-red-600 text-white placeholder-red-300 focus:border-white focus:ring-white"
                        />
                        <Button
                          onClick={handleEmailSubmit}
                          disabled={emailSending}
                          className="bg-white text-red-700 hover:bg-gray-100 font-bold py-2 px-4 rounded"
                        >
                          {emailSending ? 'Sending...' : 'Get Analysis'}
                        </Button>
                      </CardContent>
                      <p className="text-center text-red-200 text-xs mb-4">Free • No spam • Instant access</p>
                    </Card>
                  )}

                  {emailSent && (
                    <div className="bg-green-600 text-white p-4 rounded-lg text-center">
                      <p className="font-semibold">Thank you! Your full growth analysis has been sent to your email.</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Success Stories */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">What Our Creators Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 p-6 shadow-lg">
                <p className="text-gray-300 italic mb-4">"VidPace transformed my channel completely! Their content strategy helped me grow from {story.growth} subscribers in just {story.time}. The team is incredibly professional and understands the YouTube algorithm perfectly."</p>
                <p className="font-semibold text-white">{story.name}</p>
                <p className="text-gray-400 text-sm">{story.niche} Content Creator</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-300 mb-8">Let's discuss how we can help automate your content creation and scale your channel</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Button variant="outline" className="bg-gray-800/80 border-gray-700 text-white py-6 px-8 text-lg hover:bg-gray-700">
              <Calendar className="h-6 w-6 mr-3" />
              Schedule A Call
            </Button>
            <Button variant="outline" className="bg-gray-800/80 border-gray-700 text-white py-6 px-8 text-lg hover:bg-gray-700">
              <Mail className="h-6 w-6 mr-3" />
              Send Us a Message
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
