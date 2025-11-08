import { useChatStore } from '@/stores/chatStore';
import { Progress } from '@/components/ui/progress';

export default function ClarityGauge() {
  const { messages } = useChatStore();

  const avgClarity = messages.length > 0
    ? Math.round(messages.reduce((sum, m) => sum + m.clarity, 0) / messages.length)
    : 0;

  const getColorClass = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-accent';
    return 'text-warning';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="hsl(210, 15%, 95%)"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="hsl(168, 45%, 45%)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${(avgClarity / 100) * 553} 553`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-sans font-bold ${getColorClass(avgClarity)}`}>
              {avgClarity}
            </span>
            <span className="text-sm font-body text-muted-foreground mt-1">Average Score</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm font-body mb-2">
            <span className="text-foreground">Excellent (80-100)</span>
            <span className="text-success font-medium">
              {messages.filter(m => m.clarity >= 80).length}
            </span>
          </div>
          <Progress 
            value={(messages.filter(m => m.clarity >= 80).length / Math.max(messages.length, 1)) * 100} 
            className="h-2"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm font-body mb-2">
            <span className="text-foreground">Good (60-79)</span>
            <span className="text-accent font-medium">
              {messages.filter(m => m.clarity >= 60 && m.clarity < 80).length}
            </span>
          </div>
          <Progress 
            value={(messages.filter(m => m.clarity >= 60 && m.clarity < 80).length / Math.max(messages.length, 1)) * 100} 
            className="h-2"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm font-body mb-2">
            <span className="text-foreground">Needs Work (&lt;60)</span>
            <span className="text-warning font-medium">
              {messages.filter(m => m.clarity < 60).length}
            </span>
          </div>
          <Progress 
            value={(messages.filter(m => m.clarity < 60).length / Math.max(messages.length, 1)) * 100} 
            className="h-2"
          />
        </div>
      </div>
    </div>
  );
}
