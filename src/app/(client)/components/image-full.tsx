import Image from "next/image";
import styles from "./image-full.module.scss";
import { BlockProps } from "../interfaces/interfaces";

interface ImageFullProps {
  content: BlockProps;
}

const ImageFull: React.FC<ImageFullProps> = ({ content }) => {
    console.log(content);
  return (
    <div className={styles.imageFull}>
      <div className={` ${ content.container ? "container" : ""}`}>
      <p>hi my name is</p>

        {content.imageSrc && content.imageAlt && (
          <div className={`${styles.image} ${"image"} ${content.height ? styles[content.height] : ""}`}>
            <Image
              src={content.imageSrc}
              alt={content.imageAlt}
              fill={true}
              style={{ objectFit: "cover" }}
            />
            <p>slim shady</p>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default ImageFull;