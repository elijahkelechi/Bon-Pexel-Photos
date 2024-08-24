import React from "react";
import axios from "axios";
import { useGlobalContext } from "./context";
import { useQuery } from "@tanstack/react-query";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_PHOTO_API_KEY
}`;

const Gallery = () => {
  const { searchTerm, setSearchTerm } = useGlobalContext();
  const { data, isLoading, error } = useQuery({
    queryKey: ["photos", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <div className="gallery-div">
        <section className="image-container">
          <h4>Loading</h4>
        </section>
      </div>
    );
  }
  //Note: that the react query takes the responsibility of hadling erros and isLoading
  //console.log(response)
  if (error) {
    return (
      <div className="gallery-div">
        <section className="image-container">
          <h4>An Error occured</h4>
        </section>
      </div>
    );
  }

  const results2 = data.results;
  if (results2.length < 1) {
    return (
      <div className="gallery-div">
        <section className="image-container">
          <h4>No Match Found...</h4>
        </section>
      </div>
    );
  }

  //Tester

  return (
    <div className="gallery-div">
      <section className="image-container">
        {results2.map((images) => (
          <div key={images.id}>
            <img
              className="img"
              src={images.urls.regular}
              style={{ border: "7px grey solid" }}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Gallery;
