import { sql } from '@vercel/postgres';
import { customers, invoices, revenue } from './placeholder-data';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

async function seed() {
  try {
    // Drop existing tables if they exist
    await sql`
      DROP TABLE IF EXISTS invoices, customers, revenue, users CASCADE;
    `;

    // Create the customers table with image_url
    await sql`
      CREATE TABLE customers (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        image_url TEXT NOT NULL
      );
    `;

    // Create the invoices table
    await sql`
      CREATE TABLE invoices (
        id TEXT PRIMARY KEY,
        customer_id UUID NOT NULL REFERENCES customers(id),
        amount INTEGER NOT NULL,
        date DATE NOT NULL,
        status TEXT NOT NULL
      );
    `;

    // Create the revenue table
    await sql`
      CREATE TABLE revenue (
        month TEXT NOT NULL,
        revenue INTEGER NOT NULL
      );
    `;

    // Create the users table for authentication
    await sql`
      CREATE TABLE users (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `;

    // Insert users (for login)
    const hashedPassword = await hash('123456', 10);
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${uuidv4()}, 'Test User', 'user@nextmail.com', ${hashedPassword})
      ON CONFLICT (email) DO NOTHING;
    `;

    // Insert customers
    for (const customer of customers) {
      await sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url});
      `;
    }

    // Insert invoices
    for (const invoice of invoices) {
      await sql`
        INSERT INTO invoices (id, customer_id, amount, date, status)
        VALUES (${invoice.id}, ${invoice.customer_id}, ${invoice.amount}, ${invoice.date}, ${invoice.status});
      `;
    }

    // Insert revenue
    for (const entry of revenue) {
      await sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${entry.month}, ${entry.revenue});
      `;
    }

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
} 

seed(); 




