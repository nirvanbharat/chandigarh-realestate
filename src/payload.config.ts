import { buildConfig } from 'payload'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Properties } from './collections/Properties'
import { Agents } from './collections/Agents'
import { Inquiries } from './collections/Inquiries'
import { SiteSettings } from './collections/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: 'users',
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, Media, Properties, Agents, Inquiries],
    globals: [SiteSettings],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.POSTGRES_URL || '',
            max: 3,
        },
    }),
    email: resendAdapter({
        defaultFromAddress: 'onboarding@resend.dev',
        defaultFromName: 'Nirvan Bharat',
        apiKey: process.env.RESEND_API_KEY || '',
    }),
    plugins: [
        vercelBlobStorage({
            enabled: true,
            collections: {
                media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN || '',
        

        }),
    
    importExportPlugin({
      collections: [{ slug: 'properties' }],
    }),
  ],
})

