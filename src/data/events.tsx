import banner from "../assets/olympiad-banner.jpg";

export interface Event {
  name: string;
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  status: "completed" | "ongoing" | "upcoming";
  image: string;
  highlights?: string;
  registration?: string;
  deadline?: string;
  call?: string;
  note?: string;
}

export interface CompetitionEvent {
  id: string;
  name: string;
  category: "Team" | "Individual";
  gender?: "M" | "F" | "M/F";
  is_team_event?: boolean;
}

export const events: Event[] = [
  {
    id: "5",
    title: "Gold Stream Olympiad",
    description: "Students from different schools represent their schools in different activities.",
    image: banner,
    date: "2025-11-25",
    category: "School",
    status: "upcoming",
    registration: "Registration ends Oct 15",
    deadline: "October 15, 2025",
    name: "Gold Stream Olympiad"
  },
  {
    id: "1",
    title: "Spring Soccer Tournament",
    description: "Join us for an exciting soccer tournament featuring our U12 teams.",
    image: "https://st4.depositphotos.com/16425974/27359/i/450/depositphotos_273597990-stock-photo-diverse-children-playing-soccer-football.jpg",
    date: "2024-05-20",
    category: "Sports",
    status: "completed",
    highlights: "U12 team won 3-2!",
    name: "Football (M)"
  },
  {
    id: "2",
    title: "Science Fair 2024",
    description: "Students present innovative projects in our annual science fair.",
    image: "https://dc79r36mj3c9w.cloudfront.net/prod/filer_public/pbs-education-blogs-bento-live-pbs/26461979c7_Inspire-Children-to-think-and-act-like-scientists.jpeg",
    date: "2024-08-10",
    category: "Science",
    status: "upcoming",
    registration: "Register by Aug 5",
    deadline: "August 5, 2024",
    name: "Science Fair"
  },
];

export const teamEvents: CompetitionEvent[] = [
  { id: "1", name: "Football (M)", category: "Team", gender: "M", is_team_event: true },
  { id: "2", name: "Basketball (F)", category: "Team", gender: "F", is_team_event: true },
  { id: "3", name: "Athletics (4x400, 4x100) (M)", category: "Team", gender: "M", is_team_event: true },
  { id: "4", name: "Athletics (4x400, 4x100) (F)", category: "Team", gender: "F", is_team_event: true },
  { id: "5", name: "Singing", category: "Team", is_team_event: true },
  { id: "6", name: "Dancing", category: "Team", is_team_event: true },
  { id: "7", name: "Word/Poetry", category: "Team", is_team_event: true },
];

export const individualEvents: CompetitionEvent[] = [
  { id: "8", name: "Lawn Tennis (M)", category: "Individual", gender: "M" },
  { id: "9", name: "Lawn Tennis (F)", category: "Individual", gender: "F" },
  { id: "10", name: "Table Tennis (M)", category: "Individual", gender: "M" },
  { id: "11", name: "Table Tennis (F)", category: "Individual", gender: "F" },
  { id: "12", name: "Swimming (M/F)", category: "Individual", gender: "M/F" },
  { id: "13", name: "Athletics (100m; 200m; 400m; 800m; 1500m) (M)", category: "Individual", gender: "M" },
  { id: "14", name: "Athletics (100m; 200m; 400m; 800m; 1500m) (F)", category: "Individual", gender: "F" },
  { id: "15", name: "Singing", category: "Individual" },
  { id: "16", name: "Dancing", category: "Individual" },
  { id: "17", name: "Word/Poetry", category: "Individual" },
];