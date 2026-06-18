import { Publication } from '@/types';

export const publications: Publication[] = [
  {
    id: 'percom-2025',
    title: 'Kissan-Dost: Bridging the Last Mile in Smallholder Precision Agriculture with Conversational IoT',
    authors: ['Muhammad Saad Ali', 'Daanish U. Khan', 'Laiba Intizar Ahmad', 'Umer Irfan', 'Maryam Mustafa', 'Naveed Anwar Bhatti', 'Muhammad Hamad Alizai'],
    year: 2025,
    status: 'under-review',
    description: 'This paper presents Kissan-Dost, a multilingual sensor-grounded conversational system that turns live on-farm measurements and weather into plain-language guidance delivered over WhatsApp. A 90-day pilot showed sustained daily engagement and concrete farming decisions, unlike traditional dashboards.',
    pdfPath: '/papers/kissan-dost.pdf',
  },
  {
    id: 'poster-2024',
    title: 'Poster: Bridging IoT Gaps in Developing Regions with LLMs',
    authors: ['Muhammad Saad Ali', 'Daanish Uddin Khan', 'Laiba Ahmed Intazar', 'Areeba Shahzad', 'Maham Zahid', 'Mohammad Shaharyar Ahsan', 'Naveed Anwar Bhatti', 'Muhammad Hamad Alizai'],
    venue: 'ACM UbiComp/ISWC Adjunct Proceedings',
    year: 2024,
    status: 'published',
    link: 'https://doi.org/10.1145/3675094.3677560',
    description: 'We investigate integrating Large Language Models with IoT to address adoption challenges in developing regions. LLMs simplify complex IoT data into actionable insights, with use cases in agriculture and healthcare illustrating the transformative potential for underserved communities.',
    pdfPath: '/papers/iot-llm-poster.pdf',
  },
];
