import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
    slug: 'properties',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'location', 'type', 'status'],
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
                description: 'Auto-generated from title. Edit only if needed.',
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
        },
        {
            name: 'type',
            type: 'select',
            required: true,
            options: [
                { label: 'Apartment', value: 'apartment' },
                { label: 'Villa', value: 'villa' },
                { label: 'Plot', value: 'plot' },
                { label: 'Penthouse', value: 'penthouse' },
            ],
        },
        { name: 'configuration', type: 'text' },
        {
            name: 'area',
            type: 'group',
            fields: [
                { name: 'value', type: 'number', required: true },
                {
                    name: 'unit',
                    type: 'select',
                    defaultValue: 'sqft',
                    options: [
                        { label: 'sq ft', value: 'sqft' },
                        { label: 'sq yd', value: 'sqyd' },
                    ],
                },
            ],
        },
        { name: 'description', type: 'richText' },
        {
            name: 'amenities',
            type: 'array',
            fields: [{ name: 'amenity', type: 'text', required: true }],
        },
        {
            name: 'images',
            type: 'upload',
            relationTo: 'media',
            hasMany: true,
        },
        {
            name: 'floorPlan',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'available',
            options: [
                { label: 'Available', value: 'available' },
                { label: 'Reserved', value: 'reserved' },
                { label: 'Sold', value: 'sold' },
            ],
        },
        { name: 'featured', type: 'checkbox', defaultValue: false },
    ],
}