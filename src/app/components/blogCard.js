import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }) {
  const { title, thumbnail, slug, body } = post.fields;
  return (
    <div className="">
      <div className="">
        <Image
          src={`https:` + thumbnail.fields.file.url}
          alt="picture"
          width={400}
          height={400}
        />
      </div>
      <div className="">
        <div className="">
          <h4>{title}</h4>
        </div>
      </div>
      <div>
        <Link href={`/posts/${slug}`}>Read More</Link>
      </div>
    </div>
  );
}
