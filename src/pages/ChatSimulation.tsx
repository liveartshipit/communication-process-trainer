import { useState, useRef, useEffect } from 'react';
import { SendIcon, DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useChatStore } from '@/stores/chatStore';
import ToneAnalyzer from '@/components/chat/ToneAnalyzer';
import fileDownload from 'js-file-download';

export default function ChatSimulation() {
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { messages, addMessage, clearMessages } = useChatStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user message
    addMessage({
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      tone: 'neutral',
      clarity: Math.floor(Math.random() * 30) + 70,
    });

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "That's an interesting point. Can you elaborate on what you mean?",
        "I understand. How does that make you feel?",
        "Thank you for sharing. What would you like to explore next?",
        "I see. Could you provide more context?",
        "That's a valid concern. Let's work through it together.",
      ];
      
      addMessage({
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'bot',
        timestamp: new Date(),
        tone: 'supportive',
        clarity: Math.floor(Math.random() * 20) + 80,
      });
    }, 1000);

    setMessage('');
  };

  const handleExport = () => {
    if (messages.length === 0) {
      toast({
        title: 'No messages to export',
        description: 'Start a conversation first.',
        variant: 'destructive',
      });
      return;
    }

    const csv = [
      'Timestamp,Sender,Message,Tone,Clarity',
      ...messages.map(m => 
        `"${m.timestamp.toISOString()}","${m.sender}","${m.text.replace(/"/g, '""')}","${m.tone}","${m.clarity}"`
      )
    ].join('\n');

    fileDownload(csv, `chat-log-${Date.now()}.csv`);
    
    toast({
      title: 'Export successful',
      description: 'Chat log has been downloaded.',
    });
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sans font-semibold text-foreground">Chat Simulation</h1>
          <p className="text-muted-foreground font-body mt-2">Practice your communication skills with AI feedback</p>
        </div>
        <Button
          onClick={handleExport}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
        >
          <DownloadIcon className="w-5 h-5 mr-2" strokeWidth={2} />
          DownloadIcon Results
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Chat panel */}
        <Card className="lg:col-span-2 flex flex-col bg-card border-border p-6">
          <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12 text-muted-foreground font-body">
                  Start a conversation to begin practicing
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="font-body text-sm">{msg.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-border">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-muted border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
            >
              <SendIcon className="w-5 h-5" strokeWidth={2} />
            </Button>
          </div>
        </Card>

        {/* Tone analyzer */}
        <ToneAnalyzer />
      </div>
    </div>
  );
}
