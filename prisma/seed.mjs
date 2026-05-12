import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_aM76LEOYACbD@ep-soft-term-aqzkmgz3-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

const FIXED_CATEGORIES = [
  "Headlines", "Breaking News", "GTV Content", "Politics", 
  "International", "Entertainment", "Health", "Sports"
];

async function seed() {
  console.log('🌱 Seeding database...\n');

  // 1. Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const userResult = await pool.query(
    `INSERT INTO users (email, password, name, role, created_at, updated_at) 
     VALUES ($1, $2, $3, $4, NOW(), NOW()) 
     ON CONFLICT (email) DO UPDATE SET password = $2, name = $3, role = $4
     RETURNING id, email, name, role`,
    ['admin@gtvafrik.com', hashedPassword, 'GTV Admin', 'admin']
  );
  console.log('✅ Admin user created:', userResult.rows[0].email);

  // 2. Seed fixed categories
  for (const catName of FIXED_CATEGORIES) {
    const slug = catName.toLowerCase().replace(/\s+/g, '-');
    await pool.query(
      `INSERT INTO categories (name, slug, created_at) 
       VALUES ($1, $2, NOW()) 
       ON CONFLICT (slug) DO NOTHING`,
      [catName, slug]
    );
  }
  console.log('✅ Fixed categories seeded');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📋 Admin Login Credentials:');
  console.log('   Email:    admin@gtvafrik.com');
  console.log('   Password: admin123');
  
  await pool.end();
  process.exit(0);
}

seed().catch((e) => {
  console.error('❌ Seed failed:', e);
  process.exit(1);
});
