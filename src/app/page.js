import { getAllPosts } from "../../lib/api";
import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default async function Home() {
  const posts = await getAllPosts();
  console.log(posts, "POSTS");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <section className="w-full pt-12">
        <div className="mx-auto container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Welcome to Our Blog
              </h1>
              <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                Discover our latest posts, stories, and insights.
              </p>
            </div>
          </div>
          <div className="space-y-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.sys.id}
                  className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden"
                >
                  <Image
                    alt={post.featuredImage?.description || post.title}
                    className="aspect-[4/3] object-cover w-full"
                    height="263"
                    src={post.featuredImage.url}
                    width="350"
                  />
                  <div className="flex-1 p-6">
                    <Link href={`/posts/${post.slug}`}>
                      <h3 className="text-2xl font-bold leading-tight text-pink-700 py-4">
                        {post.title}
                      </h3>
                    </Link>
                    <article className="max-w-none text-zinc-500 mt-4 mb-2 text-sm dark:text-zinc-400">
                      {documentToReactComponents(post.post.json)}
                    </article>
                    <div className="flex justify-end">
                      <Link
                        className="inline-flex h-10 items-center justify-center text-sm font-medium"
                        href={`/posts/${post.slug}`}
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
