// Platforms our voice agents connect to. `icon` is a Simple Icons slug in /public/integrations;
// entries without one render as a monogram tile.
export type Platform = { name: string; icon?: string; hex?: string };
export type Category = { title: string; blurb: string; platforms: Platform[] };

export const categories: Category[] = [
  {
    title: "Phone systems",
    blurb: "Keep your number. The agent answers on the line you already have.",
    platforms: [
      { name: "Twilio", icon: "twilio", hex: "F22F46" },
      { name: "Vonage", icon: "vonage" },
      { name: "Zoom Phone" },
      { name: "RingCentral" },
      { name: "Aircall", icon: "aircall", hex: "00B388" },
      { name: "Dialpad" },
      { name: "Telnyx" },
      { name: "Asterisk", icon: "asterisk", hex: "F68F1E" },
    ],
  },
  {
    title: "Calendars & booking",
    blurb: "Checks real availability and books the slot mid call.",
    platforms: [
      { name: "Google Calendar", icon: "googlecalendar", hex: "4285F4" },
      { name: "Outlook" },
      { name: "Calendly", icon: "calendly", hex: "006BFF" },
      { name: "Cal.com" },
      { name: "Acuity" },
      { name: "Square Appointments", icon: "square" },
    ],
  },
  {
    title: "CRMs",
    blurb: "New leads, notes, and call outcomes land where your team works.",
    platforms: [
      { name: "GoHighLevel" },
      { name: "HubSpot", icon: "hubspot", hex: "FF7A59" },
      { name: "Salesforce", icon: "salesforce", hex: "00A1E0" },
      { name: "Pipedrive" },
      { name: "Zoho" },
      { name: "Airtable", icon: "airtable", hex: "18BFFF" },
      { name: "Google Sheets", icon: "googlesheets", hex: "34A853" },
      { name: "Notion", icon: "notion" },
      { name: "ClickUp", icon: "clickup", hex: "7B68EE" },
    ],
  },
  {
    title: "Industry software",
    blurb: "The systems your business actually runs on, from POS to patient records.",
    platforms: [
      { name: "ServiceTitan" },
      { name: "Jobber" },
      { name: "Housecall Pro" },
      { name: "Meevo" },
      { name: "Mindbody" },
      { name: "Vagaro" },
      { name: "Clio" },
      { name: "Spruce Health" },
      { name: "Hint Health" },
    ],
  },
  {
    title: "Messaging & support",
    blurb: "Texts, chats, and handoffs to your team the moment a call ends.",
    platforms: [
      { name: "WhatsApp", icon: "whatsapp", hex: "25D366" },
      { name: "Slack", icon: "slack", hex: "E01E5A" },
      { name: "Microsoft Teams" },
      { name: "Gmail", icon: "gmail", hex: "EA4335" },
      { name: "Messenger", icon: "messenger", hex: "00B2FF" },
      { name: "Telegram", icon: "telegram", hex: "26A5E4" },
      { name: "Intercom", icon: "intercom", hex: "6AFDEF" },
      { name: "Zendesk", icon: "zendesk" },
      { name: "Help Scout", icon: "helpscout", hex: "1292EE" },
    ],
  },
  {
    title: "Payments & commerce",
    blurb: "Take deposits, look up orders, and send payment links.",
    platforms: [
      { name: "Stripe", icon: "stripe", hex: "635BFF" },
      { name: "Square", icon: "square" },
      { name: "Shopify", icon: "shopify", hex: "7AB55C" },
      { name: "PayPal", icon: "paypal", hex: "0070E0" },
      { name: "QuickBooks", icon: "quickbooks", hex: "2CA01C" },
      { name: "Xero" },
    ],
  },
  {
    title: "Automation & data",
    blurb: "Custom workflows and backends when off the shelf isn't enough.",
    platforms: [
      { name: "Zapier" },
      { name: "Make", icon: "make", hex: "A259FF" },
      { name: "n8n", icon: "n8n", hex: "EA4B71" },
      { name: "Webhooks" },
      { name: "Modal" },
      { name: "Supabase", icon: "supabase", hex: "3FCF8E" },
      { name: "PostgreSQL", icon: "postgresql", hex: "6B8FE8" },
      { name: "Firebase", icon: "firebase", hex: "FFA000" },
      { name: "Google Drive", icon: "googledrive", hex: "4285F4" },
      { name: "Dropbox", icon: "dropbox", hex: "0061FF" },
    ],
  },
  {
    title: "Lead sources",
    blurb: "Call new leads back in seconds, wherever they came from.",
    platforms: [
      { name: "Facebook", icon: "facebook", hex: "0866FF" },
      { name: "Instagram", icon: "instagram", hex: "FF0069" },
      { name: "Google Ads", icon: "googleads", hex: "4285F4" },
      { name: "Google Business", icon: "googlemaps", hex: "34A853" },
      { name: "Yelp", icon: "yelp", hex: "FF1A1A" },
      { name: "Typeform" },
      { name: "Google Forms", icon: "googleforms", hex: "7248B9" },
      { name: "WordPress", icon: "wordpress", hex: "21759B" },
      { name: "Webflow", icon: "webflow", hex: "146EF5" },
      { name: "Wix" },
      { name: "Mailchimp", icon: "mailchimp", hex: "FFE01B" },
    ],
  },
  {
    title: "AI models & voices",
    blurb: "The best model and voice for each job, swapped as better ones ship.",
    platforms: [
      { name: "OpenAI", icon: "openai" },
      { name: "Claude", icon: "claude", hex: "D97757" },
      { name: "Gemini", icon: "googlegemini", hex: "8E75B2" },
      { name: "ElevenLabs", icon: "elevenlabs" },
      { name: "Deepgram", icon: "deepgram", hex: "13EF93" },
    ],
  },
];

export const allPlatforms = categories.flatMap((c) => c.platforms);
export const iconPlatforms = allPlatforms.filter((p, i, a) => p.icon && a.findIndex((q) => q.icon === p.icon) === i);
