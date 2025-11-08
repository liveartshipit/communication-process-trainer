import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizCardProps {
  question: Question;
}

export default function QuizCard({ question }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setSubmitted(false);
  };

  const isCorrect = submitted && selectedAnswer === question.correctAnswer;
  const isIncorrect = submitted && selectedAnswer !== question.correctAnswer;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-body font-semibold text-lg text-foreground mb-4">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === question.correctAnswer;
            
            let buttonClass = 'bg-card text-foreground border-border hover:bg-muted hover:text-foreground';
            
            if (submitted) {
              if (isCorrectOption) {
                buttonClass = 'bg-success text-success-foreground border-success';
              } else if (isSelected && !isCorrectOption) {
                buttonClass = 'bg-destructive text-destructive-foreground border-destructive';
              }
            } else if (isSelected) {
              buttonClass = 'bg-secondary text-secondary-foreground border-secondary';
            }

            return (
              <Button
                key={index}
                onClick={() => !submitted && setSelectedAnswer(index)}
                disabled={submitted}
                variant="outline"
                className={`w-full justify-start text-left h-auto py-4 px-6 font-normal ${buttonClass}`}
              >
                <span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
                {submitted && isCorrectOption && (
                  <CheckCircle2Icon className="ml-auto w-5 h-5" strokeWidth={2} />
                )}
                {submitted && isSelected && !isCorrectOption && (
                  <XCircleIcon className="ml-auto w-5 h-5" strokeWidth={2} />
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {submitted && (
        <div className={`rounded-lg p-4 ${isCorrect ? 'bg-success/10 border border-success' : 'bg-destructive/10 border border-destructive'}`}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2Icon className="w-6 h-6 text-success flex-shrink-0 mt-1" strokeWidth={2} />
            ) : (
              <XCircleIcon className="w-6 h-6 text-destructive flex-shrink-0 mt-1" strokeWidth={2} />
            )}
            <div className="flex-1">
              <p className="font-body font-semibold text-foreground mb-2">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </p>
              <p className="font-body text-sm text-foreground">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
          >
            Submit Answer
          </Button>
        ) : (
          <Button
            onClick={handleReset}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-normal"
          >
            Try Again
          </Button>
        )}
      </div>

      {submitted && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-body">
            <span className="text-foreground">Progress</span>
            <span className="text-foreground font-medium">100%</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
      )}
    </div>
  );
}
