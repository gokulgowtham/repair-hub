import { pgTable, serial, varchar, boolean, timestamp, integer, text } from "drizzle-orm/pg-core";

import {relations} from "drizzle-orm";

export const ticket = pgTable("tickets", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").notNull().references(() => customer.id),
    title: varchar("title", {length: 255}).notNull(),
    description: text("description").notNull(),
    completed: boolean("completed").notNull().default(false),
    tech: varchar("tech", {length: 255}).notNull().default("unassigned"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export const customer = pgTable("customers", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  phone: varchar("phone", { length: 255 }).unique().notNull(),
  address1: text("address1").notNull(),
  address2: text("address2"),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 2 }).notNull(),
  zip: varchar("zip", { length: 10 }).notNull(),
  notes: text("notes"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

//Create relations
export const customerRelations = relations(customer, ({many})=>{
    return {
        ticket: many(ticket),
    }
})

export const ticketRelation  =  relations(ticket, ({one})=>{
    return {
        customer: one(customer, {
            fields: [ticket.customerId],
            references: [customer.id],
        }),
    }
})