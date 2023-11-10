import React from 'react';
import Image from 'next/image';


type ImageGridProps = {
  images: string[];
};



const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {

  const filteredUrls = images.filter(item => item);

  return (
    <div className="image-grid">
      {filteredUrls.map((src, index) => (
        <div key={index}>
          <Image
            src={src}
            width={0}
            height={0}
            sizes="100vw"
            alt="Picture of the author"
            />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
