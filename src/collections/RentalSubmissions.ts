import type { CollectionConfig } from 'payload'

export const RentalSubmissions: CollectionConfig = {
  slug: 'rental-submissions',
  labels: {
    singular: 'Rental Submission',
    plural: 'Rental Submissions',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'ownerName', 'location', 'monthlyRent', 'status', 'createdAt'],
    description: 'Owner-submitted rental listings awaiting review',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Property',
          fields: [
            { name: 'title', type: 'text', required: true, label: 'Property Title' },
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
              defaultValue: 'apartment',
              options: [
                { label: 'Apartment', value: 'apartment' },
                { label: 'Villa', value: 'villa' },
                { label: 'Plot', value: 'plot' },
                { label: 'Penthouse', value: 'penthouse' },
              ],
            },
            { name: 'configuration', type: 'text', label: 'Configuration (e.g. 3 BHK)' },
            { name: 'area', type: 'text', label: 'Area (e.g. 1800 sq ft)' },
            { name: 'monthlyRent', type: 'text', required: true, label: 'Monthly Rent' },
            { name: 'deposit', type: 'text', label: 'Deposit' },
            { name: 'description', type: 'textarea' },
            {
              name: 'photos',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              label: 'Property Photos',
            },
          ],
        },
        {
          label: 'Owner',
          fields: [
            { name: 'ownerName', type: 'text', required: true, label: 'Owner Name' },
            { name: 'phone', type: 'text', required: true },
            { name: 'email', type: 'email', required: true },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: {
        position: 'sidebar',
        description: 'Not visible to the submitter',
      },
    },
  ],
}
