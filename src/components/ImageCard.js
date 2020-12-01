import React from "react";
import styled from "styled-components";
import { Card } from "react-bootstrap";

const CardWrapper = styled(Card)`
  border-radius: 20px;
  width:500px;
`;

const CardImage = styled(Card.Img)`
  border-radius: 20px;
`;

const ImageCard = ({ src, description }) => {
  return (
    <CardWrapper className="bg-info mt-3">
      <CardImage variant="top" src={src} />
      <Card.Body >
        <Card.Title>description</Card.Title>
        <Card.Text>{description ? description : "Not Provided" }</Card.Text>
      </Card.Body>
    </CardWrapper>
  );
};

export default React.memo(ImageCard);