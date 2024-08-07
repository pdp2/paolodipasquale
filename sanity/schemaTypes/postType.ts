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
      name: 'slug',
      type: 'slug',
      options: { source: 'title'},
      validation: (rule) => rule
        .required()
        .error('Required to generate a page on the website'),
      hidden: ({document}) => !document?.title
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
    defineField({
      name: 'excludeFromPostsFeed',
      title: 'Exclude from posts feed',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})