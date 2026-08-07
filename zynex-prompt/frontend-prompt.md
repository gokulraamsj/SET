# VERTEX — Frontend Build Prompt (React + CSS)

**Project:** "VERTEX" — A dark-themed, futuristic landing page for a college
tech department/club (AI & DS | AI & ML), built with React and plain CSS.

## 1. Tech Stack & Setup
- React (Vite or CRA) — functional components + hooks only
- Plain CSS (CSS Modules or one global `styles.css` per section — no Tailwind/Bootstrap)
- React Router (only if multiple pages like Dashboard/Login are separate routes)
- Icons: `react-icons` or `lucide-react`
- Fonts: a bold futuristic/tech sans-serif (e.g. "Orbitron", "Rajdhani", or
  "Poppins" from Google Fonts) for headings, clean sans (Inter/Roboto) for body text

## 2. Overall Theme
- Pure black / near-black background (`#0a0a0a` – `#111`)
- Neon gradient accents: pink → purple → blue (used on logo, active nav,
  glowing card borders)
- Subtle glassmorphism on cards (dark translucent background, thin border,
  soft glow on hover)
- Generous vertical spacing between sections, centered content, max-width
  container (~1200–1300px)

## 3. Components to Build

### Navbar (sticky/fixed top)
- Logo left ("VERTEX" wordmark + small icon)
- Center nav links: Home, Clubs, Team, Events, Results, Contact
- Right side: notification bell icon, "Dashboard" button (outlined),
  "Login" button (filled/accent)
- Transparent background over hero, slightly opaque with blur on scroll

### Hero Section
- Center-aligned large glowing gradient logo/icon (abstract "NA"-style mark)
- Tagline: as a large stylized wordmark below the icon
- Small label above: "DEPARTMENT OF"
- Sub-label: "AI & DS | AI & ML" in gradient/colored text
- Two pill-shaped CTA buttons: "Join Community" (filled) and
  "Explore Events" (outlined)
- Full viewport height, faint background pattern/particles optional

### Clubs Section
- Section label ("CLUBS") + big heading
- Responsive grid (3 columns desktop → 1 column mobile) of club cards
- Each card: large stylized club logo/wordmark image on dark background,
  club name, short tagline ("A Technical Club"), "Explore →" link
- Hover effect: border glow + slight scale/lift

### Team Section
- Section label + "THE TEAM" heading
- Horizontal carousel/slider of team member cards (prev/next arrow
  controls, dots optional)
- Center card larger/highlighted, side cards partially visible and dimmed
  (coverflow effect)
- Each card: photo, role badge (e.g. "President"), name, small social
  icons (LinkedIn, phone/contact)
- Repeatable component — multiple teams (e.g. "The Team" appears twice
  for different groups/years)

### Events Section
- Section label + "EVENTS" heading
- Filter tabs: All / Hackathon / Coding / Design / Paper Presentation
  (active tab highlighted)
- Search input aligned right
- Grid of event cards (2 columns): banner image/graphic at top, event
  title, description (truncated), date, venue, organizer/sponsor tag,
  "View Details" button at bottom

### Contact ("Let's Connect") Section
- Two-column layout: left = heading, description text, Email Us / Visit Us
  info blocks with icons; right = a styled contact form card
  (Your Name, Email Address, Subject, Details textarea,
  "Dispatch Message" submit button)
- Dark card background with border glow on the form

### Footer
- Logo + short tagline left
- Three columns: Quick Links, Legal & Support, Headquarters
  (address, emails)
- Bottom bar: copyright text + "Built by [team]" credit
- Subtle top border/divider with gradient line

## 4. Responsiveness
- Fully responsive: navbar collapses to hamburger menu on mobile,
  clubs/events grids stack to 1 column, team carousel remains swipeable
  on touch

## 5. Interactions
- Smooth scroll for nav links to section IDs
- Hover glow/scale transitions on cards and buttons
  (use CSS `transition` + `box-shadow`)
- Team carousel: arrow-click or swipe navigation with smooth slide
  animation

## 6. Deliverables
- Component folder structure: `Navbar`, `Hero`, `Clubs`, `Team`, `Events`,
  `Contact`, `Footer`
- Each component with its own CSS file
- Placeholder/dummy data (clubs, team members, events) in a local
  `data.js` file so it's easy to later swap for API calls from the
  Python/MongoDB backend
