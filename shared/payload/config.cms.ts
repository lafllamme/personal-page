import base from './config.base'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export default {
  ...base,
  editor: lexicalEditor(),
} 