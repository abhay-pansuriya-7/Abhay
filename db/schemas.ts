import { integer, text, boolean, pgTable, uuid, varchar, timestamp, json } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});


export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  userName: varchar("userName", { length: 100 }).notNull().unique(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),

  phoneNo: varchar("phoneNo", { length: 20 }),
  profilePicture: text("profilePicture"),  
  isAdmin: boolean("isAdmin").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  aiDescription: text("ai_description"), // For future pgvector storage
  aiDescriptionFile: text("ai_description_file"), // Path to uploaded file
  tags: json("tags").$type<string[]>().notNull().default([]),
  githubLink: varchar("github_link", { length: 500 }),
  demoLink: varchar("demo_link", { length: 500 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});