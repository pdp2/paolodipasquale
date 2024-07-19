import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/client";

const POSTS_QUERY = `*[
  _type == "post"
]{_id, title, content}`;

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
            {post.title}
          </li>
        ))}
      </ul>
    </main>
  );
}