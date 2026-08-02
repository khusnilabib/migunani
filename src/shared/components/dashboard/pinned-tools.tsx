// src/shared/components/dashboard/pinned-tools.tsx — Pinned tools quick access.

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pin, ArrowUpRight } from 'lucide-react';
import { routes } from '@/shared/config/routes';

const PINNED = [
  { slug: 'image-resize', category: 'image', title: 'Image Resizer' },
  { slug: 'image-compress', category: 'image', title: 'Image Compressor' },
  { slug: 'image-crop', category: 'image', title: 'Image Cropper' },
  { slug: 'image-format-convert', category: 'image', title: 'Format Converter' },
];

export function PinnedTools() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Pin className="h-4 w-4 text-muted-foreground" aria-hidden />
          Pinned tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {PINNED.map((tool) => (
            <Link
              key={tool.slug}
              href={routes.tool(tool.category, tool.slug)}
              className="group flex items-center justify-between gap-2 rounded-md border border-border p-2.5 transition-colors hover:bg-muted"
            >
              <span className="truncate text-sm font-medium">{tool.title}</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-foreground"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
