import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

const SETTINGS_PATH = path.join(process.cwd(), 'data', 'settings.json');

const DEFAULT_SETTINGS = {
  site: {
    name: 'GTV Afrik',
    tagline: 'Shaping the African Narrative',
    description: '',
    logo: '',
    favicon: '',
  },
  social: {
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: '',
    tiktok: '',
  },
  notifications: {
    emailOnNewArticle: false,
    emailOnComment: false,
    emailAddress: '',
  },
};

function readSettings() {
  if (!existsSync(SETTINGS_PATH)) return DEFAULT_SETTINGS;
  try {
    return JSON.parse(readFileSync(SETTINGS_PATH, 'utf-8'));
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function writeSettings(data: object) {
  const dir = path.dirname(SETTINGS_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(SETTINGS_PATH, JSON.stringify(data, null, 2));
}

export async function GET() {
  return NextResponse.json({ settings: readSettings() });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const current = readSettings();
    const merged = {
      site: { ...current.site, ...body.site },
      social: { ...current.social, ...body.social },
      notifications: { ...current.notifications, ...body.notifications },
    };
    writeSettings(merged);
    return NextResponse.json({ settings: merged });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}