import { Job } from '../components/Jobs/JobCard';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: "Junior Data Analyst",
    company: "LIMA Technology Center",
    location: "Malvar-Lipa Border",
    salary: "₱25,000 - ₱35,000",
    type: "Full-time",
    matchScore: 92,
    tags: ["Excel", "SQL", "Python", "Tableau", "Data Viz"],
    userSkills: ["excel", "sql", "data viz"],
    gaps: ["Python", "Tableau"],
    description: "Analyze large datasets for manufacturing efficiency. Looking for fresh BSIT/BSCS grads with strong analytical mindset."
  },
  {
    id: '2',
    title: "Frontend Developer",
    company: "NextGen Lipa BPO",
    location: "Ayala Highway, Lipa",
    salary: "₱30,000 - ₱45,000",
    type: "Full-time",
    matchScore: 68,
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion", "Git"],
    userSkills: ["tailwind", "git"],
    gaps: ["React", "TypeScript", "Framer Motion"],
    description: "Design and implement responsive web interfaces for international clients. Knowledge of modern React hooks is a plus."
  },
  {
    id: '3',
    title: "IT Support Technician",
    company: "City Hall Annex",
    location: "Lipa City Hall",
    salary: "₱18,000 - ₱22,000",
    type: "OJT / Internship",
    matchScore: 85,
    tags: ["Networking", "Hardware", "Troubleshooting", "Windows Server"],
    userSkills: ["networking", "hardware", "troubleshooting"],
    gaps: ["Windows Server"],
    description: "Provide technical assistance to city government employees. Strong problem-solving skills required."
  }
];
