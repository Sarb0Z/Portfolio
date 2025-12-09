import { TechStack } from '@/components/techStack'
interface ProjectDataProps {
  title: string
  description: string
  imgSrc: string
  href: string
  techStack: TechStack[]
}

// change deez
const projectsData: ProjectDataProps[] = [
  {
    title: 'College Student API: FastAPI with MongoDB',
    description: `Developed a high-performance API using FastAPI and MongoDB Cloud Database for managing college student information. It includes CRUD operations and secure data handling. The API is deployed with Docker for easy setup and scalability. Features a scholarship recommendation system powered by RAG (Retrieval-Augmented Generation) that scrapes and aggregates college information from various sources to provide personalized scholarship matches for students.`,
    imgSrc: '/static/images/FastAPI_MongDB.png',
    href: 'https://instudi.com',
    techStack: ['Python', 'FastAPI', 'MongoDB', 'Docker'],
  },
  {
    title: 'Gamified ASD Intervention',
    description:
      'A gamified approach utilizing HCI technologies to aid emotional development in children with ASD. Features a computer vision pipeline with OpenCV and ResNet for real-time emotion recognition, integrated into a Unity-based game to provide interactive feedback and lessons.',
    imgSrc: '/static/images/level_select.png',
    href: '#',
    techStack: ['Python', 'PyTorch', 'C++'],
  },
  {
    title: 'Candy Crush Clone',
    description:
      'A fully-featured Candy Crush clone built from scratch using C++ and SFML. This project was an early deep dive into low-level graphics programming, requiring me to learn about shaders, sprite rendering, and the intricacies of dynamic vs static linking for compilers. Features include match-3 gameplay mechanics, special candy combinations (striped, wrapped, color bombs), save/load game state, and a scoring system.',
    imgSrc: '/static/images/candy-crush.png',
    href: 'https://github.com/Sarb0Z/CandyCrush',
    techStack: ['C++', 'SFML', 'VisualStudio'],
  },
]

export default projectsData
