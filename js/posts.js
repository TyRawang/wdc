/* ==========================================================================
   Blog content
   Add a post by adding an object to POSTS. Categories and tags are
   collected automatically, so new ones appear on their pages without
   further changes. `body` is trusted HTML written by the site owner.
   ========================================================================== */

const POSTS = [
  {
    slug: "case-study-how-i-helped-fivco-grow",
    title: "Case Study: How I Helped FIVCO Grow",
    date: "2025-09-30",
    category: "Case Studies",
    tags: ["Web Design", "Branding", "Growth"],
    image: "images/blog/case-study-fivco.jpg",
    thumb: "images/blog/case-study-fivco-300.jpg",
    excerpt:
      "A look at how a clearer website, a sharper message and a simple measurement plan gave FIVCO a stronger footing online.",
    body: `
      <p>When FIVCO first got in touch, the business had a strong reputation offline but a website that didn't reflect it. Visitors struggled to understand what the company offered, and there was no easy way to get in touch.</p>
      <h2>The challenge</h2>
      <p>The existing site had grown page by page over several years. Services were described in different ways on different pages, the mobile experience was poor, and nobody could say with confidence which pages were bringing in enquiries.</p>
      <h2>What we did</h2>
      <ul>
        <li><strong>Clarified the message.</strong> We rewrote the homepage around the problems FIVCO solves for its customers, not just a list of services.</li>
        <li><strong>Rebuilt the site mobile-first.</strong> Faster pages, larger tap targets and a contact button that is always within reach.</li>
        <li><strong>Simplified the structure.</strong> Fewer, stronger pages, each with one clear next step.</li>
        <li><strong>Set up measurement.</strong> Analytics goals for calls and form submissions, so decisions are based on data.</li>
      </ul>
      <h2>The outcome</h2>
      <p>FIVCO now has a site the team is proud to send people to, and a clear view of what is working. Just as importantly, they have a foundation they can keep building on as the business grows.</p>
    `,
  },
  {
    slug: "check-your-competitors-and-understand-how-you-can-do-better",
    title: "Check Your Competitors and Understand How You Can Do Better",
    date: "2025-09-26",
    category: "Strategy & Tips",
    tags: ["Research", "Competitors", "Startups"],
    image: "images/blog/check-competitors.jpg",
    thumb: "images/blog/check-competitors-300.jpg",
    excerpt:
      "Competitor research isn't about copying. It's about finding the gaps your customers care about and filling them better than anyone else.",
    body: `
      <p>Every business has competitors, even if they don't look exactly like you. Understanding them is one of the cheapest and most useful pieces of research you can do.</p>
      <h2>Start with the customer's view</h2>
      <p>Search for the things your customers search for. Which businesses show up? Visit their websites as if you were a buyer. How quickly can you tell what they do, what it costs and how to get started?</p>
      <h2>Look for gaps, not features</h2>
      <ul>
        <li>What questions do their sites leave unanswered?</li>
        <li>What do their reviews praise, and what do they complain about?</li>
        <li>Which customer groups are they ignoring?</li>
      </ul>
      <h2>Turn findings into action</h2>
      <p>Pick one or two gaps you can genuinely own and make them obvious on your website and in your marketing. Revisit your research every few months, because markets move quickly.</p>
    `,
  },
  {
    slug: "your-employees-are-part-of-the-effort-they-are-part-of-the-success",
    title: "Your Employees Are Part of the Effort – They Are Part of the Success",
    date: "2025-09-23",
    category: "Strategy & Tips",
    tags: ["Teamwork", "Culture", "Growth"],
    image: "images/blog/employees-success.jpg",
    thumb: "images/blog/employees-success-300.jpg",
    excerpt:
      "Growth strategies live or die with the people carrying them out. Bring your team into the plan and the plan gets better.",
    body: `
      <p>It is tempting to treat strategy as something decided at the top and handed down. In practice, the people closest to your customers often know the most about what is and isn't working.</p>
      <h2>Share the why</h2>
      <p>When people understand the goal behind a project, such as a new website or a marketing push, they make better decisions in the hundreds of small moments you will never see.</p>
      <h2>Ask before you build</h2>
      <p>Before a website project, we always speak with the people who answer the phones and reply to emails. They know the questions customers ask every day, and those questions become the content that converts.</p>
      <h2>Celebrate the wins together</h2>
      <p>When results come in, share them. Recognition builds momentum, and momentum is what turns a one-off project into lasting growth.</p>
    `,
  },
  {
    slug: "examine-every-step-to-understand-the-failures-better",
    title: "Examine Every Step to Understand the Failures Better",
    date: "2025-09-19",
    category: "Strategy & Tips",
    tags: ["Analytics", "Conversion", "Startups"],
    image: "images/blog/examine-failures.jpg",
    thumb: "images/blog/examine-failures-300.jpg",
    excerpt:
      "When something doesn't work, the answer is usually hiding in one specific step. Here's how to find it instead of guessing.",
    body: `
      <p>A campaign that doesn't deliver, or a website that gets visitors but no enquiries, can feel like a mystery. It rarely is. Break the journey into steps and the problem usually shows itself.</p>
      <h2>Map the journey</h2>
      <p>Write down every step a customer takes: how they find you, which page they land on, what they read, and how they get in touch. Each step is a place where people can drop off.</p>
      <h2>Measure each step</h2>
      <ul>
        <li>Are people arriving from the channels you expected?</li>
        <li>Do they leave the landing page straight away?</li>
        <li>Do they start the contact form but never finish it?</li>
      </ul>
      <h2>Fix one thing at a time</h2>
      <p>Change the weakest step first, measure again, then move on. Small, deliberate improvements add up much faster than a complete redesign every year.</p>
    `,
  },
  {
    slug: "hard-work-and-imagination-will-help-your-company-become-better",
    title: "Hard Work and Imagination Will Help Your Company Become Better",
    date: "2025-09-16",
    category: "Marketing",
    tags: ["Creativity", "Branding"],
    image: "images/blog/hard-work-imagination.jpg",
    thumb: "images/blog/hard-work-imagination-300.jpg",
    excerpt:
      "Consistency gets you noticed. Creativity gets you remembered. The businesses that grow combine both.",
    body: `
      <p>There's no shortcut around showing up consistently: posting regularly, answering enquiries quickly, keeping your website up to date. But consistency on its own can blend into the background.</p>
      <h2>Make room for ideas</h2>
      <p>Set aside time to try something new each quarter: a different content format, a fresh angle on your service, or a small experiment with a new channel. Most won't be breakthroughs, but the few that are can change your trajectory.</p>
      <h2>Keep your brand recognisable</h2>
      <p>Creativity works best inside a clear identity. Consistent colours, tone of voice and messaging mean every new idea still feels like you.</p>
    `,
  },
  {
    slug: "market-awareness-keep-up-to-date-with-new-trends",
    title: "Market Awareness: Keep Up to Date With New Trends",
    date: "2025-09-12",
    category: "Marketing",
    tags: ["Trends", "Research", "SEO"],
    image: "images/blog/market-awareness.jpg",
    thumb: "images/blog/market-awareness-300.jpg",
    excerpt:
      "You don't need to chase every trend, but you do need to know which ones your customers are following.",
    body: `
      <p>Digital marketing changes quickly. New platforms appear, search engines update how they rank pages, and customer expectations shift. Staying aware doesn't have to take hours each week.</p>
      <h2>Build a simple routine</h2>
      <ul>
        <li>Follow a handful of trusted industry newsletters.</li>
        <li>Check your analytics monthly for changes in where visitors come from.</li>
        <li>Ask new customers how they found you.</li>
      </ul>
      <h2>Filter ruthlessly</h2>
      <p>For each trend, ask one question: will this help my customers find, trust or buy from me? If the answer is no, it can wait.</p>
    `,
  },
  {
    slug: "a-well-designed-website-is-the-foundation-of-every-strong-digital-strategy",
    title: "A Well-Designed Website Is the Foundation of Every Strong Digital Strategy",
    date: "2025-09-09",
    category: "Web Design",
    tags: ["Web Design", "SEO", "Conversion"],
    image: "images/blog/well-designed-website.jpg",
    thumb: "images/blog/well-designed-website-300.jpg",
    excerpt:
      "Social posts, ads and emails all point somewhere. If that somewhere is a slow or confusing website, the rest of your marketing is wasted.",
    body: `
      <p>Your website is the one piece of your online presence you fully own. Every other channel, whether social media, ads, email or search, eventually sends people there.</p>
      <h2>What "well-designed" really means</h2>
      <ul>
        <li><strong>Clear:</strong> visitors understand what you do within a few seconds.</li>
        <li><strong>Fast:</strong> pages load quickly, especially on mobile.</li>
        <li><strong>Accessible:</strong> everyone can use it, including people using screen readers or keyboards.</li>
        <li><strong>Focused:</strong> every page has one obvious next step.</li>
      </ul>
      <h2>Design supports search, too</h2>
      <p>Search engines reward the same things people do: fast, well-structured pages with helpful content. A good design and good SEO go hand in hand.</p>
    `,
  },
  {
    slug: "monitor-your-sales-and-success-every-day-for-better-results",
    title: "Monitor Your Sales and Success Every Day for Better Results",
    date: "2025-09-05",
    category: "Strategy & Tips",
    tags: ["Analytics", "Growth", "Sales"],
    image: "images/blog/monitor-sales.jpg",
    thumb: "images/blog/monitor-sales-300.jpg",
    excerpt:
      "A few minutes a day with the right numbers beats a long report once a quarter. Here's what to watch.",
    body: `
      <p>Many small businesses only look at their numbers when something goes wrong. A short daily check helps you spot problems early and double down on what's working.</p>
      <h2>Choose a few key numbers</h2>
      <ul>
        <li>New enquiries or sales</li>
        <li>Website visitors and where they came from</li>
        <li>Conversion rate: how many visitors take action</li>
      </ul>
      <h2>Look for change, not perfection</h2>
      <p>The daily number matters less than the trend. A dashboard that shows this week against last week makes changes obvious at a glance.</p>
      <h2>Act on what you see</h2>
      <p>Data is only useful if it changes what you do. When a number moves, ask why, then decide on one small action to test.</p>
    `,
  },
];
