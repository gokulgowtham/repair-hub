import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {customer} from "@/db/schema";
import { z } from "zod";

export const insertCustomerSchema = createInsertSchema(customer, {
  firstName: (schema) => schema.min(1, "First name is required"),
  lastName: (schema) => schema.min(1, "Last name is required"),
  email: (schema) =>
    schema.email("Invalid email address").min(1, "Email is required"),
  phone: (schema) =>
    schema
      .regex(
        /^\d{3}-\d{3}-\d{4}$/,
        "Invalid phone number format (e.g. 123-456-7890)"
      )
      .min(1, "Phone number is required"),
  address1: (schema) => schema.min(1, "Address is required"),
  city: (schema) => schema.min(1, "City is required"),
  state: (schema) => schema.length(2, "State must be 2 characters"),
  zip: (schema) =>
    schema.regex(
      /^\d{5}(-\d{4})?$/,
      "Zip code must be 5 digits or 9 digits with a hyphen"
    ),
  notes: (schema) => schema.optional(),
});

export const selectCustomerSchema = createSelectSchema(customer);

export type insertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;
export type selectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;