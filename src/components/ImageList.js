import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component"
import { Spinner, Alert } from "react-bootstrap";
import ImageCard from "./ImageCard";

const ImageList = () => {
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  //function for update list
  const getList = () => {

    const url = "https://api.unsplash.com/photos/random?count=5&&client_id=TgyYeity5nvpMRz5T9uU09cUp9oC_E5VbY6f9vojw1E";
    const options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      })
    };

    //fetching images
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        let list = [...imageList];
        data.map(item => {
          let image = {
            id: item.id,
            link: item.urls.small,
            description: item.description ? item.description : item.alt_description
          };
          list.push(image);
        });
        setIsLoading(false);
        setImageList(list);
      }).catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  if (isLoading) return <Spinner animation="border" />;
  if (isError) return (
    <Alert variant="danger">
      oops ! something went wrong
    </Alert>
  );

  return (
    <div className="bg-secondary d-flex justify-content-center" >
      <div>
        <h1 className=" bg-secondary sticky-top">
          Images
        </h1>
        <InfiniteScroll
          dataLength={imageList.length}
          next={getList}
          hasMore={true}
        >
          {
            imageList.map((image) => (
              <ImageCard
                key={image.id}
                src={image.link}
                description={image.description}
              />
            ))
          }
        </InfiniteScroll>
      </div>
    </div >
  );
};

export default ImageList;

