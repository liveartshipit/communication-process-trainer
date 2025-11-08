import { Link, useLocation } from 'react-router-dom';
import { MessageSquareIcon, BarChart3Icon, GitBranchIcon, BrainIcon, BookOpenIcon, SettingsIcon, UserIcon, LogOutIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: '/chat', label: 'Chat Simulation', icon: MessageSquareIcon },
  { path: '/analytics', label: 'Analytics Dashboard', icon: BarChart3Icon },
  { path: '/flowchart', label: 'Flowchart Visualizer', icon: GitBranchIcon },
  { path: '/quizzes', label: 'Quizzes', icon: BrainIcon },
  { path: '/reference', label: 'Reference Hub', icon: BookOpenIcon },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-card border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-1 flex items-center justify-center">
                <MessageSquareIcon className="w-6 h-6 text-primary-foreground" strokeWidth={2} />
              </div>
              <span className="font-sans font-semibold text-lg text-foreground">CommTrainer</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden bg-transparent text-foreground hover:bg-muted hover:text-foreground"
              onClick={onClose}
            >
              <XIcon className="w-5 h-5" strokeWidth={2} />
            </Button>
          </div>

          <Separator className="bg-border" />

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    font-body font-normal text-sm
                    transition-colors duration-200
                    ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <Separator className="bg-border" />

          {/* UserIcon utilities */}
          <div className="p-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 bg-transparent text-foreground hover:bg-muted hover:text-foreground font-normal"
            >
              <SettingsIcon className="w-5 h-5" strokeWidth={2} />
              <span>SettingsIcon</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 bg-transparent text-foreground hover:bg-muted hover:text-foreground font-normal"
            >
              <UserIcon className="w-5 h-5" strokeWidth={2} />
              <span>Profile</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 bg-transparent text-foreground hover:bg-muted hover:text-foreground font-normal"
            >
              <LogOutIcon className="w-5 h-5" strokeWidth={2} />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
