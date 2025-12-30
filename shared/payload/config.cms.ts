import { lexicalEditor } from '@payloadcms/richtext-lexical'
import base from './config.base'

export default {
  ...base,
  editor: lexicalEditor(),
}
