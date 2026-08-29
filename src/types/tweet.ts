export interface TweetEntry {
  id: string;
  image: string;
  aspectRatio: number; // Width / Height
  placeholderColor?: string;
  createdAt?: string;
}

export const DEMO_TWEETS: TweetEntry[] = [
  {
    id: "pin-1",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 0.667, // 2:3 Vertical
    placeholderColor: "#1d1f2b",
    createdAt: "2026-08-28T12:00:00Z"
  },
  {
    id: "pin-2",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 1.25, // 5:4 Landscape
    placeholderColor: "#2a1b3d",
    createdAt: "2026-08-27T15:30:00Z"
  },
  {
    id: "pin-3",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 0.75, // 3:4 Portrait
    placeholderColor: "#2b2b28",
    createdAt: "2026-08-26T09:15:00Z"
  },
  {
    id: "pin-4",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 0.8, // 4:5 Portrait
    placeholderColor: "#3d1f28",
    createdAt: "2026-08-25T18:20:00Z"
  },
  {
    id: "pin-5",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 1.5, // 3:2 Landscape
    placeholderColor: "#1e1e1e",
    createdAt: "2026-08-24T11:45:00Z"
  },
  {
    id: "pin-6",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 1.0, // 1:1 Square
    placeholderColor: "#17262a",
    createdAt: "2026-08-23T14:10:00Z"
  },
  {
    id: "pin-7",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 0.667, // 2:3 Vertical
    placeholderColor: "#22252a",
    createdAt: "2026-08-22T16:00:00Z"
  },
  {
    id: "pin-8",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 1.333, // 4:3 Landscape
    placeholderColor: "#1b1425",
    createdAt: "2026-08-21T20:30:00Z"
  },
  {
    id: "pin-9",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 0.75, // 3:4 Portrait
    placeholderColor: "#29241f",
    createdAt: "2026-08-20T10:05:00Z"
  },
  {
    id: "pin-10",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 1.4, // 7:5 Landscape
    placeholderColor: "#191a1c",
    createdAt: "2026-08-19T08:50:00Z"
  },
  {
    id: "pin-11",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 0.667, // 2:3 Vertical
    placeholderColor: "#1a1f2c",
    createdAt: "2026-08-18T11:20:00Z"
  },
  {
    id: "pin-12",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: 1.2, // 6:5 Landscape
    placeholderColor: "#2d201a",
    createdAt: "2026-08-17T17:15:00Z"
  }
];
