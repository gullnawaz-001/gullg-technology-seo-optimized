const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const newBlogData = `export const blogPostsData: BlogPost[] = [
  {
    id: 'b1',
    title: 'How Agentic AI Is Rewriting the Enterprise Workflow',
    category: 'AI & Automation',
    readTime: '7 min read',
    excerpt: 'Start agentic AI in low-risk, high-repetition workflows first. Build trust in the system before expanding its authority.',
    content: 'For years, enterprise AI meant chatbots that answered questions when prompted. That\\'s changing fast. Agentic AI systems can now plan a task, break it into steps, execute those steps using tools or APIs, and correct course when something goes wrong — all with minimal human input.\\n\\nFor businesses, this shifts the value of AI from "answering questions" to "getting work done." A support agent doesn\\'t just draft a reply anymore; it can look up the order, check inventory, issue a refund, and log the ticket. A finance agent can reconcile invoices across three systems without a human triggering each step.\\n\\nThe catch is trust. Autonomous action requires guardrails: clear permissions, audit logs, and fallback points where a human reviews before anything irreversible happens. Companies that get this balance right — automation with oversight — are the ones seeing real productivity gains, not just impressive demos.',
    date: 'Oct 15, 2026',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b2',
    title: 'Database Indexing: The Silent Killer of Slow Apps',
    category: 'Engineering',
    readTime: '6 min read',
    excerpt: 'Index deliberately, not defensively. Measure first, then fix.',
    content: 'Most performance complaints trace back to the same root cause: the database is scanning far more rows than it needs to. Indexing is the fix, but it\\'s frequently misunderstood.\\n\\nAn index is essentially a shortcut — a sorted structure that lets the database jump straight to relevant rows instead of scanning the whole table. Add one to any column you frequently filter, sort, or join on, and queries that took seconds can drop to milliseconds.\\n\\nBut indexes aren\\'t free. Every index adds overhead to writes (inserts, updates, deletes all have to update the index too), and unused indexes just waste space and slow down writes for no benefit. The real skill is knowing which columns deserve one — usually foreign keys, columns in WHERE clauses, and columns used in ORDER BY.\\n\\nBefore adding an index blindly, run EXPLAIN on your slow queries. It tells you exactly what the database is doing and where the time is going.',
    date: 'Oct 12, 2026',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbd3739?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b3',
    title: 'Dark Mode Done Right: Beyond Just Inverting Colors',
    category: 'UI/UX Design',
    readTime: '5 min read',
    excerpt: 'Design dark mode as a parallel system, not a color inversion.',
    content: 'A common shortcut teams take with dark mode is simply flipping white backgrounds to black and calling it done. The result usually looks harsh, loses hierarchy, and strains the eyes — the opposite of the intended effect.\\n\\nGood dark mode design treats it as its own system. Pure black backgrounds create too much contrast with white text, causing visual vibration; a dark gray (like #121212) is easier to read. Elevation — the sense that some elements sit "above" others — needs to be rebuilt using subtle lightness shifts instead of shadows, since shadows barely register on dark backgrounds. Saturated colors that look fine on white can feel overpowering on black, so palettes often need to be desaturated slightly for dark themes.\\n\\nAccessibility matters just as much here: contrast ratios still need to meet WCAG standards in both modes, and it\\'s worth testing every interactive state — hover, focus, disabled — in dark mode specifically, since they\\'re easy to forget.',
    date: 'Oct 08, 2026',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b4',
    title: 'RAG vs Fine-Tuning: Choosing the Right AI Strategy for Your Product',
    category: 'AI & Automation',
    readTime: '8 min read',
    excerpt: 'Use RAG for knowledge, fine-tuning for behavior. Most real systems need a mix.',
    content: 'When teams want an AI model to "know" their company\\'s data, two approaches usually come up: Retrieval-Augmented Generation (RAG) and fine-tuning. They solve different problems, and picking the wrong one wastes time and budget.\\n\\nRAG keeps the base model unchanged and instead retrieves relevant documents at query time, feeding them into the prompt as context. It\\'s fast to set up, easy to update (just change the data source), and transparent — you can see exactly what information informed the answer. It\\'s the right choice when your data changes often or when you need to cite sources.\\n\\nFine-tuning actually adjusts the model\\'s internal weights using your own examples. It\\'s better suited for teaching a model a specific style, tone, or specialized skill that goes beyond just recalling facts. It\\'s more expensive, slower to iterate on, and harder to update.\\n\\nMany production systems end up using both: fine-tuning for tone and behavior, RAG for up-to-date factual grounding.',
    date: 'Oct 05, 2026',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b5',
    title: 'Microservices vs Monoliths: What We Learned Migrating a Client\\'s Platform',
    category: 'Engineering',
    readTime: '9 min read',
    excerpt: 'Microservices solve organizational and scaling problems, not code cleanliness problems. Split along real boundaries, not out of habit.',
    content: 'A recent client came to us with a monolithic application that had grown unwieldy — one deploy touched everything, and a bug in the reporting module could take down checkout. The obvious answer seemed to be "break it into microservices." The real answer was more nuanced.\\n\\nWe migrated only the components with genuinely different scaling needs and release cadences — the reporting engine and the notification system — into separate services. The core transactional logic stayed in the monolith, because splitting it further would have added network latency and operational complexity without a clear benefit.\\n\\nThe result: deploy risk dropped significantly, since the two most failure-prone modules could now ship independently. But we avoided the common trap of over-fragmenting a system that didn\\'t need it — which usually just trades one set of problems (a tangled codebase) for another (distributed system debugging, network failures, data consistency issues).',
    date: 'Sep 30, 2026',
    image: 'https://images.unsplash.com/photo-1451187580459-434902bd0c0e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b6',
    title: 'Micro-Interactions That Make Interfaces Feel Alive',
    category: 'UI/UX Design',
    readTime: '4 min read',
    excerpt: 'The best micro-interactions are felt, not noticed. If a user consciously thinks about the animation, it\\'s probably too slow or too flashy.',
    content: 'Micro-interactions are the small, often unnoticed animations that respond to user actions — a button that subtly depresses on click, a checkbox that animates a checkmark, a form field that gently shakes on invalid input. Individually tiny, but collectively they\\'re a huge part of why some products feel polished and others feel flat.\\n\\nTheir real job is feedback: confirming that the system registered an action, without needing a separate message or alert. A save icon that briefly morphs into a checkmark tells the user "it worked" faster and more pleasantly than a toast notification ever could.\\n\\nThe key constraint is restraint. Micro-interactions should take 100–300ms — long enough to register, short enough not to feel sluggish — and should never block the user from moving on to their next action.',
    date: 'Sep 25, 2026',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b7',
    title: 'API Security Checklist for 2026',
    category: 'Engineering',
    readTime: '7 min read',
    excerpt: 'Most API breaches aren\\'t exotic — they\\'re missing basics. A short checklist, applied consistently, prevents the majority of real-world incidents.',
    content: 'APIs are the most exposed surface of most modern applications, and attackers know it. A practical, current checklist:\\n\\n* **Authentication & authorization:** Use short-lived tokens (JWT with expiry), and always check permissions server-side — never trust a hidden button in the frontend as your only protection.\\n* **Rate limiting:** Protect against brute-force and scraping by capping requests per user/IP, with stricter limits on sensitive endpoints like login.\\n* **Input validation:** Validate and sanitize everything server-side, even data your own frontend "already validated." Assume every request could be forged.\\n* **HTTPS everywhere:** No exceptions, including internal service-to-service calls.\\n* **Least privilege:** API keys and service accounts should only have access to what they actually need — not blanket admin rights for convenience.\\n* **Logging & monitoring:** Log authentication failures and unusual access patterns; you can\\'t respond to an attack you don\\'t know is happening.',
    date: 'Sep 20, 2026',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b8',
    title: 'Building Internal Tools with AI Copilots: A Practical Guide',
    category: 'AI & Automation',
    readTime: '6 min read',
    excerpt: 'The highest-ROI AI feature is often the one your own employees use, not the one customers see.',
    content: 'Customer-facing AI gets most of the attention, but some of the fastest wins come from embedding AI copilots directly into internal dashboards — the tools your own team uses every day.\\n\\nA support dashboard with an AI copilot can summarize a customer\\'s history in seconds instead of a rep scrolling through months of tickets. A sales dashboard copilot can draft a follow-up email using deal context automatically. An ops dashboard copilot can flag anomalies in a report and explain them in plain language.\\n\\nThe pattern that works best: keep the AI\\'s role narrow and specific to the tool it\\'s embedded in, give it direct access to that tool\\'s data (not a generic chatbot bolted on separately), and always let the human take the final action rather than having the AI act autonomously in internal-facing tools where mistakes are costly.',
    date: 'Sep 15, 2026',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b9',
    title: 'Designing Trust: UX Patterns for Fintech and Data-Sensitive Apps',
    category: 'UI/UX Design',
    readTime: '5 min read',
    excerpt: 'In data-sensitive products, every screen is a trust signal. Design accordingly.',
    content: 'In finance and healthcare apps, trust isn\\'t a nice-to-have — it directly affects whether users complete a transaction at all. And trust is built through interface details as much as security infrastructure.\\n\\nClear, real-time validation (confirming a bank account number is correctly formatted before submission) reduces anxiety more than a generic "processing" spinner. Showing exactly what will happen before an irreversible action — "You are transferring $500 to John\\'s Checking" — prevents costly mistakes and builds confidence. Progressive disclosure, revealing sensitive fields (like SSNs) only when truly necessary, signals that the product handles data carefully.\\n\\nEven small things matter: a masked field with a visible "show" toggle feels safer than an unmasked one, and consistent, calm error messaging ("This card was declined — try another") beats vague or alarming red banners.',
    date: 'Sep 10, 2026',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b10',
    title: 'Serverless vs Traditional Hosting: A Cost Breakdown for Growing SaaS',
    category: 'Engineering',
    readTime: '8 min read',
    excerpt: 'Serverless isn\\'t universally cheaper — it\\'s cheaper for variable, low-to-moderate traffic. Revisit the decision as you scale, not just once.',
    content: 'Serverless (like AWS Lambda or Google Cloud Functions) is often pitched as automatically cheaper — you only pay for what you use. That\\'s true at low-to-moderate, spiky traffic. It stops being true at scale.\\n\\nAt low traffic, serverless wins decisively: no idle server costs, and pricing scales down to nearly zero during quiet periods. This is ideal for early-stage SaaS products with unpredictable usage.\\n\\nAs traffic grows steady and high-volume, though, the per-invocation pricing of serverless can end up costing more than a fixed-cost server or a small cluster running the same workload continuously. Traditional hosting (VPS, dedicated servers, or reserved cloud instances) becomes more predictable and often cheaper once you\\'re consistently using the capacity you\\'re paying for.\\n\\nThe practical approach: start serverless for speed and low cost during early growth, and re-evaluate around a set traffic threshold — many teams find the crossover point between $500–$2,000/month in ongoing infrastructure spend.',
    date: 'Sep 05, 2026',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  }
];`;

const startIndex = code.indexOf('export const blogPostsData: BlogPost[] = [');
let endIndex = -1;
if (startIndex !== -1) {
  // Find the closing bracket of the array
  // Assuming the array ends at the end of the file or before another export
  endIndex = code.indexOf('];', startIndex);
  if (endIndex !== -1) {
    endIndex += 2; // include ];
  }
}

if (startIndex !== -1 && endIndex !== -1) {
  code = code.substring(0, startIndex) + newBlogData + code.substring(endIndex);
  fs.writeFileSync('src/data.ts', code);
  console.log("Successfully replaced blogPostsData in src/data.ts");
} else {
  console.error("Could not find blogPostsData in src/data.ts");
}
