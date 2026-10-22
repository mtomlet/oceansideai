// Platforms our voice agents connect to. `icon` = Simple Icons slug in /public/integrations (rendered in brand color);
// otherwise the brand's own favicon from /public/integrations/fav/<domain>.png.
export type Platform = { name: string; icon?: string; hex?: string; domain?: string };
export type Category = { title: string; blurb: string; platforms: Platform[] };
export type Industry = { title: string; platforms: Platform[] };

export const categories: Category[] = [
  {
    title: "Phone systems",
    blurb: "Keep your number. The agent answers on the line you already have.",
    platforms: [
      { name: "Twilio", icon: "twilio", hex: "F22F46" },
      { name: "RingCentral", domain: "ringcentral.com" },
      { name: "Telnyx", domain: "telnyx.com" },
      { name: "Vonage", domain: "vonage.com" },
      { name: "Zoom Phone", domain: "zoom.us" },
      { name: "Microsoft Teams Phone", domain: "teams.microsoft.com" },
      { name: "Dialpad", domain: "dialpad.com" },
      { name: "Aircall", icon: "aircall", hex: "00B388" },
      { name: "Nextiva", domain: "nextiva.com" },
      { name: "8x8", domain: "8x8.com" },
      { name: "OpenPhone", domain: "openphone.com" },
      { name: "Grasshopper", domain: "grasshopper.com" },
      { name: "Ooma", domain: "ooma.com" },
      { name: "Google Voice", domain: "voice.google.com" },
      { name: "Asterisk / FreePBX", icon: "asterisk", hex: "F68F1E" },
    ],
  },
  {
    title: "Calendars & booking",
    blurb: "Checks real availability and books the slot while the caller is on the line.",
    platforms: [
      { name: "Google Calendar", icon: "googlecalendar", hex: "4285F4" },
      { name: "Outlook", domain: "outlook.com" },
      { name: "Microsoft Bookings", domain: "bookings.microsoft.com" },
      { name: "Calendly", icon: "calendly", hex: "006BFF" },
      { name: "Cal.com", domain: "cal.com" },
      { name: "Acuity Scheduling", domain: "acuityscheduling.com" },
      { name: "Square Appointments", icon: "square", hex: "FFFFFF" },
      { name: "Setmore", domain: "setmore.com" },
      { name: "SimplyBook.me", domain: "simplybook.me" },
      { name: "Zoho Bookings", domain: "zoho.com" },
    ],
  },
  {
    title: "CRMs",
    blurb: "New leads, notes, and call outcomes land where your team already works.",
    platforms: [
      { name: "GoHighLevel", domain: "gohighlevel.com" },
      { name: "HubSpot", icon: "hubspot", hex: "FF7A59" },
      { name: "Salesforce", icon: "salesforce", hex: "00A1E0" },
      { name: "Pipedrive", domain: "pipedrive.com" },
      { name: "Zoho CRM", domain: "zoho.com" },
      { name: "Close", domain: "close.com" },
      { name: "Keap", domain: "keap.com" },
      { name: "ActiveCampaign", domain: "activecampaign.com" },
      { name: "monday.com", domain: "monday.com" },
      { name: "Airtable", icon: "airtable", hex: "18BFFF" },
      { name: "Google Sheets", icon: "googlesheets", hex: "34A853" },
      { name: "Notion", icon: "notion", hex: "FFFFFF" },
    ],
  },
  {
    title: "Messaging & handoff",
    blurb: "Texts the caller, alerts your team, and routes urgent calls to a human.",
    platforms: [
      { name: "SMS", icon: "twilio", hex: "F22F46" },
      { name: "WhatsApp", icon: "whatsapp", hex: "25D366" },
      { name: "Slack", icon: "slack", hex: "E01E5A" },
      { name: "Microsoft Teams", domain: "teams.microsoft.com" },
      { name: "Gmail", icon: "gmail", hex: "EA4335" },
      { name: "Outlook Mail", domain: "outlook.com" },
      { name: "Podium", domain: "podium.com" },
      { name: "Weave", domain: "getweave.com" },
      { name: "Intercom", icon: "intercom", hex: "6AFDEF" },
      { name: "Zendesk", icon: "zendesk", hex: "FFFFFF" },
      { name: "Freshdesk", domain: "freshdesk.com" },
      { name: "Front", domain: "front.com" },
    ],
  },
  {
    title: "Payments & accounting",
    blurb: "Take deposits, send payment links, and look up invoices on the call.",
    platforms: [
      { name: "Stripe", icon: "stripe", hex: "635BFF" },
      { name: "Square", icon: "square", hex: "FFFFFF" },
      { name: "PayPal", icon: "paypal", hex: "0070E0" },
      { name: "Authorize.net", domain: "authorize.net" },
      { name: "Shopify", icon: "shopify", hex: "7AB55C" },
      { name: "QuickBooks", icon: "quickbooks", hex: "2CA01C" },
      { name: "Xero", domain: "xero.com" },
    ],
  },
  {
    title: "Automation & data",
    blurb: "Custom workflows and backends when off the shelf isn't enough.",
    platforms: [
      { name: "Zapier", domain: "zapier.com" },
      { name: "Make", icon: "make", hex: "A259FF" },
      { name: "n8n", icon: "n8n", hex: "EA4B71" },
      { name: "REST APIs & webhooks", domain: "postman.com" },
      { name: "Supabase", icon: "supabase", hex: "3FCF8E" },
      { name: "PostgreSQL", icon: "postgresql", hex: "6B8FE8" },
      { name: "Firebase", icon: "firebase", hex: "FFA000" },
      { name: "Google Drive", icon: "googledrive", hex: "4285F4" },
      { name: "SharePoint", domain: "sharepoint.com" },
    ],
  },
];

export const industries: Industry[] = [
  {
    title: "Home services",
    platforms: [
      { name: "ServiceTitan", domain: "servicetitan.com" },
      { name: "Jobber", domain: "getjobber.com" },
      { name: "Housecall Pro", domain: "housecallpro.com" },
      { name: "FieldEdge", domain: "fieldedge.com" },
      { name: "Service Fusion", domain: "servicefusion.com" },
      { name: "Workiz", domain: "workiz.com" },
      { name: "Successware", domain: "successware.com" },
      { name: "ServiceM8", domain: "servicem8.com" },
      { name: "Kickserv", domain: "kickserv.com" },
    ],
  },
  {
    title: "Roofing & construction",
    platforms: [
      { name: "AccuLynx", domain: "acculynx.com" },
      { name: "JobNimbus", domain: "jobnimbus.com" },
      { name: "Roofr", domain: "roofr.com" },
      { name: "Buildertrend", domain: "buildertrend.com" },
      { name: "JobTread", domain: "jobtread.com" },
      { name: "CompanyCam", domain: "companycam.com" },
    ],
  },
  {
    title: "Medical & clinics",
    platforms: [
      { name: "athenahealth", domain: "athenahealth.com" },
      { name: "eClinicalWorks", domain: "eclinicalworks.com" },
      { name: "Tebra", domain: "tebra.com" },
      { name: "DrChrono", domain: "drchrono.com" },
      { name: "Elation Health", domain: "elationhealth.com" },
      { name: "AdvancedMD", domain: "advancedmd.com" },
      { name: "NextGen", domain: "nextgen.com" },
      { name: "ModMed", domain: "modmed.com" },
      { name: "Healthie", domain: "gethealthie.com" },
      { name: "Spruce Health", domain: "sprucehealth.com" },
      { name: "Hint Health", domain: "hint.com" },
    ],
  },
  {
    title: "Dental",
    platforms: [
      { name: "Dentrix", domain: "dentrix.com" },
      { name: "Eaglesoft", domain: "pattersondental.com" },
      { name: "Open Dental", domain: "opendental.com" },
      { name: "Curve Dental", domain: "curvedental.com" },
      { name: "NexHealth", domain: "nexhealth.com" },
    ],
  },
  {
    title: "Therapy & wellness",
    platforms: [
      { name: "SimplePractice", domain: "simplepractice.com" },
      { name: "Jane App", domain: "jane.app" },
      { name: "TherapyNotes", domain: "therapynotes.com" },
      { name: "Practice Better", domain: "practicebetter.io" },
      { name: "IntakeQ", domain: "intakeq.com" },
    ],
  },
  {
    title: "Salons, med spas & fitness",
    platforms: [
      { name: "Salon Sync", domain: "salon-sync.co" },
      { name: "Meevo", domain: "meevo.com" },
      { name: "Zenoti", domain: "zenoti.com" },
      { name: "Boulevard", domain: "joinblvd.com" },
      { name: "Mangomint", domain: "mangomint.com" },
      { name: "Mindbody", domain: "mindbodyonline.com" },
      { name: "Vagaro", domain: "vagaro.com" },
      { name: "Phorest", domain: "phorest.com" },
      { name: "GlossGenius", domain: "glossgenius.com" },
      { name: "Fresha", domain: "fresha.com" },
    ],
  },
  {
    title: "Legal",
    platforms: [
      { name: "Clio", domain: "clio.com" },
      { name: "MyCase", domain: "mycase.com" },
      { name: "Filevine", domain: "filevine.com" },
      { name: "PracticePanther", domain: "practicepanther.com" },
      { name: "Smokeball", domain: "smokeball.com" },
      { name: "Lawmatics", domain: "lawmatics.com" },
      { name: "CASEpeer", domain: "casepeer.com" },
      { name: "Litify", domain: "litify.com" },
    ],
  },
  {
    title: "Real estate & property",
    platforms: [
      { name: "Follow Up Boss", domain: "followupboss.com" },
      { name: "Lofty", domain: "lofty.com" },
      { name: "Sierra Interactive", domain: "sierrainteractive.com" },
      { name: "AppFolio", domain: "appfolio.com" },
      { name: "Buildium", domain: "buildium.com" },
      { name: "Yardi", domain: "yardi.com" },
      { name: "Rent Manager", domain: "rentmanager.com" },
      { name: "Guesty", domain: "guesty.com" },
      { name: "Hostaway", domain: "hostaway.com" },
    ],
  },
  {
    title: "Auto, truck & fleet",
    platforms: [
      { name: "Tekmetric", domain: "tekmetric.com" },
      { name: "Shopmonkey", domain: "shopmonkey.io" },
      { name: "Shop-Ware", domain: "shop-ware.com" },
      { name: "Fullbay", domain: "fullbay.com" },
      { name: "Mitchell 1", domain: "mitchell1.com" },
      { name: "CDK Global", domain: "cdkglobal.com" },
      { name: "VinSolutions", domain: "vinsolutions.com" },
      { name: "DealerSocket", domain: "dealersocket.com" },
    ],
  },
  {
    title: "Restaurants & hospitality",
    platforms: [
      { name: "Toast", domain: "toasttab.com" },
      { name: "OpenTable", domain: "opentable.com" },
      { name: "Resy", domain: "resy.com" },
      { name: "SevenRooms", domain: "sevenrooms.com" },
      { name: "Tock", domain: "exploretock.com" },
      { name: "Cloudbeds", domain: "cloudbeds.com" },
    ],
  },
  {
    title: "Insurance",
    platforms: [
      { name: "Applied Epic", domain: "appliedsystems.com" },
      { name: "EZLynx", domain: "ezlynx.com" },
      { name: "HawkSoft", domain: "hawksoft.com" },
      { name: "AgencyZoom", domain: "agencyzoom.com" },
      { name: "QQCatalyst", domain: "qqcatalyst.com" },
    ],
  },
  {
    title: "Veterinary",
    platforms: [
      { name: "ezyVet", domain: "ezyvet.com" },
      { name: "Cornerstone", domain: "idexx.com" },
      { name: "Vetspire", domain: "vetspire.com" },
      { name: "Shepherd", domain: "shepherd.vet" },
      { name: "AVImark", domain: "covetrus.com" },
    ],
  },
  {
    title: "Self storage",
    platforms: [
      { name: "SiteLink", domain: "sitelink.com" },
      { name: "storEDGE", domain: "storedge.com" },
      { name: "Easy Storage Solutions", domain: "easystoragesolutions.com" },
    ],
  },
];

const all = [...categories.flatMap((c) => c.platforms), ...industries.flatMap((i) => i.platforms)];
export const platformCount = new Set(all.map((p) => p.name)).size;

// Marquee rows: a colorful, recognizable mix.
const pick = (names: string[]) => names.map((n) => all.find((p) => p.name === n)!).filter(Boolean);
export const marqueeTop = pick([
  "Twilio", "RingCentral", "Google Calendar", "GoHighLevel", "HubSpot", "Salesforce", "ServiceTitan", "Jobber",
  "Housecall Pro", "athenahealth", "Zenoti", "Clio", "Slack", "Stripe", "Calendly", "Zoom Phone",
]);
export const marqueeBottom = pick([
  "WhatsApp", "Mindbody", "Vagaro", "Boulevard", "AccuLynx", "Follow Up Boss", "AppFolio", "Toast",
  "OpenTable", "Tekmetric", "Shopify", "QuickBooks", "Pipedrive", "Microsoft Teams", "n8n", "Make",
]);
