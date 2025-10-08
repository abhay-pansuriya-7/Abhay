import { integer, text, boolean, pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});


export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  userName: varchar("user_name", { length: 100 }).notNull().unique(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),

  phoneNo: varchar("phone_no", { length: 20 }),
  profilePicture: text("profile_picture"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});