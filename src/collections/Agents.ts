import type { CollectionConfig } from 'payload'

export const Agents: CollectionConfig = {
    slug: 'agents',
    admin: { useAsTitle: 'name' },
    access: {
        read: () => true,
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
    },
    fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'bio', type: 'textarea' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
    ],
}