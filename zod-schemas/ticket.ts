import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {ticket} from "@/db/schema";
import { z } from "zod";

export const insertTicketSchema = createInsertSchema(ticket, {
    id: z.union([z.number(), z.literal("(New)")]),
    title: (schema) => schema.min(1, "Title is required"),
    description: (schema) => schema.min(1, "Description is required"),
    tech: (schema) => schema.email("Invalid email address"),
});

export const selectTicketSchema = createSelectSchema(ticket);

export type insertTicketSchemaType = z.infer<typeof insertTicketSchema>;
export type selectTicketSchemaType = z.infer<typeof selectTicketSchema>;