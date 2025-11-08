import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useChatStore } from '@/stores/chatStore';
import { SmileIcon, FrownIcon, MehIcon, TrendingUpIcon, AlertCircleIcon } from 'lucide-react';

export default function ToneAnalyzer() {
  const { messages } = useChatStore();
  
  const userMessages = messages.filter(m => m.sender === 'user');
  const latestMessage = userMessages[userMessages.length - 1];
  
  const avgClarity = userMessages.length > 0
    ? Math.round(userMessages.reduce((sum, m) => sum + m.clarity, 0) / userMessages.length)
    : 0;

  const getToneIcon = (tone: string) => {
    switch (tone) {
      case 'positive':
        return <SmileIcon className="w-5 h-5 text-success" strokeWidth={2} />;
      case 'negative':
        return <FrownIcon className="w-5 h-5 text-tertiary" strokeWidth={2} />;
      default:
        return <MehIcon className="w-5 h-5 text-accent" strokeWidth={2} />;
    }
  };

  return (
    <Card className="bg-card border-border p-6 space-y-6">
      <div>
        <h2 className="text-xl font-sans font-semibold text-foreground mb-2">Tone Analysis</h2>
        <p className="text-sm text-muted-foreground font-body">Real-time feedback on your communication</p>
      </div>

      {latestMessage ? (
        <>
          {/* Current tone */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-body font-medium text-foreground">Current Tone</span>
              {getToneIcon(latestMessage.tone)}
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm font-body text-foreground capitalize">{latestMessage.tone}</p>
            </div>
          </div>

          {/* Clarity score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-body font-medium text-foreground">Clarity Score</span>
              <span className="text-sm font-body font-semibold text-foreground">{latestMessage.clarity}%</span>
            </div>
            <Progress value={latestMessage.clarity} className="h-2" />
          </div>

          {/* Average clarity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="w-5 h-5 text-accent" strokeWidth={2} />
              <span className="text-sm font-body font-medium text-foreground">Average Clarity</span>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-2xl font-sans font-semibold text-foreground">{avgClarity}%</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircleIcon className="w-5 h-5 text-warning" strokeWidth={2} />
              <span className="text-sm font-body font-medium text-foreground">Recommendations</span>
            </div>
            <div className="bg-secondary/10 border border-secondary rounded-lg p-4">
              <ul className="space-y-2 text-sm font-body text-foreground">
                <li>• Use more specific examples</li>
                <li>• Keep sentences concise</li>
                <li>• Ask clarifying questions</li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-muted-foreground font-body text-sm">
          Send a message to see analysis
        </div>
      )}
    </Card>
  );
}
