import { PortableText, SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/client";
import { TagIcon } from '@sanity/icons'
import Link from 'next/link'
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: "Paolo Di Pasquale's blog",
  description: '',
}


const POSTS_QUERY = `*[
  _type == "post"
]{
  _id, 
  title,
  _createdAt,
  content,
  tag->{name},
  slug,
  excludeFromPostsFeed
}`;

export default async function IndexPage() {
  const posts = await sanityFetch<SanityDocument[]>({query: POSTS_QUERY});

  function showPost(post: SanityDocument) {
    return !post.excludeFromPostsFeed;
  }

  return (
    <main>
      {posts.map((post) => (
        showPost(post) ? 
          <article
            key={post?._id}
            className="mb-12"
          >
            <header className="mb-2">
              <h2 className="text-3xl mt-1"><Link href={`/posts/${post?.slug?.current}`} className="text-blue-600 hover:underline">{post?.title}</Link></h2>
              <p className="mt-1 text-sm flex items-center">{'Posted by Paolo on '}
                {new Date(post?._createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                }).replace(',', '')}
                <span className="ml-1 bg-zinc-200 pt-0.5 pr-1 pb-0.5 pl-0.5 rounded inline-flex"><TagIcon className="inline text-xl" /> {post?.tag?.name}</span>
              </p>
            </header>
            {post?.content?.length > 0 && (
              <div className="prose">
                <PortableText  value={post?.content} />
              </div>
            )}
          </article> : <></>
      ))}
    </main>
  );
}