// Single source for prices, plans, terms and FAQs. Edit here; every page reads from this file.

export const site = {
  name: "VidPace",
  url: "https://vidpace.com",
  tagline: "You make the videos. We run the channel.",
  description:
    "VidPace is a YouTube post-production and channel management team. We edit, design thumbnails, write titles and descriptions, and post on schedule for creators, podcasters, coaches and real estate agents.",
  calendly: "https://calendly.com/vidpace/zoom-meeting",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/vidpace" },
    { label: "TikTok", href: "https://www.tiktok.com/@vidpace" },
    { label: "X", href: "https://x.com/Vidpace" },
  ],
  // Business terms shown on the site. Confirm before launch.
  terms: {
    firstEdit: "First edit in 72 hours",
    contract: "Month to month",
    ownership: "You own every file",
    revisions: "Unlimited revisions on every video",
    guarantee:
      "If you're not happy with your first edits within 14 days, we refund the month and you keep the videos.",
  },
  // EmailJS (public browser key by design). Templates receive from_name, from_email, message.
  emailjs: {
    service: "service_9g1l3ap",
    template: "template_qpwkovw",
    publicKey: "oGiTlm62hWPMpKBa9",
  },
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  for: string;
  summary: string;
  features: string[];
  tag?: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "shorts",
    name: "Shorts Sprint",
    price: 350,
    for: "Try us with no long-form commitment",
    summary: "We cut your existing long videos or podcast into Shorts and post them.",
    features: [
      "12 Shorts per month",
      "Hooks, captions and on-screen text",
      "Posted to YouTube Shorts on schedule",
      "Upgrade to Starter any month",
    ],
    tag: "Entry",
  },
  {
    id: "starter",
    name: "Starter",
    price: 900,
    for: "0 to 10K subscribers",
    summary: "You record. We edit, package and post every video.",
    features: [
      "4 long-form videos per month",
      "4 Shorts per month",
      "Thumbnails with 2 options each",
      "Search-led titles and descriptions",
      "Channel banner, intro and outro",
      "Monthly report with next steps",
    ],
    tag: "Most popular",
    featured: true,
  },
  {
    id: "autopilot",
    name: "Autopilot",
    price: 1800,
    for: "Faceless channels",
    summary: "We research, script, narrate, edit and post. You approve topics.",
    features: [
      "12 long-form videos per month",
      "8 Shorts per month",
      "Original scripts, researched per video",
      "Professional or licensed AI narration",
      "Human-edited, policy-safe content",
      "Monthly performance report",
    ],
    tag: "Faceless",
  },
  {
    id: "growth",
    name: "Growth",
    price: 2800,
    for: "10K to 50K subscribers",
    summary: "More volume, sharper packaging and a strategy call every two weeks.",
    features: [
      "8 long-form videos per month",
      "10 Shorts per month",
      "Thumbnail A/B testing",
      "Consistent editing style for your brand",
      "Comment and community management",
      "Bi-weekly strategy call",
    ],
    tag: "Scale",
  },
  {
    id: "elite",
    name: "Elite",
    price: 5000,
    for: "50K subscribers and up",
    summary: "A full team and account manager running every part of the channel.",
    features: [
      "16+ long-form videos per month",
      "12+ Shorts per month",
      "Custom thumbnail and brand system",
      "Content direction and storytelling",
      "Dedicated account manager",
      "Sponsorship and brand-deal support",
      "Weekly planning session",
    ],
    tag: "Full team",
  },
];

export const faqs = [
  {
    q: "How do I send you footage?",
    a: "Upload raw files to a shared Google Drive folder we set up at kickoff. Any size works. Finished edits, thumbnails and titles come back to the same folder.",
  },
  {
    q: "Who owns the videos and the channel?",
    a: "You do. The channel, the project files and every thumbnail stay yours, including if you stop working with us.",
  },
  {
    q: "How fast do I get edits back?",
    a: "The first cut of each long-form video arrives within 72 hours of upload. Shorts arrive in batches each week. Revisions are unlimited until you're happy with the video.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Plans are month to month. Tell us before your next billing date and we stop there.",
  },
  {
    q: "Do you guarantee subscribers or views?",
    a: "No honest agency can. We guarantee the work: output, schedule and quality. We report results every month and change what isn't working.",
  },
  {
    q: "Do you film, run ads or manage other social platforms?",
    a: "No. We focus on YouTube post-production and organic channel growth. Shorts we make can be reposted to Instagram and TikTok.",
  },
  {
    q: "Are faceless channels allowed to earn money on YouTube?",
    a: "Yes, when the content is original and adds value. YouTube does not pay for mass-produced or repetitive videos, so every Autopilot video is researched, scripted and edited individually.",
  },
];

export type Niche = {
  slug: string;
  name: string;
  title: string;
  h1: string;
  lede: string;
  pains: { t: string; d: string }[];
  plan: string;
  ideas: string[];
};

export const niches: Niche[] = [
  {
    slug: "podcasts",
    name: "Podcasts",
    title: "YouTube editing for podcasts",
    h1: "Turn every episode into a YouTube show",
    lede: "Send the raw recording. We cut the full episode, pull the best moments into Shorts, and package each one so it gets clicked.",
    pains: [
      { t: "Hours of footage, no time to cut it", d: "We edit multi-camera episodes, clean audio and add chapters." },
      { t: "Great moments buried at minute 47", d: "We find them and turn each into a captioned Short." },
      { t: "Titles that read like episode numbers", d: "We write titles around what people search, not 'Ep. 112'." },
    ],
    plan: "shorts",
    ideas: ["Full episode with chapters", "3 to 5 Shorts per episode", "Guest-focused thumbnails", "Clip titles from search data"],
  },
  {
    slug: "coaches",
    name: "Coaches and consultants",
    title: "YouTube channel management for coaches",
    h1: "A YouTube channel that brings you clients",
    lede: "Your videos answer the questions buyers ask before they book a call. We edit, package and post them so the right people find you.",
    pains: [
      { t: "You know your topic, not editing software", d: "Record on your phone or Zoom. We make it look professional." },
      { t: "Posting is inconsistent", d: "A fixed weekly schedule, prepared two weeks ahead." },
      { t: "Views don't turn into calls", d: "Every video ends with a clear next step to your offer." },
    ],
    plan: "starter",
    ideas: ["Client questions as video topics", "Framework explainers", "Case-study style videos", "Shorts that link to your long videos"],
  },
  {
    slug: "real-estate",
    name: "Real estate agents",
    title: "YouTube videos for real estate agents",
    h1: "Be the agent buyers watch before they call",
    lede: "Market updates, neighbourhood guides and listing tours, edited and posted every week so your channel works while you show homes.",
    pains: [
      { t: "Listing videos that nobody finds", d: "Titles and descriptions built around local searches." },
      { t: "No time between showings", d: "Film a few clips. We assemble, caption and post them." },
      { t: "Looks like every other agent", d: "One visual style for thumbnails, intros and on-screen text." },
    ],
    plan: "starter",
    ideas: ["Monthly market update", "Neighbourhood guides", "Listing tours", "Buyer and seller explainers as Shorts"],
  },
];

export const usd = (n: number) => "$" + n.toLocaleString("en-US");
