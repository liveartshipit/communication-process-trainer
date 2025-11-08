import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useChatStore } from '@/stores/chatStore';

export default function ToneChart() {
  const { messages } = useChatStore();

  const toneData = messages.reduce((acc, msg) => {
    const existing = acc.find(item => item.tone === msg.tone);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ tone: msg.tone, count: 1 });
    }
    return acc;
  }, [] as Array<{ tone: string; count: number }>);

  if (toneData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground font-body">
        No data available yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={toneData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 12%, 90%)" />
        <XAxis 
          dataKey="tone" 
          stroke="hsl(210, 10%, 20%)"
          style={{ fontSize: '14px', fontFamily: 'Inter, sans-serif' }}
        />
        <YAxis 
          stroke="hsl(210, 10%, 20%)"
          style={{ fontSize: '14px', fontFamily: 'Inter, sans-serif' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(0, 0%, 100%)',
            border: '1px solid hsl(210, 12%, 90%)',
            borderRadius: '8px',
            fontFamily: 'Inter, sans-serif',
          }}
        />
        <Bar dataKey="count" fill="hsl(168, 45%, 45%)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
