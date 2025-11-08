import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useChatStore } from '@/stores/chatStore';
import ToneChart from '@/components/analytics/ToneChart';
import ClarityGauge from '@/components/analytics/ClarityGauge';
import FeedbackList from '@/components/analytics/FeedbackList';
import fileDownload from 'js-file-download';

export default function AnalyticsDashboard() {
  const { toast } = useToast();
  const { messages } = useChatStore();

  const handleExport = () => {
    if (messages.length === 0) {
      toast({
        title: 'No data to export',
        description: 'Complete some chat sessions first.',
        variant: 'destructive',
      });
      return;
    }

    const summary = {
      totalMessages: messages.length,
      averageClarity: Math.round(
        messages.reduce((sum, m) => sum + m.clarity, 0) / messages.length
      ),
      toneDistribution: messages.reduce((acc, m) => {
        acc[m.tone] = (acc[m.tone] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };

    fileDownload(JSON.stringify(summary, null, 2), `analytics-${Date.now()}.json`);
    
    toast({
      title: 'Export successful',
      description: 'Analytics summary has been downloaded.',
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sans font-semibold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground font-body mt-2">Track your communication progress</p>
        </div>
        <Button
          onClick={handleExport}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
        >
          <DownloadIcon className="w-5 h-5 mr-2" strokeWidth={2} />
          Export Summary
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border p-6">
          <h2 className="text-xl font-sans font-semibold text-foreground mb-6">Tone Trends</h2>
          <ToneChart />
        </Card>

        <Card className="bg-card border-border p-6">
          <h2 className="text-xl font-sans font-semibold text-foreground mb-6">Clarity Score</h2>
          <ClarityGauge />
        </Card>
      </div>

      <Card className="bg-card border-border p-6">
        <h2 className="text-xl font-sans font-semibold text-foreground mb-6">Feedback Summary</h2>
        <FeedbackList />
      </Card>
    </div>
  );
}
