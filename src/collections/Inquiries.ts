import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
    slug: 'inquiries',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'property', 'createdAt'],
    },
    access: {
        read: ({ req: { user } }) => Boolean(user),
        create: () => true,          // public — form submissions
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
    },
    fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', required: true },
        { name: 'message', type: 'textarea' },
        {
            name: 'property',
            type: 'relationship',
            relationTo: 'properties',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'new',
            options: [
                { label: 'New', value: 'new' },
                { label: 'Contacted', value: 'contacted' },
                { label: 'Closed', value: 'closed' },
            ],
        },
    ],
}