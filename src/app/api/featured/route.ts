import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

const itemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().default(''),
  quality: z.string().optional(),
  status: z.string().optional(),
  priceType: z.enum(['paid', 'free']).optional(),
  price: z.number().nullable().optional(),
  tags: z.array(z.string()).optional(),
  mainImage: z.string().min(1).optional(),
  backupImages: z.array(z.string()).optional(),
  sortOrder: z.number().int().nonnegative().optional(),
  publishAt: z.string().nullable().optional(),
  updatedAt: z.string().optional(),
});

const payloadSchema = z.object({
  items: z.array(itemSchema),
});

type FeaturedRow = {
  id: string;
  title: string;
  description: string;
  quality: string | null;
  status: string | null;
  priceType: string | null;
  price: number | null;
  tags: string | null;
  mainImage: string | null;
  backupImages: string | null;
  sortOrder: number | null;
  publishAt: string | null;
  updatedAt: string | null;
};

const mapRow = (row: FeaturedRow) => ({
  id: row.id,
  title: row.title,
  description: row.description ?? '',
  quality: row.quality ?? 'common',
  status: row.status ?? 'draft',
  priceType: (row.priceType as 'paid' | 'free' | null) ?? (row.price ? 'paid' : 'free'),
  price: row.price ?? null,
  tags: row.tags ? (JSON.parse(row.tags) as string[]) : [],
  mainImage: row.mainImage ?? '',
  backupImages: row.backupImages ? (JSON.parse(row.backupImages) as string[]) : [],
  sortOrder: row.sortOrder ?? 0,
  publishAt: row.publishAt,
  updatedAt: row.updatedAt ?? new Date().toISOString(),
});

const selectAll = () => {
  const db = getDb();
  const rows = db
    .prepare('SELECT * FROM featured ORDER BY sortOrder ASC, updatedAt DESC')
    .all() as FeaturedRow[];
  return rows.map(mapRow);
};

export async function GET() {
  const items = selectAll();
  return NextResponse.json({ items });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = payloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }

    const now = new Date().toISOString();
    const normalized = parsed.data.items.map((item, index) => ({
      id: item.id ?? String(Date.now() + index),
      title: item.title,
      description: item.description ?? '',
      quality: item.quality ?? 'common',
      status: item.status ?? 'draft',
      priceType: item.priceType ?? (item.price ? 'paid' : 'free'),
      price: item.price ?? null,
      tags: JSON.stringify(item.tags ?? []),
      mainImage: item.mainImage ?? '',
      backupImages: JSON.stringify(item.backupImages ?? []),
      sortOrder: item.sortOrder ?? index,
      publishAt: item.publishAt ?? null,
      updatedAt: item.updatedAt ?? now,
    }));

    const db = getDb();

    const insert = db.prepare(
      `INSERT OR REPLACE INTO featured (
        id, title, description, quality, status, priceType, price, tags, mainImage, backupImages, sortOrder, publishAt, updatedAt
      ) VALUES (@id, @title, @description, @quality, @status, @priceType, @price, @tags, @mainImage, @backupImages, @sortOrder, @publishAt, @updatedAt)`
    );

    const tx = db.transaction((items: typeof normalized) => {
      db.prepare('DELETE FROM featured').run();
      for (const item of items) {
        insert.run(item);
      }
    });

    tx(normalized);

    const items = selectAll();
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update featured items' }, { status: 500 });
  }
}
