// import { config } from "dotenv";
import { users } from './schemas';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { DB } from "./drizzle";

// config({ path: ".env" });
async function main() {
  try {
    console.log('Starting seed process...');

    // Get admin credentials from environment variables or use defaults
    const adminEmail = process.env.ADMIN_EMAIL ?? '';
    const adminPassword = process.env.ADMIN_PASSWORD ?? '';

    if (!adminEmail || !adminPassword) {
      throw new Error('Admin email and password must be set in environment variables');
    }


    // Check if admin user already exists
    const existingUser = await DB.select().from(users).where(eq(users.email, adminEmail));

    if (existingUser.length > 0) {
      console.log('Admin user already exists, skipping creation');
      return;
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    await DB.insert(users).values({
      firstName: 'Abhay',
      lastName: 'Pansuriya',
      userName: 'AbhayPansuriya',
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
    });

    console.log('Admin user created successfully');
  } catch (error: any) {
    console.error('Error seeding database:', error?.message);
    process.exit(1);
  }
}

// Execute the seed function
main()
  .then(() => {
    console.log('Seed completed successfully');
    process.exit(0);
  }).catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });