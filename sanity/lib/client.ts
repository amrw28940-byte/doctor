import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'uqvfweh3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})