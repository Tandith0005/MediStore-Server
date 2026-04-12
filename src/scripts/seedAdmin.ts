// src/seed/seedAdmin.ts
import { envVars } from "../config/envVars.js";
import { prisma } from "../lib/prisma.js";

async function seedAdmin() {
  try {
    const ADMIN_NAME = envVars.ADMIN_NAME;
    const ADMIN_EMAIL = envVars.ADMIN_EMAIL;
    const ADMIN_PASSWORD = envVars.ADMIN_PASSWORD;

    // Check if admin exists
    const existingUser = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL },
    });

    if (existingUser) {
      // Update to ADMIN role if not already
      if (existingUser.role !== 'ADMIN') {
        await prisma.user.update({
          where: { email: ADMIN_EMAIL },
          data: { role: "ADMIN", emailVerified: true },
        });
        console.log("Updated existing user to ADMIN role");
      } else {
        console.log("Admin already exists");
      }
      return;
    }

    // Use BetterAuth API to create user
    const response = await fetch(`${envVars.APP_URL}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Admin user created via API");
      
      // Update role to ADMIN
      await prisma.user.update({
        where: { email: ADMIN_EMAIL },
        data: { role: "ADMIN", emailVerified: true },
      });
      console.log("Updated role to ADMIN");
    } else {
      console.error("Failed to create admin via API:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();