/** Quick-fill options for profile forms (Lipa City / Batangas context) */

export const LIPA_SCHOOLS = [
  'Lipa City National High School',
  'Batangas State University - LIPA Campus',
  'University of Batangas - Lipa',
  'Kolehiyo ng Lungsod ng Lipa',
  'TESDA Lipa City',
  'Lima Park International School',
  'Saint Benedict School of Lipa',
  'De La Salle Lipa',
  'Other (type below)',
];

export const DEGREE_OPTIONS = [
  'Senior High School',
  'High School Diploma',
  'Associate Degree',
  'Bachelor of Science in Information Technology',
  'Bachelor of Science in Computer Science',
  'Bachelor of Science in Business Administration',
  'Bachelor of Science in Hospitality Management',
  'Bachelor of Science in Accountancy',
  'TESDA NC II Certification',
  'TESDA NC III Certification',
  'Vocational / Technical Course',
  'Currently Enrolled',
  'Other (type below)',
];

export const GRADUATION_YEARS = (() => {
  const years: string[] = [];
  const current = new Date().getFullYear();
  for (let y = current + 2; y >= current - 30; y--) {
    years.push(String(y));
  }
  years.push('Present / Ongoing');
  return years;
})();

export const MARKET_SKILLS_SUGGESTIONS = [
  'Microsoft Excel',
  'SQL',
  'Python',
  'Data Visualization',
  'React',
  'TypeScript',
  'Customer Service',
  'Technical Support',
  'Computer Literacy',
  'Communication',
  'Team Collaboration',
  'Problem Solving',
  'Time Management',
  'Basic Accounting',
  'Digital Marketing',
  'Graphic Design',
  'Networking',
  'Project Coordination',
];

export const JOB_TITLE_SUGGESTIONS = [
  'Service Crew',
  'Sales Associate',
  'Administrative Assistant',
  'IT Support Staff',
  'Data Entry Specialist',
  'Customer Support Representative',
  'OJT Trainee',
  'Production Operator',
  'Cashier',
  'Warehouse Assistant',
];

export const COMPANY_SUGGESTIONS = [
  'LIMA Technology Center',
  'Local BPO Company',
  'Retail Store - Lipa City',
  'City Government Annex',
  'Food Service Establishment',
  'Manufacturing Plant',
  'Self-employed / Freelance',
];

export const ACHIEVEMENT_SUGGESTIONS = [
  'Employee of the Month',
  'Dean\'s Lister',
  'TESDA Competency Passer',
  'Leadership Award',
  'Community Service Recognition',
  'Perfect Attendance',
];
