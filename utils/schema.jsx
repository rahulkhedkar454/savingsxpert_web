import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable('budgets',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull(),
    icon:varchar('icon'),
    createdBy:varchar('createdby').notNull()
})

export const Expenses = pgTable('expenses',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull(),
    budgetId:integer('budgetid').references(()=>Budgets.id),
    createdAt:varchar('createdAt').notNull()
})