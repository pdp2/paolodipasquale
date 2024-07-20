import { defineField, defineType } from 'sanity'
import { ComposeIcon } from '@sanity/icons'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'tag',
      type: 'reference',
      to: [{ type: 'tag' }],
    }),
  ],
})