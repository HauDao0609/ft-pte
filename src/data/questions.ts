// ============================================================
// STATIC DATA - Replace with API calls when integrating backend
// ============================================================

export type QuestionType =
  | 'read_aloud' | 'repeat_sentence' | 'describe_image' | 'retell_lecture' | 'answer_short'
  | 'summarize_written' | 'write_essay'
  | 'reading_mcs' | 'reading_mcm' | 'reorder_paragraphs' | 'fib_dragdrop' | 'fib_dropdown'
  | 'summarize_spoken' | 'listening_mcm' | 'listening_mcs' | 'highlight_summary'
  | 'select_missing' | 'listening_fib' | 'highlight_incorrect' | 'write_dictation';

export interface Question {
  id: number;
  type: QuestionType;
  title: string;
  isPredicted?: boolean;
  isNew?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  attemptCount?: number;
  accuracy?: number;
  tags?: string[];
}

// ---- READ ALOUD ----
export interface ReadAloudQuestion extends Question {
  type: 'read_aloud';
  text: string;
}

export const readAloudQuestions: ReadAloudQuestion[] = [
  {
    id: 1, type: 'read_aloud', isPredicted: true, isNew: true, difficulty: 'medium',
    title: 'Climate Change Effects',
    attemptCount: 1240, accuracy: 72,
    tags: ['environment', 'science'],
    text: 'Climate change is affecting ecosystems around the world in profound and sometimes irreversible ways. Rising temperatures, changing precipitation patterns, and more frequent extreme weather events are all driving shifts in the distribution and behavior of species, as well as disrupting the services that ecosystems provide to humans.'
  },
  {
    id: 2, type: 'read_aloud', isPredicted: true, difficulty: 'hard',
    title: 'Quantum Computing Advances',
    attemptCount: 890, accuracy: 65,
    tags: ['technology', 'science'],
    text: 'Quantum computing represents a fundamental shift in how we process information. Unlike classical computers that use bits representing zero or one, quantum computers use quantum bits, or qubits, which can represent zero, one, or both simultaneously through a phenomenon known as superposition, enabling them to solve certain complex problems exponentially faster.'
  },
  {
    id: 3, type: 'read_aloud', difficulty: 'easy',
    title: 'Urban Planning Principles',
    attemptCount: 2100, accuracy: 81,
    tags: ['society', 'architecture'],
    text: 'Effective urban planning requires balancing the needs of diverse communities while managing limited resources. Modern cities face complex challenges including traffic congestion, housing affordability, and environmental sustainability. Planners must consider both immediate needs and long-term consequences when making decisions about land use and infrastructure development.'
  },
  {
    id: 4, type: 'read_aloud', isPredicted: true, difficulty: 'medium',
    title: 'Neuroplasticity Research',
    attemptCount: 560, accuracy: 68,
    tags: ['biology', 'psychology'],
    text: 'Neuroplasticity refers to the brain\'s remarkable ability to reorganize itself by forming new neural connections throughout life. This adaptive capacity allows the neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or changes in the environment.'
  },
  {
    id: 5, type: 'read_aloud', difficulty: 'hard',
    title: 'Economic Inequality',
    attemptCount: 730, accuracy: 70,
    tags: ['economics', 'society'],
    text: 'Economic inequality has become one of the defining challenges of our time. The gap between the wealthy and the poor has widened considerably in many countries over recent decades, driven by technological change, globalization, and policy choices. This divergence has profound implications for social mobility, democratic institutions, and overall societal wellbeing.'
  },
  {
    id: 6, type: 'read_aloud', isNew: true, difficulty: 'medium',
    title: 'Renewable Energy Transition',
    attemptCount: 320, accuracy: 75,
    tags: ['environment', 'technology'],
    text: 'The transition to renewable energy sources is accelerating globally as the costs of solar and wind power continue to fall dramatically. Many countries are now setting ambitious targets for reducing carbon emissions and phasing out fossil fuels. However, this transition requires significant investment in new infrastructure and presents challenges for grid stability and energy storage.'
  },
];

// ---- REPEAT SENTENCE ----
export interface RepeatSentenceQuestion extends Question {
  type: 'repeat_sentence';
  audioUrl?: string; // placeholder
  transcript: string;
  duration: number; // seconds
}

export const repeatSentenceQuestions: RepeatSentenceQuestion[] = [
  { id: 101, type: 'repeat_sentence', isPredicted: true, title: 'Library Hours', attemptCount: 3200, accuracy: 78, duration: 5, transcript: 'The library will be closed for maintenance next Monday and Tuesday.' },
  { id: 102, type: 'repeat_sentence', isPredicted: true, title: 'Assignment Deadline', attemptCount: 2800, accuracy: 82, duration: 6, transcript: 'Students are expected to submit their assignments before the end of the semester.' },
  { id: 103, type: 'repeat_sentence', title: 'Research Methods', attemptCount: 1900, accuracy: 71, duration: 7, transcript: 'The research methodology must be clearly outlined in the introductory chapter of your thesis.' },
  { id: 104, type: 'repeat_sentence', isNew: true, title: 'Campus Facilities', attemptCount: 450, accuracy: 80, duration: 5, transcript: 'All campus facilities will be available to enrolled students throughout the academic year.' },
  { id: 105, type: 'repeat_sentence', isPredicted: true, title: 'Exam Regulations', attemptCount: 4100, accuracy: 85, duration: 6, transcript: 'Electronic devices are strictly prohibited in the examination hall without prior authorization.' },
  { id: 106, type: 'repeat_sentence', title: 'Guest Lecture', attemptCount: 1100, accuracy: 69, duration: 8, transcript: 'The distinguished professor will deliver a keynote address on sustainable development goals.' },
];

// ---- DESCRIBE IMAGE ----
export interface DescribeImageQuestion extends Question {
  type: 'describe_image';
  imageUrl: string;
  imageType: 'bar_chart' | 'pie_chart' | 'line_graph' | 'table' | 'map' | 'diagram' | 'photo';
  description: string; // sample answer
}

export const describeImageQuestions: DescribeImageQuestion[] = [
  {
    id: 201, type: 'describe_image', isPredicted: true, title: 'Global CO2 Emissions Bar Chart',
    imageType: 'bar_chart', attemptCount: 2300, accuracy: 68,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Global_Carbon_Emissions.svg/800px-Global_Carbon_Emissions.svg.png',
    description: 'The bar chart illustrates global CO2 emissions from different sectors. The energy sector contributes the most, followed by transportation and industry.'
  },
  {
    id: 202, type: 'describe_image', title: 'Population Growth Line Graph',
    imageType: 'line_graph', attemptCount: 1800, accuracy: 72,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/World_population_growth_rate_1950-2025.png/800px-World_population_growth_rate_1950-2025.png',
    description: 'The line graph shows world population growth from 1950 to 2025, demonstrating a consistent upward trend with growth rate variations.'
  },
  {
    id: 203, type: 'describe_image', isPredicted: true, isNew: true, title: 'Market Share Pie Chart',
    imageType: 'pie_chart', attemptCount: 890, accuracy: 74,
    imageUrl: '',
    description: 'The pie chart depicts market share distribution among major technology companies, with the largest player holding approximately 35% of the market.'
  },
];

// ---- WRITE ESSAY ----
export interface WriteEssayQuestion extends Question {
  type: 'write_essay';
  prompt: string;
  timeLimit: number; // minutes
  wordLimit: { min: number; max: number };
}

export const writeEssayQuestions: WriteEssayQuestion[] = [
  {
    id: 401, type: 'write_essay', isPredicted: true, title: 'Remote Work Benefits',
    attemptCount: 3400, accuracy: 70, timeLimit: 20, wordLimit: { min: 200, max: 300 },
    prompt: 'In recent years, remote work has become increasingly popular. Some people believe that working from home is more productive and offers a better work-life balance. Others argue that it leads to isolation and reduced collaboration. Discuss both views and give your own opinion.'
  },
  {
    id: 402, type: 'write_essay', title: 'Social Media Impact',
    attemptCount: 4200, accuracy: 68, timeLimit: 20, wordLimit: { min: 200, max: 300 },
    prompt: 'Social media platforms have transformed the way people communicate and access information. While these platforms provide unprecedented connectivity, they also raise concerns about privacy, misinformation, and mental health. Do the advantages of social media outweigh the disadvantages?'
  },
  {
    id: 403, type: 'write_essay', isPredicted: true, isNew: true, title: 'Artificial Intelligence in Education',
    attemptCount: 1200, accuracy: 73, timeLimit: 20, wordLimit: { min: 200, max: 300 },
    prompt: 'Artificial intelligence is increasingly being used in educational settings. Some educators believe AI can personalize learning and improve outcomes, while others worry it could replace teachers and reduce human interaction. What are the implications of widespread AI adoption in education?'
  },
  {
    id: 404, type: 'write_essay', title: 'Urbanization Challenges',
    attemptCount: 2100, accuracy: 65, timeLimit: 20, wordLimit: { min: 200, max: 300 },
    prompt: 'Rapid urbanization presents both opportunities and challenges for society. Cities offer economic opportunities and cultural diversity, but they also face problems such as overcrowding, pollution, and inequality. How can cities be better managed to maximize the benefits and minimize the drawbacks of urban growth?'
  },
];

// ---- SUMMARIZE WRITTEN TEXT ----
export interface SummarizeWrittenQuestion extends Question {
  type: 'summarize_written';
  passage: string;
  timeLimit: number;
  wordLimit: { min: number; max: number };
  sampleAnswer: string;
}

export const summarizeWrittenQuestions: SummarizeWrittenQuestion[] = [
  {
    id: 301, type: 'summarize_written', isPredicted: true, title: 'Ocean Acidification',
    attemptCount: 1800, accuracy: 72, timeLimit: 10, wordLimit: { min: 5, max: 75 },
    passage: 'Ocean acidification is a significant environmental problem caused by the absorption of carbon dioxide from the atmosphere into seawater. When CO2 dissolves in seawater, it forms carbonic acid, which lowers the pH of the water. Since the industrial revolution, the ocean has absorbed about 30% of the CO2 produced by human activities, leading to a 26% increase in acidity. This acidification poses serious threats to marine ecosystems, particularly to organisms that build shells or skeletons from calcium carbonate, such as corals, oysters, and certain types of plankton. As these organisms struggle to build and maintain their structures in more acidic waters, the entire marine food web is affected. Scientists predict that if current emission trends continue, ocean pH levels could drop by another 0.3 to 0.4 units by the end of this century, with potentially catastrophic consequences for marine biodiversity.',
    sampleAnswer: 'Ocean acidification, caused by increased CO2 absorption since industrialization, threatens marine ecosystems by lowering pH levels, particularly harming calcium carbonate-dependent species like corals, with potentially catastrophic biodiversity consequences if emissions continue.'
  },
  {
    id: 302, type: 'summarize_written', title: 'The History of the Internet',
    attemptCount: 2300, accuracy: 78, timeLimit: 10, wordLimit: { min: 5, max: 75 },
    passage: 'The internet has its origins in ARPANET, a project funded by the United States Department of Defense in the late 1960s. Initially designed to allow academic and military researchers to share data, ARPANET connected just four universities in 1969. Over the following decades, the network expanded significantly, incorporating new protocols and technologies. The introduction of TCP/IP protocols in 1983 marked a major milestone, enabling different networks to communicate with each other. The development of the World Wide Web by Tim Berners-Lee in 1989 transformed the internet from a tool used primarily by scientists and academics into a medium accessible to the general public. The commercialization of the internet in the 1990s led to explosive growth, and today billions of people worldwide use the internet for communication, commerce, entertainment, and education.',
    sampleAnswer: 'The internet evolved from the military-funded ARPANET in 1969, expanded through TCP/IP protocols in 1983 and Tim Berners-Lee\'s World Wide Web in 1989, and grew into a global medium now used by billions for diverse purposes.'
  },
];

// ---- READING MCS ----
export interface ReadingMCSQuestion extends Question {
  type: 'reading_mcs';
  passage: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const readingMCSQuestions: ReadingMCSQuestion[] = [
  {
    id: 501, type: 'reading_mcs', isPredicted: true, title: 'Biodiversity Loss',
    attemptCount: 2800, accuracy: 76,
    passage: 'Biodiversity, the variety of life on Earth, is essential for healthy ecosystems. It provides services that support human wellbeing including food production, clean water, climate regulation, and disease control. However, biodiversity is declining at an unprecedented rate due to habitat destruction, climate change, invasive species, overexploitation, and pollution. Scientists estimate that species are going extinct at 100 to 1,000 times the natural background rate, leading some researchers to describe the current period as the sixth mass extinction. Unlike previous mass extinctions caused by natural events, the current crisis is primarily driven by human activities. Protecting biodiversity requires international cooperation, sustainable land use practices, and significant changes to consumption patterns.',
    question: 'According to the passage, what is the primary cause of the current biodiversity crisis?',
    options: [
      'Natural climate cycles and geological events',
      'Human activities and consumption patterns',
      'Invasive species from neighboring ecosystems',
      'Volcanic eruptions and natural disasters'
    ],
    correctAnswer: 1
  },
  {
    id: 502, type: 'reading_mcs', title: 'Automation and Employment',
    attemptCount: 1900, accuracy: 71,
    passage: 'Automation and artificial intelligence are transforming labor markets around the world. While these technologies increase productivity and create new industries, they also displace workers in many traditional occupations. Research suggests that jobs involving routine, predictable tasks are most vulnerable to automation, while occupations requiring creativity, complex problem-solving, and interpersonal skills are more resilient. Economists debate whether automation will ultimately create more jobs than it destroys, as it has during previous technological revolutions. However, even if net employment remains stable, the transition period could cause significant social disruption, particularly for workers in affected industries who may lack the skills for emerging roles.',
    question: 'Which type of jobs does the passage suggest are MOST at risk from automation?',
    options: [
      'Jobs requiring creativity and complex problem-solving',
      'Jobs in the technology and AI sectors',
      'Jobs involving routine and predictable tasks',
      'Jobs in interpersonal services and counseling'
    ],
    correctAnswer: 2
  },
];

// ---- REORDER PARAGRAPHS ----
export interface ReorderQuestion extends Question {
  type: 'reorder_paragraphs';
  paragraphs: { id: string; text: string; }[];
  correctOrder: string[];
}

export const reorderQuestions: ReorderQuestion[] = [
  {
    id: 601, type: 'reorder_paragraphs', isPredicted: true, title: 'History of Photography',
    attemptCount: 1400, accuracy: 66,
    paragraphs: [
      { id: 'A', text: 'The daguerreotype, invented by Louis Daguerre in 1839, was the first commercially successful photographic process, producing highly detailed images on silver-coated copper plates.' },
      { id: 'B', text: 'Photography has undergone a remarkable transformation since its invention, evolving from early chemical processes to today\'s digital technology.' },
      { id: 'C', text: 'The introduction of roll film by George Eastman in 1885 made photography accessible to ordinary people for the first time, spawning an industry of amateur photography.' },
      { id: 'D', text: 'Today, digital photography has democratized image creation further still, with billions of photographs taken every day using smartphones and shared instantly across the globe.' },
    ],
    correctOrder: ['B', 'A', 'C', 'D']
  },
];

// ---- FIB DRAG DROP ----
export interface FIBDragDropQuestion extends Question {
  type: 'fib_dragdrop';
  passage: string; // with ___ as blanks
  blanks: string[]; // correct answers in order
  wordBank: string[]; // includes distractors
}

export const fibDragDropQuestions: FIBDragDropQuestion[] = [
  {
    id: 701, type: 'fib_dragdrop', isPredicted: true, title: 'Global Warming Causes',
    attemptCount: 2100, accuracy: 73,
    passage: 'Global warming is primarily ___ by the increased concentration of greenhouse gases in the ___ atmosphere. Carbon dioxide, released through the ___ of fossil fuels, is the most significant contributor. These gases trap heat from the sun, causing the Earth\'s ___ to rise gradually over time.',
    blanks: ['caused', 'Earth\'s', 'burning', 'temperature'],
    wordBank: ['caused', 'Earth\'s', 'burning', 'temperature', 'created', 'planet\'s', 'mining', 'pressure']
  },
];

// ---- FIB DROPDOWN ----
export interface FIBDropdownQuestion extends Question {
  type: 'fib_dropdown';
  passage: string;
  blanks: { id: string; options: string[]; correct: string }[];
}

export const fibDropdownQuestions: FIBDropdownQuestion[] = [
  {
    id: 801, type: 'fib_dropdown', title: 'Economic Growth',
    attemptCount: 1700, accuracy: 74,
    passage: 'Economic growth is measured by the [BLANK1] in GDP over time. Countries with [BLANK2] growth rates tend to have higher living standards. Governments often use fiscal policy to [BLANK3] economic activity during downturns.',
    blanks: [
      { id: 'BLANK1', options: ['increase', 'decrease', 'stability', 'volatility'], correct: 'increase' },
      { id: 'BLANK2', options: ['high', 'low', 'negative', 'zero'], correct: 'high' },
      { id: 'BLANK3', options: ['stimulate', 'suppress', 'ignore', 'evaluate'], correct: 'stimulate' },
    ]
  },
];

// ---- WRITE FROM DICTATION ----
export interface WriteDictationQuestion extends Question {
  type: 'write_dictation';
  audioUrl?: string;
  transcript: string;
  duration: number;
}

export const writeDictationQuestions: WriteDictationQuestion[] = [
  { id: 901, type: 'write_dictation', isPredicted: true, title: 'Study Skills', attemptCount: 5600, accuracy: 80, duration: 6, transcript: 'Effective study skills are essential for academic success.' },
  { id: 902, type: 'write_dictation', isPredicted: true, title: 'Library Resources', attemptCount: 4200, accuracy: 77, duration: 7, transcript: 'The university library provides access to thousands of academic journals.' },
  { id: 903, type: 'write_dictation', isNew: true, title: 'Research Proposal', attemptCount: 980, accuracy: 72, duration: 8, transcript: 'Students must submit their research proposals before the end of the month.' },
  { id: 904, type: 'write_dictation', title: 'Global Conference', attemptCount: 3100, accuracy: 75, duration: 9, transcript: 'The annual international conference on climate change will be held in Geneva this year.' },
  { id: 905, type: 'write_dictation', isPredicted: true, title: 'Scholarship Deadline', attemptCount: 2800, accuracy: 82, duration: 6, transcript: 'Applications for the scholarship must be received by the first of November.' },
];

// ---- HIGHLIGHT INCORRECT WORDS ----
export interface HighlightIncorrectQuestion extends Question {
  type: 'highlight_incorrect';
  audioUrl?: string;
  transcript: string[];  // words array
  incorrectIndices: number[];
  originalWords: string[];  // correct words
}

export const highlightIncorrectQuestions: HighlightIncorrectQuestion[] = [
  {
    id: 1001, type: 'highlight_incorrect', isPredicted: true, title: 'Archaeology Discovery',
    attemptCount: 1800, accuracy: 68,
    transcript: ['Archaeologists', 'have', 'recently', 'discovered', 'an', 'ancient', 'settlement', 'that', 'dates', 'back', 'over', 'three', 'million', 'years.', 'The', 'finding', 'includes', 'tools', 'made', 'from', 'stone', 'and', 'animal', 'roots.'],
    incorrectIndices: [12, 23],
    originalWords: ['thousand', 'bones']
  },
];

// ---- LISTENING FIB ----
export interface ListeningFIBQuestion extends Question {
  type: 'listening_fib';
  audioUrl?: string;
  transcript: string; // with ___ as blanks
  blanks: string[];
  duration: number;
}

export const listeningFIBQuestions: ListeningFIBQuestion[] = [
  {
    id: 1101, type: 'listening_fib', isPredicted: true, title: 'Climate Conference Lecture',
    attemptCount: 2400, accuracy: 70, duration: 45,
    transcript: 'Welcome to today\'s lecture on ___ change. We will discuss the major ___ of this global phenomenon and explore possible ___ for future generations.',
    blanks: ['climate', 'impacts', 'solutions']
  },
];

// ---- VOCAB ----
export interface VocabWord {
  id: number;
  word: string;
  definition: string;
  partOfSpeech: string;
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
  learned: boolean;
  category: string;
}

export const vocabWords: VocabWord[] = [
  { id: 1, word: 'Ubiquitous', definition: 'Present, appearing, or found everywhere', partOfSpeech: 'adjective', example: 'Mobile phones have become ubiquitous in modern society.', difficulty: 'medium', learned: false, category: 'Academic' },
  { id: 2, word: 'Mitigate', definition: 'To make less severe, serious, or painful', partOfSpeech: 'verb', example: 'Governments are taking steps to mitigate the effects of climate change.', difficulty: 'medium', learned: true, category: 'Academic' },
  { id: 3, word: 'Proliferate', definition: 'To increase rapidly in numbers; multiply', partOfSpeech: 'verb', example: 'Social media platforms have proliferated dramatically in the past decade.', difficulty: 'hard', learned: false, category: 'Academic' },
  { id: 4, word: 'Ambiguous', definition: 'Open to more than one interpretation; not clear', partOfSpeech: 'adjective', example: 'The contract terms were ambiguous and led to disputes.', difficulty: 'medium', learned: false, category: 'Academic' },
  { id: 5, word: 'Paradigm', definition: 'A typical example or pattern of something; a model', partOfSpeech: 'noun', example: 'The internet represented a paradigm shift in communication.', difficulty: 'hard', learned: true, category: 'Academic' },
  { id: 6, word: 'Exacerbate', definition: 'To make a problem, bad situation, or negative feeling worse', partOfSpeech: 'verb', example: 'The drought exacerbated the already serious food shortage.', difficulty: 'hard', learned: false, category: 'Academic' },
  { id: 7, word: 'Cohesive', definition: 'Forming a unified whole', partOfSpeech: 'adjective', example: 'A cohesive team is essential for project success.', difficulty: 'easy', learned: true, category: 'Academic' },
  { id: 8, word: 'Innate', definition: 'Inborn; natural', partOfSpeech: 'adjective', example: 'Children have an innate curiosity about the world around them.', difficulty: 'medium', learned: false, category: 'Academic' },
  { id: 9, word: 'Prevalent', definition: 'Widespread in a particular area at a particular time', partOfSpeech: 'adjective', example: 'Obesity is increasingly prevalent in developed countries.', difficulty: 'easy', learned: true, category: 'Medical' },
  { id: 10, word: 'Trajectory', definition: 'The path followed by a projectile; a path of development', partOfSpeech: 'noun', example: 'The trajectory of economic growth has been upward for years.', difficulty: 'medium', learned: false, category: 'Academic' },
  { id: 11, word: 'Unprecedented', definition: 'Never done or known before', partOfSpeech: 'adjective', example: 'The pandemic caused unprecedented disruption to global supply chains.', difficulty: 'easy', learned: true, category: 'Academic' },
  { id: 12, word: 'Empirical', definition: 'Based on observation or experience rather than theory', partOfSpeech: 'adjective', example: 'The scientists gathered empirical evidence to support their hypothesis.', difficulty: 'hard', learned: false, category: 'Science' },
];

// ---- WEEKLY PREDICTION ----
export const weeklyPrediction = {
  newCount: 613,
  predictCount: 1024,
  updateCount: 110,
  repeatRate: 64,
  lastUpdated: '2024-12-15'
};

// ---- USER STATS ----
export const userStats = {
  totalPractice: 247,
  streak: 12,
  targetScore: 79,
  estimatedScore: 71,
  skillScores: {
    speaking: 74,
    writing: 68,
    reading: 75,
    listening: 70,
  },
  recentActivity: [
    { date: '2024-12-15', type: 'read_aloud', count: 5, accuracy: 78 },
    { date: '2024-12-14', type: 'write_dictation', count: 8, accuracy: 82 },
    { date: '2024-12-13', type: 'write_essay', count: 2, accuracy: 71 },
    { date: '2024-12-12', type: 'repeat_sentence', count: 10, accuracy: 75 },
  ]
};

// ---- NAVIGATION STRUCTURE ----
export const practiceNav = [
  {
    section: 'Speaking',
    color: 'blue',
    items: [
      { label: 'Read Aloud', href: '/practice/read-alouds', hasAI: true, count: 312 },
      { label: 'Repeat Sentence', href: '/practice/repeat-sentence', hasAI: true, count: 456 },
      { label: 'Describe Image', href: '/practice/describe-image', hasAI: true, count: 234 },
      { label: 'Re-tell Lecture', href: '/practice/retell-lecture', hasAI: true, count: 178 },
      { label: 'Answer Short Question', href: '/practice/answer-short', hasAI: true, count: 189 },
    ]
  },
  {
    section: 'Writing',
    color: 'purple',
    items: [
      { label: 'Summarize Written Text', href: '/practice/summarize-written', hasAI: true, count: 145 },
      { label: 'Write Essay', href: '/practice/write-essay', hasAI: true, count: 167 },
    ]
  },
  {
    section: 'Reading',
    color: 'green',
    items: [
      { label: 'Multiple Choice (Single)', href: '/practice/reading-mcs', hasAI: false, count: 98 },
      { label: 'Multiple Choice (Multiple)', href: '/practice/reading-mcs', hasAI: false, count: 87 },
      { label: 'Re-order Paragraphs', href: '/practice/reorder-paragraphs', hasAI: false, count: 112 },
      { label: 'Fill in the Blanks (DnD)', href: '/practice/fib-dragdrop', hasAI: false, count: 134 },
      { label: 'Fill in the Blanks (Dropdown)', href: '/practice/fib-dropdown', hasAI: false, count: 98 },
    ]
  },
  {
    section: 'Listening',
    color: 'orange',
    items: [
      { label: 'Summarize Spoken Text', href: '/practice/summarize-spoken', hasAI: true, count: 134 },
      { label: 'Multiple Choice (Multiple)', href: '/practice/listening-mcm', hasAI: false, count: 78 },
      { label: 'Multiple Choice (Single)', href: '/practice/listening-mcs', hasAI: false, count: 89 },
      { label: 'Highlight Correct Summary', href: '/practice/highlight-summary', hasAI: false, count: 56 },
      { label: 'Select Missing Word', href: '/practice/select-missing', hasAI: false, count: 67 },
      { label: 'Fill in the Blanks', href: '/practice/listening-fib', hasAI: false, count: 145 },
      { label: 'Highlight Incorrect Words', href: '/practice/highlight-incorrect', hasAI: false, count: 112 },
      { label: 'Write From Dictation', href: '/practice/write-dictation', hasAI: false, count: 489 },
    ]
  },
];
