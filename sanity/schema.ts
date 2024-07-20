import { type SchemaTypeDefinition } from 'sanity'
import { postType } from '@/sanity/schemaTypes/postType'
import { tagType } from '@/sanity/schemaTypes/tagType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, tagType],
}
