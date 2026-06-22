import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// Helper to ensure a settings row always exists
async function getSettingsRow() {
  let settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!settings) {
    settings = await prisma.siteSettings.create({ data: { id: 1 } });
  }
  return settings;
}

export async function GET() {
  try {
    const dbSettings = await getSettingsRow();
    
    // Format to match what the frontend expects
    const formattedSettings = {
      site: {
        name: dbSettings.siteName,
        tagline: dbSettings.tagline,
        description: dbSettings.description,
        logo: dbSettings.logo,
      },
      social: {
        twitter: dbSettings.twitter,
        facebook: dbSettings.facebook,
        instagram: dbSettings.instagram,
        youtube: dbSettings.youtube,
        tiktok: dbSettings.tiktok,
      },
      notifications: {
        emailOnNewArticle: dbSettings.emailOnNewArticle,
        emailOnComment: dbSettings.emailOnComment,
        emailAddress: dbSettings.emailAddress,
      }
    };

    return NextResponse.json({ settings: formattedSettings });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    await getSettingsRow(); // Ensure row exists before updating

    const updated = await prisma.siteSettings.update({
      where: { id: 1 },
      data: {
        siteName: body.site?.name,
        tagline: body.site?.tagline,
        description: body.site?.description,
        logo: body.site?.logo,
        twitter: body.social?.twitter,
        facebook: body.social?.facebook,
        instagram: body.social?.instagram,
        youtube: body.social?.youtube,
        tiktok: body.social?.tiktok,
        emailOnNewArticle: body.notifications?.emailOnNewArticle,
        emailOnComment: body.notifications?.emailOnComment,
        emailAddress: body.notifications?.emailAddress,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
