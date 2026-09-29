import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'heroHeadline', type: 'text', defaultValue: 'Properties in Chandigarh Tricity' },
    { name: 'heroSubline', type: 'text', defaultValue: 'A curated catalogue of residences across Chandigarh, Mohali, Panchkula, Zirakpur and New Chandigarh.' },
    { name: 'aboutHeading', type: 'text', defaultValue: 'A quiet approach to real estate.' },
    { name: 'aboutBody', type: 'textarea' },
    { name: 'contactEmail', type: 'email' },
    { name: 'contactPhone', type: 'text' },
    {
      name: 'locationHeroes',
      type: 'group',
      label: 'Location Hero Images',
      fields: [
        { name: 'chandigarh', type: 'upload', relationTo: 'media' },
        { name: 'mohali', type: 'upload', relationTo: 'media' },
        { name: 'panchkula', type: 'upload', relationTo: 'media' },
        { name: 'zirakpur', type: 'upload', relationTo: 'media' },
        { name: 'newChandigarh', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
