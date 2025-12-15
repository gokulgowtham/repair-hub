import { db } from "@/db";
 import { ticket } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTicket(id: number) {
  const ticketRecords = await db
    .select()
    .from(ticket)
    .where(eq(ticket.id, id));
  return ticketRecords[0];
}
