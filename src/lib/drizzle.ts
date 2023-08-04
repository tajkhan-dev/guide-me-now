import {pgTable,varchar,integer,boolean,serial} from 'drizzle-orm/pg-core'
import {drizzle} from 'drizzle-orm/vercel-postgres'
import {sql} from '@vercel/postgres'


 export const Quizdata=pgTable("quiz",{
id:serial('id').primaryKey(),
heading:varchar("heading").notNull(),
imageurl:varchar('imageurl').notNull(),
marks:integer('marks').notNull(),
correct:boolean('correct').notNull()

})

export const profiledata=pgTable("profile",{
   id:serial('id').primaryKey(),
   userid:varchar("userid").notNull().unique(),
   about:varchar('about').notNull(),
   education:varchar('education').notNull(),
   skills:varchar('skills').notNull()


})

   export const db=drizzle(sql)

