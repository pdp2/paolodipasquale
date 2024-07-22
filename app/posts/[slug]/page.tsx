import { PortableText, type SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/client";
import { TagIcon } from "@sanity/icons";
import { Metadata } from 'next'

const METADATA_QUERY = `*[
    _type == "post" && 
    slug.current == $slug
   ][0]{
    title,
   }
`;
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const metadata = await sanityFetch<SanityDocument>({
    query: METADATA_QUERY,
    params,
  });
  const { title } = metadata;
 
  return {
    title: `${title} | Paolo Di Pasquale's blog`,
  }
}

const POST_QUERY = `*[
    _type == "post" &&
    slug.current == $slug
  ][0]{
  _id, 
  title,
  _createdAt,
  content,
  tag->{name}
}`;

export default async function PostPage(
  { params }: Props) {
  const post = await sanityFetch<SanityDocument>({
    query: POST_QUERY,
    params,
  });
  const {
    title,
    content,
    tag,
    _createdAt,
  } = post;

  return (
    <main>
      <article className="mb-12">
        <header className="mb-2">
          <h2 className="text-3xl mt-1">{title}</h2>
          <p className="mt-1 text-sm flex items-center">{'Posted by Paolo on '}
            {new Date(_createdAt).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).replace(',', '')}
            <span className="ml-1 bg-zinc-200 pt-0.5 pr-1 pb-0.5 pl-0.5 rounded inline-flex"><TagIcon className="inline text-xl" /> {tag?.name}</span>
          </p>
        </header>
        {content?.length > 0 && (
          <div className="prose">
            <PortableText  value={post.content} />
          </div>
        )}
      </article>
    </main>
  );
}