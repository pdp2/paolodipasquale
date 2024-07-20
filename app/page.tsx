import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/client";

const POSTS_QUERY = `*[
  _type == "post"
]{_id, title, content, _createdAt}`;

export default async function IndexPage() {
  const posts = await sanityFetch<SanityDocument[]>({query: POSTS_QUERY});

  return (
    <main>
      <h1>
        Posts
      </h1>
      <ul>
        {posts.map((post) => (
          <li
            key={post._id}
          >
            <h2>{post.title}</h2>
            <p>{'Posted by Paolo on '}
              {new Date(post._createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }).replace(',', '')}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}