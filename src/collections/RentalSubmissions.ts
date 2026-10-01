import type { CollectionConfig } from 'payload'
import { Resend } from 'resend'
import { ConvertToPropertyButton } from '@/components/ConvertToPropertyButton'

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
    components: {
      edit: {
        beforeDocumentControls: [
          {
            path: '@/components/ConvertToPropertyButton',
            exportName: 'ConvertToPropertyButton',
          },
        ],
      },
    },
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation }) => {
        if (operation !== 'update') return
        if (!previousDoc) return
        if (doc.status === previousDoc.status) return
        if (!doc.email) return

        const resend = new Resend(process.env.RESEND_API_KEY)

        try {
          if (doc.status === 'approved') {
            await resend.emails.send({
              from: 'inquiries@nirvanbharat.com',
              to: doc.email,
              subject: 'Your rental listing is live on Nirvan Bharat',
              text: [
                'Hi ' + doc.ownerName + ',',
                '',
                'Good news — your property "' + doc.title + '" has been approved and is now live on our site.',
                '',
                'View it here: https://nirvanbharat.com/properties/rent/browse',
                '',
                'If you have any questions, just reply to this email.',
                '',
                'Nirvan Bharat',
              ].join('\n'),
            })
          }

          if (doc.status === 'rejected') {
            await resend.emails.send({
              from: 'inquiries@nirvanbharat.com',
              to: doc.email,
              subject: 'Update on your rental submission',
              text: [
                'Hi ' + doc.ownerName + ',',
                '',
                'Thank you for submitting "' + doc.title + '" to Nirvan Bharat.',
                '',
                'After review, we are unable to list this property at this time. This is often due to incomplete details, pricing outside the current market, or our current inventory mix.',
                '',
                'If you would like to discuss or resubmit, just reply to this email.',
                '',
                'Nirvan Bharat',
              ].join('\n'),
            })
          }
        } catch (err) {
          console.error('Status notification email failed:', err)
        }
      },
    ],
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
