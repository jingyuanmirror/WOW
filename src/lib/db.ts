import Database from 'better-sqlite3';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import path from 'path';

let db: Database.Database | null = null;

const DB_PATH = path.join(process.cwd(), 'data', 'featured.db');
const SEED_JSON_PATH = path.join(process.cwd(), 'data', 'featured.json');

const TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS featured (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    quality TEXT,
    status TEXT,
    priceType TEXT,
    price REAL,
    tags TEXT,
    mainImage TEXT,
    backupImages TEXT,
    sortOrder INTEGER DEFAULT 0,
    publishAt TEXT,
    updatedAt TEXT
  );
`;

function ensureDir() {
  const dir = path.dirname(DB_PATH);
  mkdirSync(dir, { recursive: true });
}

function seedFromJson(database: Database.Database) {
  if (!existsSync(SEED_JSON_PATH)) return;
  const count = database.prepare('SELECT COUNT(*) as c FROM featured').get() as { c: number };
  if (count.c > 0) return;

  try {
    const raw = readFileSync(SEED_JSON_PATH, 'utf-8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return;

    const insert = database.prepare(
      `INSERT OR REPLACE INTO featured (
        id, title, description, quality, status, priceType, price, tags, mainImage, backupImages, sortOrder, publishAt, updatedAt
      ) VALUES (@id, @title, @description, @quality, @status, @priceType, @price, @tags, @mainImage, @backupImages, @sortOrder, @publishAt, @updatedAt)`
    );

    const tx = database.transaction((items: any[]) => {
      for (const [index, item] of items.entries()) {
        insert.run({
          id: item.id ?? String(Date.now() + index),
          title: item.title ?? '',
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
          updatedAt: item.updatedAt ?? new Date().toISOString(),
        });
      }
    });

    tx(data);
  } catch (error) {
    console.warn('Seed featured from JSON failed:', error);
  }
}

function initDb() {
  ensureDir();
  const database = new Database(DB_PATH);
  database.pragma('journal_mode = WAL');
  database.exec(TABLE_SQL);
  seedFromJson(database);
  return database;
}

export function getDb() {
  if (!db) {
    db = initDb();
  }
  return db;
}
