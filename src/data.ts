import { BlogPost, ClientProject, PortfolioProject, Service, Testimonial } from './types';

export const initialPaymentConfig = {
  paypal: {
    enabled: true,
    email: "info@gullgtech.online",
    mode: "live", // "sandbox" or "live"
  },
  bankTransfer: {
    enabled: true,
    bankName: "Citibank", 
    accountTitle: "Gull Nawaz",
    accountNumber: "70582420001747164",
    iban: "70582420001747164",
    swiftCode: "CITIUS33",
    routingNumber: "031100209",
    instructions: "Please upload your receipt/screenshot after transfer or include your Order ID in the payment reference."
  }
};

export const defaultServicesOptions = [
  { id: 'dashboard-design', title: 'Data-Driven Dashboard Design', basePrice: 800, category: 'Design', description: 'Custom analytics dashboards that turn complex data streams into actionable insights.' },
  { id: 'web-mobile-dev', title: 'Modern Web & Mobile App Development', basePrice: 1500, category: 'Development', description: 'High-performance, scalable applications built with cutting-edge modern frameworks.' },
  { id: 'brand-identity', title: 'Graphic & Brand Identity Design', basePrice: 400, category: 'Design', description: 'Distinctive visual identities, logos, and comprehensive brand guidelines.' },
  { id: 'uiux-prototyping', title: 'UI/UX Prototyping & User Research', basePrice: 600, category: 'Design', description: 'High-fidelity Figma prototypes and deep user behavior analysis.' },
  { id: 'workflow-automation', title: 'Intelligent Process & Workflow Automation', basePrice: 500, category: 'Automation', description: 'Streamline repetitive tasks by connecting your favorite enterprise tools.' },
  { id: 'ai-chatbot', title: 'Live AI Chatbot Integration', basePrice: 700, category: 'Automation & AI', description: 'Custom LLM-powered chatbots providing 24/7 intelligent customer support.' },
  { id: 'social-media', title: 'Social Media Management & Strategy', basePrice: 350, category: 'Marketing', description: 'Data-driven content strategies to grow brand awareness and audience engagement.' },
  { id: 'video-production', title: 'Video Creation & Motion Production', basePrice: 450, category: 'Marketing', description: 'High-converting short-form reels, promotional videos, and motion graphics.' },
  { id: 'ad-campaigns', title: 'Ad Campaign Design & Management', basePrice: 550, category: 'Marketing', description: 'Strategic visual creative generation and targeted paid campaign setups.' }
];

export const servicesData: Service[] = [
  {
    id: 's3',
    title: 'Data-Driven Dashboard Design',
    category: 'Development',
    description: 'Custom analytics dashboards that turn complex data streams into actionable insights.',
    deliverables: ['Data Visualization', 'Real-time Analytics', 'Custom Widgets', 'Export Tools'],
    techStack: ['React', 'D3.js', 'Recharts', 'Tailwind CSS'],
    timeline: '4-8 Weeks',
    icon: 'BarChart3',
  },
  {
    id: 's4',
    title: 'Modern Web & Mobile App Development',
    category: 'Development',
    description: 'High-performance, scalable applications built with cutting-edge modern frameworks.',
    deliverables: ['PWA', 'Native iOS/Android apps', 'Responsive Web Apps', 'API Integration'],
    techStack: ['React Native', 'Next.js', 'TypeScript', 'Node.js'],
    timeline: '8-16 Weeks',
    icon: 'Smartphone',
  },
  {
    id: 's1',
    title: 'Graphic & Brand Identity Design',
    category: 'Design',
    description: 'Build a cohesive and memorable brand identity that resonates with your target audience.',
    deliverables: ['Logo Design', 'Brand Guidelines', 'Marketing Collateral', 'Social Media Assets'],
    techStack: ['Figma', 'Adobe Creative Cloud', 'Illustrator'],
    timeline: '2-4 Weeks',
    icon: 'Palette',
  },
  {
    id: 's2',
    title: 'UI/UX Prototyping & User Research',
    category: 'Design',
    description: 'Data-driven user experience design focusing on conversion, retention, and accessibility.',
    deliverables: ['Wireframing', 'Interactive Prototypes', 'User Testing Reports', 'Design Systems'],
    techStack: ['Figma', 'Protopie', 'Maze'],
    timeline: '3-6 Weeks',
    icon: 'Layout',
  },
  {
    id: 's5',
    title: 'Intelligent Process & Workflow Automation',
    category: 'Automation & AI',
    description: 'Streamline operations by automating repetitive tasks and connecting siloed systems.',
    deliverables: ['Custom Zapier/Make Integrations', 'RPA', 'Workflow Mapping', 'Automated Reporting'],
    techStack: ['Python', 'Make', 'Zapier', 'n8n'],
    timeline: '2-6 Weeks',
    icon: 'Workflow',
  },
  {
    id: 's6',
    title: 'Live AI Chatbot Integration',
    category: 'Automation & AI',
    description: 'Deploy intelligent, context-aware AI assistants to handle customer support and lead gen.',
    deliverables: ['Custom AI Training', 'Widget Integration', 'Analytics Dashboard', 'Handoff Logic'],
    techStack: ['OpenAI', 'LangChain', 'React', 'WebSockets'],
    timeline: '3-5 Weeks',
    icon: 'Bot',
  },
  {
    id: 's7',
    title: 'Social Media Management & Strategy',
    category: 'Marketing',
    description: 'End-to-end community handling, profile growth, and content publishing across all major channels.',
    deliverables: ['Content Calendar', 'Community Engagement', 'Growth Analytics', 'Platform Strategy'],
    techStack: ['Hootsuite', 'Buffer', 'Meta Business Suite'],
    timeline: 'Ongoing / Monthly',
    icon: 'Share2',
  },
  {
    id: 's8',
    title: 'Video Creation & Motion Production',
    category: 'Marketing',
    description: 'High-converting short-form reels, promotional videos, and motion graphics optimized for engagement.',
    deliverables: ['Short-form Reels', 'Promo Videos', 'Motion Graphics', 'Video Editing'],
    techStack: ['Premiere Pro', 'After Effects', 'CapCut'],
    timeline: '1-3 Weeks',
    icon: 'Video',
  },
  {
    id: 's9',
    title: 'Ad Campaign Design & Management',
    category: 'Marketing',
    description: 'Strategic visual creative generation and targeted paid campaign setups across Facebook, Instagram, & Google.',
    deliverables: ['Ad Creatives', 'Campaign Setup', 'A/B Testing', 'Performance Reports'],
    techStack: ['Google Ads', 'Facebook Ads Manager', 'Figma'],
    timeline: '2-4 Weeks',
    icon: 'Megaphone',
  },
];

export const portfolioData: PortfolioProject[] = [
  {
    id: 'p1',
    title: 'FinTech Analytics Dashboard',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'A comprehensive real-time dashboard for institutional traders featuring sub-second update latency.',
    stats: [
      { label: 'Latency', value: '<50ms' },
      { label: 'Data Points/sec', value: '10k+' },
    ],
  },
  {
    id: 'p2',
    title: 'HealthCare Patient Portal',
    category: 'Mobile App',
    image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee8?auto=format&fit=crop&w=800&q=80',
    description: 'Secure, HIPAA-compliant patient portal for appointment booking and tele-health sessions.',
    stats: [
      { label: 'Active Users', value: '50k+' },
      { label: 'App Rating', value: '4.9/5' },
    ],
  },
  {
    id: 'p3',
    title: 'E-Commerce AI Support Bot',
    category: 'Automation',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80',
    description: 'Automated 70% of tier-1 support queries for a top-100 Shopify Plus retailer.',
    stats: [
      { label: 'Resolution Rate', value: '72%' },
      { label: 'Avg Resp Time', value: '1.2s' },
    ],
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'CTO',
    company: 'Nexus Finance',
    content: 'GullG Technology completely transformed our data visualization approach. The new dashboard is blazingly fast and our analysts love the UX.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 't2',
    name: 'Marcus Chen',
    role: 'Director of Ops',
    company: 'Logistix Global',
    content: 'The workflow automation they implemented saved us over 40 hours a week in manual data entry. Exceptional technical precision.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80',
  },
];

export const blogPostsData: BlogPost[] = [
  {
    id: 'b1',
    slug: 'how-agentic-ai-is-rewriting-the-enterprise-workflow',
    title: 'How Agentic AI Is Rewriting the Enterprise Workflow',
    seoTitle: 'How Agentic AI Is Rewriting Enterprise Workflows | GullG Tech Insights',
    metaDescription: 'Discover how agentic AI systems are replacing basic chatbots with autonomous, multi-step workflow execution and how enterprises maintain oversight.',
    category: 'AI & Automation',
    readTime: '7 min read',
    excerpt: 'Start agentic AI in low-risk, high-repetition workflows first. Build trust in the system before expanding its authority.',
    content: 'For years, enterprise AI meant chatbots that answered questions when prompted. That\'s changing fast. Agentic AI systems can now plan a task, break it into steps, execute those steps using tools or APIs, and correct course when something goes wrong — all with minimal human input.\n\nFor businesses, this shifts the value of AI from "answering questions" to "getting work done." A support agent doesn\'t just draft a reply anymore; it can look up the order, check inventory, issue a refund, and log the ticket. A finance agent can reconcile invoices across three systems without a human triggering each step.\n\nThe catch is trust. Autonomous action requires guardrails: clear permissions, audit logs, and fallback points where a human reviews before anything irreversible happens. Companies that get this balance right — automation with oversight — are the ones seeing real productivity gains, not just impressive demos.',
    date: 'Oct 15, 2026',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Visual representation of AI neural nodes and workflow automation processes',
  },
  {
    id: 'b2',
    slug: 'database-indexing-the-silent-killer-of-slow-apps',
    title: 'Database Indexing: The Silent Killer of Slow Apps',
    seoTitle: 'Database Indexing: Optimization Guide for Fast Web Apps | GullG Tech',
    metaDescription: 'Learn how proper database indexing eliminates bottleneck queries, how to use EXPLAIN, and why over-indexing damages write performance.',
    category: 'Engineering',
    readTime: '6 min read',
    excerpt: 'Index deliberately, not defensively. Measure first, then fix.',
    content: 'Most performance complaints trace back to the same root cause: the database is scanning far more rows than it needs to. Indexing is the fix, but it\'s frequently misunderstood.\n\nAn index is essentially a shortcut — a sorted structure that lets the database jump straight to relevant rows instead of scanning the whole table. Add one to any column you frequently filter, sort, or join on, and queries that took seconds can drop to milliseconds.\n\nBut indexes aren\'t free. Every index adds overhead to writes (inserts, updates, deletes all have to update the index too), and unused indexes just waste space and slow down writes for no benefit. The real skill is knowing which columns deserve one — usually foreign keys, columns in WHERE clauses, and columns used in ORDER BY.\n\nBefore adding an index blindly, run EXPLAIN on your slow queries. It tells you exactly what the database is doing and where the time is going.',
    date: 'Oct 12, 2026',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Code editor screen showing SQL query optimization and indexing structure',
  },
  {
    id: 'b3',
    slug: 'dark-mode-done-right-beyond-just-inverting-colors',
    title: 'Dark Mode Done Right: Beyond Just Inverting Colors',
    seoTitle: 'Dark Mode UI/UX Design Done Right: Colors & Accessibility | GullG Tech',
    metaDescription: 'Explore the principles of designing high-converting, accessible dark mode interfaces that avoid harsh pure-black contrast and preserve elevation.',
    category: 'UI/UX Design',
    readTime: '5 min read',
    excerpt: 'Design dark mode as a parallel system, not a color inversion.',
    content: 'A common shortcut teams take with dark mode is simply flipping white backgrounds to black and calling it done. The result usually looks harsh, loses hierarchy, and strains the eyes — the opposite of the intended effect.\n\nGood dark mode design treats it as its own system. Pure black backgrounds create too much contrast with white text, causing visual vibration; a dark gray (like #121212) is easier to read. Elevation — the sense that some elements sit "above" others — needs to be rebuilt using subtle lightness shifts instead of shadows, since shadows barely register on dark backgrounds. Saturated colors that look fine on white can feel overpowering on black, so palettes often need to be desaturated slightly for dark themes.\n\nAccessibility matters just as much here: contrast ratios still need to meet WCAG standards in both modes, and it\'s worth testing every interactive state — hover, focus, disabled — in dark mode specifically, since they\'re easy to forget.',
    date: 'Oct 08, 2026',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Modern dark UI interface design displayed on monitor screen',
  },
  {
    id: 'b4',
    slug: 'rag-vs-fine-tuning-choosing-the-right-ai-strategy-for-your-product',
    title: 'RAG vs Fine-Tuning: Choosing the Right AI Strategy for Your Product',
    seoTitle: 'RAG vs Fine-Tuning: AI Product Architecture Comparison | GullG Tech',
    metaDescription: 'A practical breakdown of when to choose Retrieval-Augmented Generation (RAG) vs fine-tuning for enterprise LLM integration.',
    category: 'AI & Automation',
    readTime: '8 min read',
    excerpt: 'Use RAG for knowledge, fine-tuning for behavior. Most real systems need a mix.',
    content: 'When teams want an AI model to "know" their company\'s data, two approaches usually come up: Retrieval-Augmented Generation (RAG) and fine-tuning. They solve different problems, and picking the wrong one wastes time and budget.\n\nRAG keeps the base model unchanged and instead retrieves relevant documents at query time, feeding them into the prompt as context. It\'s fast to set up, easy to update (just change the data source), and transparent — you can see exactly what information informed the answer. It\'s the right choice when your data changes often or when you need to cite sources.\n\nFine-tuning actually adjusts the model\'s internal weights using your own examples. It\'s better suited for teaching a model a specific style, tone, or specialized skill that goes beyond just recalling facts. It\'s more expensive, slower to iterate on, and harder to update.\n\nMany production systems end up using both: fine-tuning for tone and behavior, RAG for up-to-date factual grounding.',
    date: 'Oct 05, 2026',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Abstract digital matrix depicting AI vector embeddings and neural networks',
  },
  {
    id: 'b5',
    slug: 'microservices-vs-monoliths-what-we-learned-migrating-a-clients-platform',
    title: 'Microservices vs Monoliths: What We Learned Migrating a Client\'s Platform',
    seoTitle: 'Microservices vs Monoliths: Pragmatic Migration Case Study | GullG Tech',
    metaDescription: 'Read our architectural retrospective on selectively decoupling scalable bottlenecks into microservices while preserving the core monolith.',
    category: 'Engineering',
    readTime: '9 min read',
    excerpt: 'Microservices solve organizational and scaling problems, not code cleanliness problems. Split along real boundaries, not out of habit.',
    content: 'A recent client came to us with a monolithic application that had grown unwieldy — one deploy touched everything, and a bug in the reporting module could take down checkout. The obvious answer seemed to be "break it into microservices." The real answer was more nuanced.\n\nWe migrated only the components with genuinely different scaling needs and release cadences — the reporting engine and the notification system — into separate services. The core transactional logic stayed in the monolith, because splitting it further would have added network latency and operational complexity without a clear benefit.\n\nThe result: deploy risk dropped significantly, since the two most failure-prone modules could now ship independently. But we avoided the common trap of over-fragmenting a system that didn\'t need it — which usually just trades one set of problems (a tangled codebase) for another (distributed system debugging, network failures, data consistency issues).',
    date: 'Sep 30, 2026',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Server hardware racks showcasing scalable cloud infrastructure',
  },
  {
    id: 'b6',
    slug: 'micro-interactions-that-make-interfaces-feel-alive',
    title: 'Micro-Interactions That Make Interfaces Feel Alive',
    seoTitle: 'Micro-Interactions: Enhancing UX with Micro-Animations | GullG Tech',
    metaDescription: 'How subtle 100-300ms micro-interactions give users immediate visual feedback and elevate digital products from functional to delightful.',
    category: 'UI/UX Design',
    readTime: '4 min read',
    excerpt: 'The best micro-interactions are felt, not noticed. If a user consciously thinks about the animation, it\'s probably too slow or too flashy.',
    content: 'Micro-interactions are the small, often unnoticed animations that respond to user actions — a button that subtly depresses on click, a checkbox that animates a checkmark, a form field that gently shakes on invalid input. Individually tiny, but collectively they\'re a huge part of why some products feel polished and others feel flat.\n\nTheir real job is feedback: confirming that the system registered an action, without needing a separate message or alert. A save icon that briefly morphs into a checkmark tells the user "it worked" faster and more pleasantly than a toast notification ever could.\n\nThe key constraint is restraint. Micro-interactions should take 100–300ms — long enough to register, short enough not to feel sluggish — and should never block the user from moving on to their next action.',
    date: 'Sep 25, 2026',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Interactive UI design mockup demonstrating responsive states',
  },
  {
    id: 'b7',
    slug: 'api-security-checklist-for-2026',
    title: 'API Security Checklist for 2026',
    seoTitle: 'Enterprise API Security Checklist for 2026 | GullG Tech Guide',
    metaDescription: 'Essential API security checklist covering JWT token expiration, server-side validation, rate limiting, and least-privilege service accounts.',
    category: 'Engineering',
    readTime: '7 min read',
    excerpt: 'Most API breaches aren\'t exotic — they\'re missing basics. A short checklist, applied consistently, prevents the majority of real-world incidents.',
    content: 'APIs are the most exposed surface of most modern applications, and attackers know it. A practical, current checklist:\n\n* **Authentication & authorization:** Use short-lived tokens (JWT with expiry), and always check permissions server-side — never trust a hidden button in the frontend as your only protection.\n* **Rate limiting:** Protect against brute-force and scraping by capping requests per user/IP, with stricter limits on sensitive endpoints like login.\n* **Input validation:** Validate and sanitize everything server-side, even data your own frontend "already validated." Assume every request could be forged.\n* **HTTPS everywhere:** No exceptions, including internal service-to-service calls.\n* **Least privilege:** API keys and service accounts should only have access to what they actually need — not blanket admin rights for convenience.\n* **Logging & monitoring:** Log authentication failures and unusual access patterns; you can\'t respond to an attack you don\'t know is happening.',
    date: 'Sep 20, 2026',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Cybersecurity lock and encrypted data transmission visualization',
  },
  {
    id: 'b8',
    slug: 'building-internal-tools-with-ai-copilots-a-practical-guide',
    title: 'Building Internal Tools with AI Copilots: A Practical Guide',
    seoTitle: 'Building High-ROI Internal Tools with AI Copilots | GullG Tech',
    metaDescription: 'Learn how embedding AI assistants into internal dashboards streamlines support tickets, automates sales outreach, and boosts operational ROI.',
    category: 'AI & Automation',
    readTime: '6 min read',
    excerpt: 'The highest-ROI AI feature is often the one your own employees use, not the one customers see.',
    content: 'Customer-facing AI gets most of the attention, but some of the fastest wins come from embedding AI copilots directly into internal dashboards — the tools your own team uses every day.\n\nA support dashboard with an AI copilot can summarize a customer\'s history in seconds instead of a rep scrolling through months of tickets. A sales dashboard copilot can draft a follow-up email using deal context automatically. An ops dashboard copilot can flag anomalies in a report and explain them in plain language.\n\nThe pattern that works best: keep the AI\'s role narrow and specific to the tool it\'s embedded in, give it direct access to that tool\'s data (not a generic chatbot bolted on separately), and always let the human take the final action rather than having the AI act autonomously in internal-facing tools where mistakes are costly.',
    date: 'Sep 15, 2026',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Engineer working with AI-assisted software dashboard on laptop',
  },
  {
    id: 'b9',
    slug: 'designing-trust-ux-patterns-for-fintech-and-data-sensitive-apps',
    title: 'Designing Trust: UX Patterns for Fintech and Data-Sensitive Apps',
    seoTitle: 'Designing Trust in Fintech & Healthcare UX | GullG Tech Insights',
    metaDescription: 'Key UX patterns for building user confidence in data-sensitive apps: progressive disclosure, masked inputs, and calm error resolution.',
    category: 'UI/UX Design',
    readTime: '5 min read',
    excerpt: 'In data-sensitive products, every screen is a trust signal. Design accordingly.',
    content: 'In finance and healthcare apps, trust isn\'t a nice-to-have — it directly affects whether users complete a transaction at all. And trust is built through interface details as much as security infrastructure.\n\nClear, real-time validation (confirming a bank account number is correctly formatted before submission) reduces anxiety more than a generic "processing" spinner. Showing exactly what will happen before an irreversible action — "You are transferring $500 to John\'s Checking" — prevents costly mistakes and builds confidence. Progressive disclosure, revealing sensitive fields (like SSNs) only when truly necessary, signals that the product handles data carefully.\n\nEven small things matter: a masked field with a visible "show" toggle feels safer than an unmasked one, and consistent, calm error messaging ("This card was declined — try another") beats vague or alarming red banners.',
    date: 'Sep 10, 2026',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Clean fintech application layout with secure transaction metrics',
  },
  {
    id: 'b10',
    slug: 'serverless-vs-traditional-hosting-a-cost-breakdown-for-growing-saas',
    title: 'Serverless vs Traditional Hosting: A Cost Breakdown for Growing SaaS',
    seoTitle: 'Serverless vs Traditional Hosting Cost Analysis | GullG Tech',
    metaDescription: 'Compare serverless versus VPS/dedicated cloud hosting costs across growth stages to identify the right crossover threshold for your SaaS.',
    category: 'Engineering',
    readTime: '8 min read',
    excerpt: 'Serverless isn\'t universally cheaper — it\'s cheaper for variable, low-to-moderate traffic. Revisit the decision as you scale, not just once.',
    content: 'Serverless (like AWS Lambda or Google Cloud Functions) is often pitched as automatically cheaper — you only pay for what you use. That\'s true at low-to-moderate, spiky traffic. It stops being true at scale.\n\nAt low traffic, serverless wins decisively: no idle server costs, and pricing scales down to nearly zero during quiet periods. This is ideal for early-stage SaaS products with unpredictable usage.\n\nAs traffic grows steady and high-volume, though, the per-invocation pricing of serverless can end up costing more than a fixed-cost server or a small cluster running the same workload continuously. Traditional hosting (VPS, dedicated servers, or reserved cloud instances) becomes more predictable and often cheaper once you\'re consistently using the capacity you\'re paying for.\n\nThe practical approach: start serverless for speed and low cost during early growth, and re-evaluate around a set traffic threshold — many teams find the crossover point between $500–$2,000/month in ongoing infrastructure spend.',
    date: 'Sep 05, 2026',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Cloud infrastructure topology and hosting architecture diagram',
  }
];

export const clientProjectsData: any[] = [
  { 
    id: 'cp1', 
    name: 'Nexus Mobile App V2', 
    clientName: 'Alice Freeman',
    status: 'in-progress', 
    progress: 65, 
    dueDate: 'Nov 15, 2026',
    milestones: [
      { id: 'm1', name: 'UI/UX Design', targetDate: '2024-10-01T00:00:00Z', status: 'Completed', completionDate: '2024-10-05T00:00:00Z' },
      { id: 'm2', name: 'Backend API Integration', targetDate: '2024-10-20T00:00:00Z', status: 'Completed', completionDate: '2024-10-25T00:00:00Z' },
      { id: 'm3', name: 'Frontend Implementation', targetDate: '2024-11-05T00:00:00Z', status: 'In Progress' },
      { id: 'm4', name: 'QA & Testing', targetDate: '2024-11-12T00:00:00Z', status: 'Not Started' }
    ],
    contract: {
      id: 'ctr-001',
      title: 'Corporate Website Redesign Agreement',
      content: 'This agreement outlines the scope of work, deliverables, and payment terms for the redesign of the Corporate Website.\n\nTotal Contract Value: $5,000.',
      signed: true,
      signedBy: 'Demo Client',
      signedAt: '2024-10-01T14:30:00Z',
      ipAddress: '192.168.1.1'
    }
  },
  { id: 'cp2', name: 'Logistix AI Integration', clientName: 'Bob Smith', status: 'qa', progress: 90, dueDate: 'Oct 20, 2026' },
  { id: 'cp3', name: 'AlphaCorp Rebranding', clientName: 'Bob Smith', status: 'completed', progress: 100, dueDate: 'Sep 01, 2026' }
];

export const supportTicketsMock: any[] = [
  {
    id: 'tk-001',
    subject: 'Cannot access staging environment',
    category: 'Technical Issue',
    description: 'I get a 403 error when trying to access the staging link for the mobile app.',
    status: 'In Progress',
    createdAt: '2024-10-25T09:15:00Z',
    messages: [
      { sender: 'Client', text: 'I get a 403 error when trying to access the staging link for the mobile app.', timestamp: '2024-10-25T09:15:00Z' },
      { sender: 'Admin', text: 'We are looking into this. It seems your IP might not be whitelisted. Can you provide your public IP?', timestamp: '2024-10-25T10:05:00Z' }
    ]
  },
  {
    id: 'tk-002',
    subject: 'Billing question regarding invoice INV-2024-081',
    category: 'Billing Question',
    description: 'Is it possible to pay this via wire transfer instead of PayPal?',
    status: 'Resolved',
    createdAt: '2024-10-10T14:20:00Z',
    messages: [
      { sender: 'Client', text: 'Is it possible to pay this via wire transfer instead of PayPal?', timestamp: '2024-10-10T14:20:00Z' },
      { sender: 'Admin', text: 'Yes, we have added the wire transfer details to your portal under Billing.', timestamp: '2024-10-11T09:00:00Z' }
    ]
  }
];

export const activityLogMock: any[] = [
  { id: 'act-1', description: 'Milestone "Backend API Integration" completed', timestamp: '2024-10-25T16:30:00Z', triggeredBy: 'Admin' },
  { id: 'act-2', description: 'Support ticket "Cannot access staging environment" opened', timestamp: '2024-10-25T09:15:00Z', triggeredBy: 'Client' },
  { id: 'act-3', description: 'File "Wireframes_v2.pdf" uploaded', timestamp: '2024-10-14T11:20:00Z', triggeredBy: 'Admin' },
  { id: 'act-4', description: 'Contract "Corporate Website Redesign Agreement" signed', timestamp: '2024-10-01T14:30:00Z', triggeredBy: 'Client' },
];

export const notificationsMock: any[] = [
  { id: 'notif-1', message: 'New invoice INV-2024-082 issued.', timestamp: '2024-10-26T10:00:00Z', read: false, type: 'invoice' },
  { id: 'notif-2', message: 'Milestone "Backend API Integration" completed.', timestamp: '2024-10-25T16:30:00Z', read: true, type: 'milestone' },
  { id: 'notif-3', message: 'Admin responded to your support ticket.', timestamp: '2024-10-25T10:05:00Z', read: true, type: 'admin' },
];

export const initialFilesMock: any[] = [
  { id: 'f1', name: 'Wireframes_v2.pdf', size: '4.2 MB', date: '2024-10-25T10:00:00Z', direction: 'Sent to Client', projectId: 'cp1', clientName: 'Alice Freeman' },
  { id: 'f2', name: 'Brand_Assets.zip', size: '128 MB', date: '2024-10-24T14:30:00Z', direction: 'Sent to Client', projectId: 'cp1', clientName: 'Alice Freeman' },
  { id: 'f3', name: 'API_Documentation.md', size: '45 KB', date: '2024-10-12T09:15:00Z', direction: 'Sent to Client', projectId: 'cp1', clientName: 'Alice Freeman' }
];
