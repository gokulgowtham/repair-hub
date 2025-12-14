import { db } from "@/db";
import { customer } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCustomer(id: number) {
    const customerRecords = await db.select().from(customer).where(eq(customer.id, id));
    return customerRecords[0];
}