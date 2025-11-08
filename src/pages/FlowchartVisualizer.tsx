import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ZoomInIcon, ZoomOutIcon, Maximize2Icon } from 'lucide-react';
import FlowDiagram from '@/components/flowchart/FlowDiagram';

export default function FlowchartVisualizer() {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => setZoom(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sans font-semibold text-foreground">Flowchart Visualizer</h1>
          <p className="text-muted-foreground font-body mt-2">Interactive communication process model</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleZoomOut}
            variant="outline"
            size="icon"
            className="bg-card text-foreground border-border hover:bg-muted hover:text-foreground"
          >
            <ZoomOutIcon className="w-5 h-5" strokeWidth={2} />
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="icon"
            className="bg-card text-foreground border-border hover:bg-muted hover:text-foreground"
          >
            <Maximize2Icon className="w-5 h-5" strokeWidth={2} />
          </Button>
          <Button
            onClick={handleZoomIn}
            variant="outline"
            size="icon"
            className="bg-card text-foreground border-border hover:bg-muted hover:text-foreground"
          >
            <ZoomInIcon className="w-5 h-5" strokeWidth={2} />
          </Button>
        </div>
      </div>

      <Card className="bg-card border-border p-8 min-h-[600px]">
        <FlowDiagram zoom={zoom} />
      </Card>

      <Card className="bg-card border-border p-6">
        <h2 className="text-xl font-sans font-semibold text-foreground mb-4">Model Overview</h2>
        <div className="space-y-4 font-body text-foreground">
          <p>
            The communication process model illustrates how messages flow between sender and receiver,
            highlighting potential barriers that can disrupt effective communication.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-foreground">Key Components</h3>
              <ul className="space-y-1 text-sm text-foreground">
                <li>• Sender: Message originator</li>
                <li>• Encoding: Converting ideas to symbols</li>
                <li>• Channel: Medium of transmission</li>
                <li>• Receiver: Message interpreter</li>
                <li>• Feedback: Response mechanism</li>
              </ul>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-foreground">Common Barriers</h3>
              <ul className="space-y-1 text-sm text-foreground">
                <li>• Physical noise</li>
                <li>• Semantic differences</li>
                <li>• Cultural context</li>
                <li>• Emotional state</li>
                <li>• Technical issues</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
