import React from 'react';
import Image from 'next/image';

type ImageGridProps = {
    images: string[];
  };  

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="image-grid">
      {images.map((url, index) => (
        <div key={index} className={`image-box image-box-${index}`}>
          {/* <img src={url} alt="Event" /> */}
          <Image
            src={url}
            // fill
            // sizes="(max-width: 768px) 213px, 33vw"
            // priority
            // className="rounded-lg object-cover"
            // alt="Picture of the author"
            width={0}
            height={0}
            sizes="100vw"
            style={{
                width: '100%',
                height: '100%',
            }}
            alt="Picture of the author"
          />
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
