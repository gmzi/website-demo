import React from 'react';
import Image from 'next/image';

// type ImageGridProps = {
//     images: string[];
//   };  

// const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
//   return (
//     <div className="image-grid">
//       {images.map((url, index) => (
//         <div key={index} className={`image-box image-box-${index}`}>
//           {/* <img src={url} alt="Event" /> */}
//           <Image
//             src={url}
//             fill
//             sizes="(max-width: 768px) 213px, 33vw"
//             priority
//             className="rounded-lg object-cover"
//             alt="Picture of the author"
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ImageGrid;

type ImageGridProps = {
  images: string[];
};

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="image-grid">
      {images.map((src, index) => (
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
