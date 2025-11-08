import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuizCard from '@/components/quiz/QuizCard';

const quizzes = [
  {
    id: 1,
    category: 'barriers',
    title: 'Identifying Communication Barriers',
    questions: [
      {
        id: 'q1',
        question: 'Which of the following is an example of semantic noise?',
        options: [
          'Loud background music',
          'Using technical jargon with a non-expert',
          'Poor internet connection',
          'Speaking too quickly',
        ],
        correctAnswer: 1,
        explanation: 'Semantic noise occurs when the meaning of words or symbols is misunderstood.',
      },
      {
        id: 'q2',
        question: 'What type of barrier is cultural misunderstanding?',
        options: [
          'Physical barrier',
          'Psychological barrier',
          'Cultural barrier',
          'Technical barrier',
        ],
        correctAnswer: 2,
        explanation: 'Cultural barriers arise from differences in cultural context and interpretation.',
      },
    ],
  },
  {
    id: 2,
    category: 'process',
    title: 'Communication Process Model',
    questions: [
      {
        id: 'q3',
        question: 'What is the first step in the communication process?',
        options: [
          'Encoding',
          'Sender has an idea',
          'Choosing a channel',
          'Decoding',
        ],
        correctAnswer: 1,
        explanation: 'Communication begins when the sender formulates an idea or message.',
      },
      {
        id: 'q4',
        question: 'What is feedback in communication?',
        options: [
          'The original message',
          'The response from the receiver',
          'The encoding process',
          'The communication channel',
        ],
        correctAnswer: 1,
        explanation: 'Feedback is the receiver\'s response that helps the sender know if the message was understood.',
      },
    ],
  },
  {
    id: 3,
    category: 'scenarios',
    title: 'Real-World Scenarios',
    questions: [
      {
        id: 'q5',
        question: 'During a video call, the audio keeps cutting out. What type of barrier is this?',
        options: [
          'Semantic barrier',
          'Physical barrier',
          'Cultural barrier',
          'Emotional barrier',
        ],
        correctAnswer: 1,
        explanation: 'Technical issues like poor audio quality are physical barriers to communication.',
      },
      {
        id: 'q6',
        question: 'A manager uses corporate acronyms when speaking to new employees. This is an example of:',
        options: [
          'Effective communication',
          'Semantic noise',
          'Active listening',
          'Proper encoding',
        ],
        correctAnswer: 1,
        explanation: 'Using unfamiliar jargon creates semantic noise and hinders understanding.',
      },
    ],
  },
];

export default function Quizzes() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-sans font-semibold text-foreground">Barrier Identification Quizzes</h1>
        <p className="text-muted-foreground font-body mt-2">Test your understanding of communication concepts</p>
      </div>

      <Tabs defaultValue="barriers" className="w-full">
        <TabsList className="bg-muted border border-border">
          <TabsTrigger 
            value="barriers" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground"
          >
            Barriers
          </TabsTrigger>
          <TabsTrigger 
            value="process"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground"
          >
            Process Model
          </TabsTrigger>
          <TabsTrigger 
            value="scenarios"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground"
          >
            Scenarios
          </TabsTrigger>
        </TabsList>

        {quizzes.map((quiz) => (
          <TabsContent key={quiz.id} value={quiz.category} className="mt-6">
            <Card className="bg-card border-border p-6">
              <h2 className="text-xl font-sans font-semibold text-foreground mb-6">{quiz.title}</h2>
              <div className="space-y-8">
                {quiz.questions.map((question) => (
                  <QuizCard key={question.id} question={question} />
                ))}
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
