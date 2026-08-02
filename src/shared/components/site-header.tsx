// src/shared/components/site-header.tsx — Premium sticky navbar with mega menu.

'use client';

import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  Search,
  User,
  X,
  ChevronDown,
  Command,
  Image as ImageIcon,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { BrandLogo } from '@/shared/components/brand-logo';
import { ThemeToggle } from './theme-toggle';
import { routes } from '@/shared/config/routes';
import { categories } from '@/shared/config/categories';
import { navigation } from '@/generated/navigation';
import { useCurrentUser } from '@/identity/hooks/use-current-user';
import { signOut } from '@/identity/actions/auth-actions';
import { notificationService } from '@/shared/lib/notification-service';
import { useCommandPaletteStore } from '@/shared/hooks/use-command-palette-store';
import { cn } from '@/lib/utils';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  image: ImageIcon,
};

function initialsFromEmail(email: string): string {
  const [name] = email.split('@');
  if (!name) return 'U';
  const parts = name.split(/[._-]/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();
  const [signingOut, startSignOut] = useTransition();
  const setPaletteOpen = useCommandPaletteStore((s) => s.setOpen);

  // Detect scroll for header background transition
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 8;
      queueMicrotask(() => setScrolled(next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    queueMicrotask(() => {
      setMobileOpen(false);
      setSearchOpen(false);
    });
  }, [pathname]);

  const onSignOut = () => {
    startSignOut(async () => {
      const result = await signOut();
      if (!result.success) {
        notificationService.error(result.error ?? 'Could not sign out.');
        return;
      }
      notificationService.success('Signed out');
      router.push(routes.login);
      router.refresh();
    });
  };

  const initials = user?.email ? initialsFromEmail(user.email) : 'U';

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-colors',
        scrolled
          ? 'border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'
          : 'border-transparent bg-background',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Logo + Desktop Nav */}
        <div className="flex items-center gap-6">
          <BrandLogo size="sm" />

          {/* Desktop Navigation Menu (mega menu) */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                    {navigation.map((cat) => {
                      const Icon = CATEGORY_ICONS[cat.category] ?? FileText;
                      return (
                        <div
                          key={cat.category}
                          className="group rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                        >
                          <Link
                            href={routes.category(cat.category)}
                            className="flex items-center gap-2"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                              <Icon className="h-4 w-4" aria-hidden />
                            </div>
                            <div>
                              <p className="text-sm font-semibold capitalize">
                                {cat.category}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {cat.tools.length} tools
                              </p>
                            </div>
                          </Link>
                          <ul className="mt-3 space-y-1">
                            {cat.tools.slice(0, 4).map((t) => (
                              <li key={t.slug}>
                                <Link
                                  href={routes.tool(t.category, t.slug)}
                                  className="block truncate text-xs text-muted-foreground transition-colors hover:text-foreground"
                                >
                                  {t.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href={routes.tools} className={navigationMenuTriggerStyle()}>
                    All Tools
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/#how-heading" className={navigationMenuTriggerStyle()}>
                    How it works
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/#faq-heading" className={navigationMenuTriggerStyle()}>
                    FAQ
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Search + Theme + Auth */}
        <div className="flex items-center gap-2">
          {/* Desktop search trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPaletteOpen(true)}
            className="hidden h-9 gap-2 pl-3 pr-2 sm:flex"
            aria-label="Open command palette"
          >
            <Search className="h-4 w-4" aria-hidden />
            <span className="text-xs text-muted-foreground">Search...</span>
            <kbd className="ml-2 hidden items-center gap-0.5 rounded border border-border bg-muted px-1 py-0.5 text-[10px] font-medium text-muted-foreground md:flex">
              <Command className="h-2.5 w-2.5" aria-hidden />
              K
            </kbd>
          </Button>

          {/* Mobile search trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            aria-expanded={searchOpen}
          >
            {searchOpen ? <X className="h-4 w-4" aria-hidden /> : <Search className="h-4 w-4" aria-hidden />}
          </Button>

          <ThemeToggle />

          {/* Auth */}
          {loading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" aria-label="User menu">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Signed in</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={routes.dashboard}>
                    <LayoutDashboard className="mr-2 h-4 w-4" aria-hidden />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={routes.dashboard}>
                    <User className="mr-2 h-4 w-4" aria-hidden />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSignOut} disabled={signingOut}>
                  {signingOut ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <LogOut className="mr-2 h-4 w-4" aria-hidden />
                  )}
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button asChild variant="ghost" size="sm">
                <Link href={routes.login}>Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href={routes.register}>Get started</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-0">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <MobileNav onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile search bar (collapsible) */}
      {searchOpen && (
        <div className="border-t border-border bg-background sm:hidden">
          <form onSubmit={onSearchSubmit} className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools..."
                className="h-10 pl-9"
                autoFocus
                aria-label="Search tools"
              />
            </div>
            <Button type="submit" size="sm">Go</Button>
          </form>
        </div>
      )}
    </header>
  );
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav className="flex h-full flex-col gap-6 overflow-y-auto p-6" aria-label="Mobile navigation">
      <BrandLogo size="sm" />

      <div className="space-y-1">
        <Link
          href={routes.tools}
          onClick={onNavigate}
          className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          All Tools
        </Link>
        <Link
          href="/#how-heading"
          onClick={onNavigate}
          className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          How it works
        </Link>
        <Link
          href="/#faq-heading"
          onClick={onNavigate}
          className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          FAQ
        </Link>
      </div>

      <div>
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Categories
        </p>
        <ul className="mt-2 space-y-1">
          {navigation.map((cat) => (
            <li key={cat.category}>
              <Link
                href={routes.category(cat.category)}
                onClick={onNavigate}
                className="block rounded-md px-3 py-2 text-sm capitalize hover:bg-muted"
              >
                {cat.category} ({cat.tools.length})
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto space-y-2 border-t border-border pt-6">
        <Button asChild variant="outline" className="w-full">
          <Link href={routes.login} onClick={onNavigate}>
            Sign in
          </Link>
        </Button>
        <Button asChild className="w-full">
          <Link href={routes.register} onClick={onNavigate}>
            Get started
          </Link>
        </Button>
      </div>
    </nav>
  );
}
