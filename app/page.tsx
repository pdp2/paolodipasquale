import { PortableText, SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/client";

const POSTS_QUERY = `*[
  _type == "post"
]{
  _id, 
  title,
  _createdAt,
  content
}`;

export default async function IndexPage() {
  const posts = await sanityFetch<SanityDocument[]>({query: POSTS_QUERY});

  console.log(posts);

  return (
    <main>
      {posts.map((post) => (
        <article
          key={post?._id}
          className="mb-12"
        >
          <header className="mb-2">
            <h2 className="text-3xl mt-1">{post?.title}</h2>
            <p className="text-sm">{'Posted by Paolo on '}
              {new Date(post?._createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }).replace(',', '')}
            </p>
          </header>
          {post.content && post.content.length > 0 && (
            <PortableText value={post.content} />
          )}
        </article>
      ))}
    </main>
  );
}