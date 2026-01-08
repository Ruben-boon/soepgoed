import { fetchPostSingle } from "@/api/sanityApi";
import { PortableText } from "@portabletext/react";
import styles from "./page.module.scss";
import Image from "next/image";
import Carousel from "../../components/carousel";

// Enable ISR with 60 second revalidation
export const revalidate = 60;

const Page = async ({ params }: { params: { id: string } }) => {
  const data = await fetchPostSingle(`${params.id}`);
  const publishDate = data.publishedAt ? data.publishedAt : data._createdAt;

  const carouselContent = {
    heading: "Ander nieuws",
    excludePost: `${params.id}`,
    buttonGroup: {
      buttonToggle: true,
      buttonText: "Meer nieuws",
      buttonLink: "/nieuws",
      buttonVariant: "outline"
    }
  };

  return (
    <main>
      <div className={`container ${styles.nieuwsContainer}`}>
        <div className={styles.postGroup}>
          {data && data.imageSrc && data.imageAlt && (
            <div className={`${styles.image} image`}>
              <Image
                src={data.imageSrc}
                alt={data.imageAlt}
                priority={false}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
           {publishDate && (
            <p className={styles.date}>
              {new Date(publishDate).toLocaleDateString("nL-nl", {
                day: "numeric",
                year: "numeric",
                month: "long",
              })}
            </p>
          )}
          {data && data.heading && <h2>{data.heading}</h2>}
          {data && data.content && <PortableText value={data.content} />}
        </div>
      </div>
      <Carousel content={carouselContent} />
    </main>
  );
};

export default Page;
