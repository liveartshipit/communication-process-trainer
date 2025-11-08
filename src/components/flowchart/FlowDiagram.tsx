import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FlowDiagramProps {
  zoom: number;
}

const nodes = [
  { id: 'sender', label: 'Sender', x: 100, y: 200, color: 'hsl(168, 45%, 45%)' },
  { id: 'encoding', label: 'Encoding', x: 250, y: 200, color: 'hsl(168, 47%, 62%)' },
  { id: 'channel', label: 'Channel', x: 400, y: 200, color: 'hsl(210, 70%, 56%)' },
  { id: 'decoding', label: 'Decoding', x: 550, y: 200, color: 'hsl(168, 47%, 62%)' },
  { id: 'receiver', label: 'Receiver', x: 700, y: 200, color: 'hsl(168, 45%, 45%)' },
  { id: 'noise1', label: 'Physical Noise', x: 250, y: 100, color: 'hsl(10, 80%, 60%)' },
  { id: 'noise2', label: 'Semantic Noise', x: 400, y: 100, color: 'hsl(10, 80%, 60%)' },
  { id: 'noise3', label: 'Cultural Noise', x: 550, y: 100, color: 'hsl(10, 80%, 60%)' },
  { id: 'feedback', label: 'Feedback', x: 400, y: 300, color: 'hsl(142, 40%, 45%)' },
];

const descriptions: Record<string, string> = {
  sender: 'The person initiating the communication',
  encoding: 'Converting thoughts into communicable symbols',
  channel: 'The medium through which the message travels',
  decoding: 'Interpreting the received symbols',
  receiver: 'The person receiving and processing the message',
  noise1: 'Environmental distractions affecting transmission',
  noise2: 'Misunderstandings due to language or terminology',
  noise3: 'Differences in cultural context and interpretation',
  feedback: 'Response from receiver back to sender',
};

export default function FlowDiagram({ zoom }: FlowDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <TooltipProvider>
      <div className="w-full h-full flex items-center justify-center overflow-auto">
        <svg
          width="800"
          height="400"
          style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease-in-out' }}
        >
          {/* Connections */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="hsl(210, 10%, 80%)" />
            </marker>
          </defs>

          {/* Main flow */}
          <line x1="150" y1="200" x2="220" y2="200" stroke="hsl(210, 10%, 80%)" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="300" y1="200" x2="370" y2="200" stroke="hsl(210, 10%, 80%)" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="450" y1="200" x2="520" y2="200" stroke="hsl(210, 10%, 80%)" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="600" y1="200" x2="670" y2="200" stroke="hsl(210, 10%, 80%)" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* Noise connections */}
          <line x1="250" y1="130" x2="250" y2="170" stroke="hsl(10, 80%, 60%)" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="400" y1="130" x2="400" y2="170" stroke="hsl(10, 80%, 60%)" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="550" y1="130" x2="550" y2="170" stroke="hsl(10, 80%, 60%)" strokeWidth="2" strokeDasharray="5,5" />

          {/* Feedback loop */}
          <path
            d="M 700 220 Q 700 300, 400 300 Q 100 300, 100 220"
            stroke="hsl(142, 40%, 45%)"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
          />

          {/* Nodes */}
          {nodes.map((node) => (
            <Tooltip key={node.id}>
              <TooltipTrigger asChild>
                <g
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="40"
                    fill={node.color}
                    stroke={hoveredNode === node.id ? 'hsl(210, 70%, 56%)' : 'transparent'}
                    strokeWidth="3"
                    style={{ transition: 'all 0.2s ease-in-out' }}
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="12"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                  >
                    {node.label}
                  </text>
                </g>
              </TooltipTrigger>
              <TooltipContent className="bg-popover text-popover-foreground border-border">
                <p className="font-body text-sm">{descriptions[node.id]}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </svg>
      </div>
    </TooltipProvider>
  );
}
