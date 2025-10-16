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
    progress: 55,
    due_date: "2025-12-31",
  },
  {
    id: "2",
    milestone: "STEM Lab Upgrade",
    status: "In Progress",
    progress: 70,
    due_date: "2024-06-30",
  },
  {
    id: "3",
    milestone: "Library Expansion Project",
    status: "In Progress",
    progress: 10,
    due_date: "2026-06-30",
  },
  {
    id: "4",
    milestone: "Soccer Field Turf Installation",
    status: "In Progress",
    progress: 43,
    due_date: "2024-08-15",
  },
  {
    id: "5",
    milestone: "Robotics Program Launch",
    status: "In Progress",
    progress: 80,
    due_date: "2025-09-30",
  },
];
