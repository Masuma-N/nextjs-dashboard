import { sql } from '@vercel/postgres';
import { formatCurrency } from './utils';
import {
  LatestInvoice,
  Revenue,
  InvoicesTable,
  CustomerField,
  FormattedCustomersTable,
  Invoice,
} from './definitions';

// Fetch revenue chart data
export async function fetchRevenue(): Promise<Revenue[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql`SELECT * FROM revenue`;
    return data.rows as Revenue[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

// Fetch latest 5 invoices
export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  const data = await sql`
    SELECT invoices.amount, customers.name, customers.email, customers.image_url, invoices.id
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5
  `;

  const latestInvoices: LatestInvoice[] = data.rows.map((invoice) => ({
    id: invoice.id,
    name: invoice.name,
    email: invoice.email,
    image_url: invoice.image_url,
    amount: formatCurrency(invoice.amount),
  }));

  return latestInvoices;
}

// Dashboard cards summary data
export async function fetchCardData() {
  const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
  const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
  const invoiceStatusPromise = sql`
    SELECT
      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS paid,
      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS pending
    FROM invoices
  `;

  const [invoiceCount, customerCount, invoiceStatus] = await Promise.all([
    invoiceCountPromise,
    customerCountPromise,
    invoiceStatusPromise,
  ]);

  return {
    numberOfInvoices: Number(invoiceCount.rows[0].count),
    numberOfCustomers: Number(customerCount.rows[0].count),
    totalPaidInvoices: Number(invoiceStatus.rows[0].paid),
    totalPendingInvoices: Number(invoiceStatus.rows[0].pending),
  };
}

// ✅ Full data for Customers Table
export async function fetchCustomers(): Promise<FormattedCustomersTable[]> {
  try {
    const data = await sql<CustomerField>`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
      ORDER BY customers.name ASC
    `;

    const customers = data.rows.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      image_url: customer.image_url,
      total_invoices: Number(customer.total_invoices),
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer data.');
  }
}

// Fetch invoice by ID
export async function fetchInvoiceById(id: string): Promise<Invoice | undefined> {
  try {
    const result = await sql`
      SELECT id, customer_id, amount, status, date
      FROM invoices
      WHERE id = ${id}
    `;
    return result.rows[0] as Invoice;
  } catch (error) {
    console.error('Failed to fetch invoice by ID:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM invoices 
      JOIN customers ON invoices.customer_id = customers.id
      WHERE customers.name ILIKE ${`%${query}%`}`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / 5);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export type InvoiceTableRow = {
  id: string;
  customer_name: string;
  customer_email: string;
  amount: number;
  status: string;
};

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
): Promise<InvoiceTableRow[]> {
  const safePage = currentPage < 1 || isNaN(currentPage) ? 1 : currentPage;
  const offset = (safePage - 1) * 5;

  try {
    const data = await sql<InvoiceTableRow>`
      SELECT invoices.id, invoices.amount, invoices.status,
             customers.name AS customer_name,
             customers.email AS customer_email
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE customers.name ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT 5 OFFSET ${offset}
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered invoices.');
  }
}  
// For form dropdowns (raw list of customers without formatting)
export async function fetchCustomerList(): Promise<CustomerField[]> {
  try {
    const data = await sql<CustomerField>`
      SELECT id, name FROM customers
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer list.');
  }
} 













 
 
 

 


