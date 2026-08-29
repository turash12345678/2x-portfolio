export interface TweetEntry {
  id: string;
  title: string;
  image: string;
  aspectRatio: number; // Width / Height (e.g., 0.75, 1.33, 0.67, 1.0)
  placeholderColor?: string;
  caption?: string;
  backlink?: string;
  likes?: number;
  retweets?: number;
  isPinned?: boolean;
  createdAt?: string;
}

export const DEMO_TWEETS: TweetEntry[] = [
  {
    id: "tweet-1",
    title: "Minimalist Brand Identity & Visual Architecture",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 0.667, // 2:3 Vertical
    placeholderColor: "#1d1f2b",
    caption: "Exploring dark mode UI aesthetics and typography scales for next-gen creative web tools.",
    likes: 342,
    retweets: 89,
    isPinned: true,
    createdAt: "2026-08-28T12:00:00Z"
  },
  {
    id: "tweet-2",
    title: "3D Dynamic Geometry & Kinetic Motion",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 1.25, // 5:4 Landscape
    placeholderColor: "#2a1b3d",
    caption: "Procedural shader experiment built with WebGL and React Three Fiber.",
    likes: 512,
    retweets: 143,
    createdAt: "2026-08-27T15:30:00Z"
  },
  {
    id: "tweet-3",
    title: "Ergonomic Studio Setup & Minimalist Desk",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 0.75, // 3:4 Portrait
    placeholderColor: "#2b2b28",
    caption: "Current workstation for design systems & frontend architecture experiments.",
    likes: 820,
    retweets: 204,
    isPinned: true,
    createdAt: "2026-08-26T09:15:00Z"
  },
  {
    id: "tweet-4",
    title: "Abstract Fluid Gradient Systems",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 0.8, // 4:5 Portrait
    placeholderColor: "#3d1f28",
    caption: "Curating smooth gradient blends for ultra-clean mobile dashboard cards.",
    likes: 419,
    retweets: 96,
    createdAt: "2026-08-25T18:20:00Z"
  },
  {
    id: "tweet-5",
    title: "High-Contrast Monochrome Layout",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 1.5, // 3:2 Landscape
    placeholderColor: "#1e1e1e",
    caption: "Swiss design inspiration: grid discipline, stark contrast, and bold typography.",
    likes: 673,
    retweets: 178,
    createdAt: "2026-08-24T11:45:00Z"
  },
  {
    id: "tweet-6",
    title: "Interactive Micro-Animations & UI Components",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 1.0, // 1:1 Square
    placeholderColor: "#17262a",
    caption: "Testing responsive hover state spring physics with Framer Motion.",
    likes: 290,
    retweets: 54,
    createdAt: "2026-08-23T14:10:00Z"
  },
  {
    id: "tweet-7",
    title: "Architectural Symmetry & Glassmorphism",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 0.667, // 2:3 Vertical
    placeholderColor: "#22252a",
    caption: "Layered glass translucent UI card mockups for desktop client interfaces.",
    likes: 915,
    retweets: 310,
    createdAt: "2026-08-22T16:00:00Z"
  },
  {
    id: "tweet-8",
    title: "Cyberpunk Visual Palette & Neon Accents",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 1.333, // 4:3 Landscape
    placeholderColor: "#1b1425",
    caption: "Vibrant neon lighting study for futuristic mobile application themes.",
    likes: 540,
    retweets: 112,
    createdAt: "2026-08-21T20:30:00Z"
  },
  {
    id: "tweet-9",
    title: "Organic 3D Shapes & Spatial Design",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 0.75, // 3:4 Portrait
    placeholderColor: "#29241f",
    caption: "Prototyping spatial navigation cards for immersive web experiences.",
    likes: 723,
    retweets: 165,
    createdAt: "2026-08-20T10:05:00Z"
  },
  {
    id: "tweet-10",
    title: "Dark Minimalist Portfolio Showcase",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 1.4, // 7:5 Landscape
    placeholderColor: "#191a1c",
    caption: "Clean, distraction-free portfolio showcase design engineered for speed.",
    likes: 1040,
    retweets: 412,
    createdAt: "2026-08-19T08:50:00Z"
  }
];
