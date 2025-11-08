import { useState } from 'react';
import { SearchIcon, BellIcon, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border h-16 flex items-center px-4 md:px-8 gap-4">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden bg-transparent text-foreground hover:bg-muted hover:text-foreground"
        onClick={onMenuClick}
      >
        <MenuIcon className="w-6 h-6" strokeWidth={2} />
      </Button>

      {/* SearchIcon */}
      <div className="flex-1 max-w-md relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" strokeWidth={2} />
        <Input
          type="search"
          placeholder="SearchIcon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Notifications */}
      <Button
        variant="ghost"
        size="icon"
        className="relative bg-transparent text-foreground hover:bg-muted hover:text-foreground"
      >
        <BellIcon className="w-5 h-5" strokeWidth={2} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-tertiary rounded-full" />
      </Button>

      {/* User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-transparent hover:bg-muted p-0">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-secondary text-secondary-foreground font-body">JD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-popover text-popover-foreground border-border">
          <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">Profile</DropdownMenuItem>
          <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">Settings</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
