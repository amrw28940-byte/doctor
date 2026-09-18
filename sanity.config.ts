import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import contactFields from './sanity/schemaTypes/contactFields'
import doctor from './sanity/schemaTypes/doctor'
import clinic from './sanity/schemaTypes/clinic'
import lab from './sanity/schemaTypes/lab'
import pharmacy from './sanity/schemaTypes/pharmacy'
import nursing from './sanity/schemaTypes/nursing'
import blog from './sanity/schemaTypes/blog'
import joinRequest from './sanity/schemaTypes/joinRequest'

export default defineConfig({
  name: 'default',
  title: 'Kemet AI',
  projectId: 'uqvfweh3', // تم تصحيحه هنا ليطابق مشروعك الفعلي
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [contactFields, doctor, clinic, lab, pharmacy, nursing, blog, joinRequest],
  },
})