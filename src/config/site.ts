export const siteConfig = {
  name: "2x",
  author: "Turash Ahsan",
  jobTitle: "Product Designer",
  domain: "turashahsan.vercel.app",
  url: "https://turashahsan.vercel.app",
  storageKey: "ta-portfolio-content",
  adminPin: "200836",
};

// Navbar A/B test. Set to 2 to ship default-version-2, or 1 to roll back to the original.
// Component: NavbarV2 lives in src/components/Navbar/NavbarV2.tsx
export const NAVBAR_VERSION = 2 as const;
