import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";

export default function Home() {
  const [imageIds, setImageIds] = useState();
  const loadImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/images");
      setImageIds(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    loadImages();
  }, []);
  return (
    <div>
      <h1 className="title">Cloudinary Gallery</h1>
      <div className="gallery">
        {imageIds &&
          imageIds.map((imageId, index) => (
            <Image
              key={index}
              // cloudName = process.env.CLOUDINARY_NAME backend
              cloudName='dul81x4pq'
              publicId={imageId}
              width="300"
              crop="scale"
            />
          ))}
      </div>
    </div>
  );
}
