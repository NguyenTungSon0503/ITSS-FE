import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
import { withAuth } from "../authentication/Login";
import TestEmoji from "../emoji/Emoji";

const Home = withAuth((props) => {
  const [imageId, setImageIds] = useState();
  const loadImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/images", {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
        },
        withCredentials: true,
      });
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
        <Image
          // cloudName = process.env.CLOUDINARY_NAME backend
          cloudName="dul81x4pq"
          publicId={imageId}
          width="300"
          crop="scale"
        />
      </div>
      {/* <TestEmoji /> */}
    </div>
  );
});
export default Home;
