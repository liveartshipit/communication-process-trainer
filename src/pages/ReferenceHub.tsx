import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SearchIcon, ExternalLinkIcon, BookOpenIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const references = [
  {
    id: 1,
    title: 'Toastmasters Communication Guide',
    source: 'Toastmasters International',
    category: 'Speaking Skills',
    description: 'Comprehensive guide to effective public speaking and communication techniques.',
    url: 'https://www.toastmasters.org',
    image: 'https://c.animaapp.com/mhq88pqwiHYRIA/img/ai_1.png',
  },
  {
    id: 2,
    title: 'Active Listening Techniques',
    source: 'MindTools',
    category: 'Listening Skills',
    description: 'Learn how to become a better listener and improve your communication effectiveness.',
    url: 'https://www.mindtools.com/CommSkll/ActiveListening.htm',
    image: 'https://c.animaapp.com/mhq88pqwiHYRIA/img/ai_1.png',
  },
  {
    id: 3,
    title: 'Overcoming Communication Barriers',
    source: 'MindTools',
    category: 'Barriers',
    description: 'Strategies for identifying and overcoming common communication obstacles.',
    url: 'https://www.mindtools.com/pages/article/newCS_99.htm',
    image: 'https://c.animaapp.com/mhq88pqwiHYRIA/img/ai_1.png',
  },
  {
    id: 4,
    title: 'Nonverbal Communication',
    source: 'Toastmasters International',
    category: 'Body Language',
    description: 'Understanding the role of body language, gestures, and facial expressions.',
    url: 'https://www.toastmasters.org',
    image: 'https://c.animaapp.com/mhq88pqwiHYRIA/img/ai_1.png',
  },
  {
    id: 5,
    title: 'Effective Feedback Methods',
    source: 'MindTools',
    category: 'Feedback',
    description: 'How to give and receive constructive feedback in professional settings.',
    url: 'https://www.mindtools.com/pages/article/newTMM_98.htm',
    image: 'https://c.animaapp.com/mhq88pqwiHYRIA/img/ai_1.png',
  },
  {
    id: 6,
    title: 'Cross-Cultural Communication',
    source: 'Toastmasters International',
    category: 'Cultural Awareness',
    description: 'Navigate cultural differences and communicate effectively across cultures.',
    url: 'https://www.toastmasters.org',
    image: 'https://c.animaapp.com/mhq88pqwiHYRIA/img/ai_1.png',
  },
];

export default function ReferenceHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(references.map(r => r.category)));

  const filteredReferences = references.filter(ref => {
    const matchesSearch = ref.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ref.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || ref.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-sans font-semibold text-foreground">Reference Hub</h1>
        <p className="text-muted-foreground font-body mt-2">Curated resources for communication mastery</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" strokeWidth={2} />
          <Input
            type="search"
            placeholder="SearchIcon resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={selectedCategory === null ? 'default' : 'outline'}
            className={
              selectedCategory === null
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-normal'
                : 'bg-card text-foreground border-border hover:bg-muted hover:text-foreground font-normal'
            }
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-normal'
                  : 'bg-card text-foreground border-border hover:bg-muted hover:text-foreground font-normal'
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReferences.map((ref) => (
          <Card key={ref.id} className="bg-card border-border overflow-hidden flex flex-col">
            <div className="relative h-48 bg-muted">
              <img
                src={ref.image}
                alt="communication nodes illustration"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 right-3">
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-body font-medium">
                  {ref.category}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <BookOpenIcon className="w-5 h-5 text-primary flex-shrink-0 mt-1" strokeWidth={2} />
                <div className="flex-1">
                  <h3 className="font-sans font-semibold text-lg text-foreground mb-1">{ref.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{ref.source}</p>
                </div>
              </div>
              <p className="text-sm font-body text-foreground mb-4 flex-1">{ref.description}</p>
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
              >
                <a href={ref.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLinkIcon className="w-4 h-4 mr-2" strokeWidth={2} />
                  View Resource
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredReferences.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground font-body">No resources found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
