
import { ProfileData } from './types';

export const profileData: ProfileData = {
  name: "PURUSHOTHAM REDDY TIYYAGURA",
  title: "Full-Stack Engineer & AI Architect",
  bio: "I build bridges between sophisticated backend systems and intuitive user experiences. Specializing in high-performance React applications and generative AI integrations.",
  email: "purushothamreddy454@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/purushothamreddytiyyagura/",
    github: "https://github.com/Purushothamreddy23",
    //twitter: "https://twitter.com"
  },
  skills: [
    { name: "C++", level: 5, category: "Programming Languages" },
    { name: "Python", level: 5, category: "Programming Languages" },
    { name: "SQL", level: 5, category: "Programming Languages" },
    { name: "React.js", level: 5, category: "Frontend" },
    { name: "Node.js", level: 5, category: "Backend" },
    { name: "MySQL", level: 5, category: "Databases" },
    { name: "Supabase", level: 5, category: "Databases" },
    { name: "NumPy", level: 5, category: "Machine Learning" },
    { name: "Pandas", level: 5, category: "Machine Learning" },
    { name: "TensorFlow", level: 5, category: "Machine Learning" },
    { name: "Scikit-learn", level: 5, category: "Machine Learning" },
    { name: "Git", level: 5, category: "Tools" },
    { name: "GitHub", level: 5, category: "Tools" },
    { name: "Data Analysis Tools", level: 5, category: "Tools" },
    { name: "Data Structures & Algorithms", level: 5, category: "Computer Fundamentals" },
    { name: "Operating Systems", level: 5, category: "Computer Fundamentals" },
    { name: "Computer Networks", level: 5, category: "Computer Fundamentals" }
  ],
  education: [
    {
      id: "edu1",
      institution: "Amrita Vishwa Vidyapeetham University",
      degree: "B.Tech. in Computer Science",
      period: "2022 - 2026",
      grade: "7.67 CGPA"
    },
    {
      id: "edu2",
      institution: "Sri Chaitanya Junior College ",
      degree: "Senior Secondary Education (12th Std)",
      period: "2020-2022",
      grade: "68.8%"
    },
    {
      id: "edu2",
      institution: "Bhashyam High School",
      degree: "Secondary School (10th Std)",
      period: "2019-2020",
      grade: "98.6%"
    }
  ],
  experience: [
    {
      id: "exp1",
      company: "TechNexus Solutions",
      position: "Senior Frontend Engineer",
      period: "2022 - Present",
      description: [
        "Led a team of 5 developers to rebuild the core dashboard using React 18, improving performance by 40%.",
        "Implemented a custom design system that reduced development time for new features by 25%.",
        "Orchestrated the integration of Gemini AI to power smart documentation searching."
      ],
      skills: ["React", "TypeScript", "Tailwind", "Gemini API"]
    },
    {
      id: "exp2",
      company: "Innovate Labs",
      position: "Full Stack Developer",
      period: "2020 - 2022",
      description: [
        "Developed and maintained 15+ microservices using Node.js and Python.",
        "Engineered a real-time collaboration tool that handled over 10k concurrent users.",
        "Optimized database queries reducing latency by 150ms on average."
      ],
      skills: ["Node.js", "Express", "MongoDB", "Socket.io"]
    }
  ],
  projects: [
    {
      id: "p1",
      title: "HERNEST",
      description: "Menstrual health platform for women offering cycle tracking, virtual consultations with doctors, and pharmacy access",
      imageUrl: "images/hernest.png",
      tags: ["React", "Typescript", "Node.js", "PostgreSQL"],
      link: "https://example.com/project1",
      github: "https://github.com/alexsterling/ai-canvas"
    },
    {
      id: "p2",
      title: "LLM4LAW",
      description: "AI-based legal assistant platform for lawyers, law firms, and the general public using fine-tuned LLMs and RAG, with features for legal document retrieval, analysis, chatbot assistance",
      imageUrl: "images/llm4law.png",
      tags: ["Python", "Machine-Learning", "RAG"],
      link: "https://example.com/project2",
      github: "https://github.com/alexsterling/quantum-analytics"
    },

  ],
  certificates: [
    {
      id: "c1",
      title: "AWS Cloud Partationer",

      issuer: "AWS",
      date: "2024",
      imageUrl: "images/aws.png",
      link: "https://cp.certmetrics.com/amazon/en/public/verify/credential/919ead960ed041ddba8049e3d36e840d",

    },
    {
      id: "c2",
      title: "Salesforce Certified AI Associate",
      issuer: "Frontend Masters",
      date: "2022",
      imageUrl: "images/sales.png",
      link: "https://www.salesforce.com/trailblazer/umfhamtlp6e1f75fcc",

    }
  ]
};
