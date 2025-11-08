import { useChatStore } from '@/stores/chatStore';
import { CheckCircle2Icon, AlertCircleIcon, InfoIcon } from 'lucide-react';

const feedbackItems = [
  {
    type: 'success',
    icon: CheckCircle2Icon,
    title: 'Strong Opening',
    description: 'Your conversation starters are engaging and clear.',
  },
  {
    type: 'warning',
    icon: AlertCircleIcon,
    title: 'Sentence Length',
    description: 'Consider breaking down longer sentences for better clarity.',
  },
  {
    type: 'info',
    icon: InfoIcon,
    title: 'Active Listening',
    description: 'Good use of follow-up questions to show engagement.',
  },
];

export default function FeedbackList() {
  const { messages } = useChatStore();

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground font-body">
        Complete chat sessions to receive feedback
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedbackItems.map((item, index) => {
        const Icon = item.icon;
        const colorClass = 
          item.type === 'success' ? 'text-success' :
          item.type === 'warning' ? 'text-warning' :
          'text-accent';

        return (
          <div
            key={index}
            className="flex gap-4 p-4 rounded-lg bg-muted border border-border"
          >
            <Icon className={`w-6 h-6 ${colorClass} flex-shrink-0 mt-1`} strokeWidth={2} />
            <div className="flex-1">
              <h3 className="font-body font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm font-body text-muted-foreground">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
