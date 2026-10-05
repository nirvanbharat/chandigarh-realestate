import type { CollectionConfig } from 'payload'

export const Guides: CollectionConfig = {
  slug: 'guides',
  labels: {
    singular: 'Guide',
    plural: 'Guides',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'publishedAt', 'updatedAt'],
    description: 'Neighborhood guides and area editorials',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from title if blank.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            if (data?.title) {
              return data.title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'location',
      type: 'select',
      required: true,
      options: [
        { label: 'Chandigarh', value: 'chandigarh' },
        { label: 'Mohali', value: 'mohali' },
        { label: 'Panchkula', value: 'panchkula' },
        { label: 'Zirakpur', value: 'zirakpur' },
        { label: 'New Chandigarh', value: 'new-chandigarh' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Links this guide to a location page.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt',
      admin: {
        description: 'Short summary shown on the guides index. 1–2 sentences.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on the homepage.',
      },
    },
  ],
}
