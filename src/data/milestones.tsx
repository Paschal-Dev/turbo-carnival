type Milestone = {
  id: string;
  milestone: string;
  status: string;
  progress: number;
  due_date: string;
};

export const milestones: Milestone[] = [
  {
    id: "1",
    milestone: "New Sports Facility Construction",
    status: "In Progress",
    progress: 65,
    due_date: "2025-12-31",
  },
  {
    id: "2",
    milestone: "STEM Lab Upgrade",
    status: "Completed",
    progress: 100,
    due_date: "2024-06-30",
  },
  {
    id: "3",
    milestone: "Performing Arts Center Renovation",
    status: "In Progress",
    progress: 40,
    due_date: "2026-03-31",
  },
  {
    id: "4",
    milestone: "Library Expansion Project",
    status: "Planned",
    progress: 10,
    due_date: "2026-06-30",
  },
  {
    id: "5",
    milestone: "Soccer Field Turf Installation",
    status: "Completed",
    progress: 100,
    due_date: "2024-08-15",
  },
  {
    id: "6",
    milestone: "Robotics Program Launch",
    status: "In Progress",
    progress: 80,
    due_date: "2025-09-30",
  },
];
