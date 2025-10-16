import banner from "../assets/olympiad-banner.jpg";

export interface Event {
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

export const events: Event[] = [
  {
    id: "5",
    title: "Gold Stream Olympiad",
    description:
      "Students from different schools represent their schools in different activities.",
    image: banner,
    date: "2025-10-27",
    category: "School",
    status: "upcoming",
    registration: "Registration ends Oct 15",
    deadline: "October 15, 2025",
  },
  {
    id: "1",
    title: "Spring Soccer Tournament",
    description:
      "Join us for an exciting soccer tournament featuring our U12 teams.",
    image:
      "https://st4.depositphotos.com/16425974/27359/i/450/depositphotos_273597990-stock-photo-diverse-children-playing-soccer-football.jpg",
    date: "2024-05-20",
    category: "Sports",
    status: "completed",
    highlights: "U12 team won 3-2!",
  },
  {
    id: "2",
    title: "Science Fair 2024",
    description:
      "Students present innovative projects in our annual science fair.",
    image:
      "https://dc79r36mj3c9w.cloudfront.net/prod/filer_public/pbs-education-blogs-bento-live-pbs/26461979c7_Inspire-Children-to-think-and-act-like-scientists.jpeg",
    date: "2024-08-10",
    category: "Science",
    status: "upcoming",
    registration: "Register by Aug 5",
    deadline: "August 5, 2024",
  },
  {
    id: "3",
    title: "School Musical",
    description:
      "Our students perform a vibrant musical showcasing their talents.",
    image:
      "https://welltempered.wordpress.com/wp-content/uploads/2015/08/project-step.jpg",
    date: "2024-06-15",
    category: "Music",
    status: "ongoing",
    note: "Live stream available",
  },
  {
    id: "4",
    title: "Art Exhibition",
    description: "Showcasing student artwork in our annual art exhibition.",
    image:
      "https://d3n8a8pro7vhmx.cloudfront.net/onedctrac/mailings/2831/attachments/original/children_pic_for_nl.jpg?1533075431",
    date: "2024-07-01",
    category: "School",
    status: "completed",
    call: "Submit artwork by June 25",
    highlights: "Over 50 student artworks displayed!",
  },
  {
    id: "6",
    title: "Cultural Day",
    description:
      "Experience the diversity and creativity of our students on Cultural Day.",
    image:
      "https://img.freepik.com/free-photo/kids-having-fun-school_23-2149206005.jpg",
    date: "2025-01-10",
    category: "School",
    status: "upcoming",
  },
];
