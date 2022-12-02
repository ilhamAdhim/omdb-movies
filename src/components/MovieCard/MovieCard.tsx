import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";

interface IMovieCardProps {
  title?: string;
  poster?: string;
  year?: string;
  imdbID?: string;
  isLiked?: boolean;
  handleOpenModal?: (imdbID: string) => void;
}

const MovieCard: React.FC<IMovieCardProps> = ({
  title,
  poster,
  year,
  isLiked,
  imdbID,
  handleOpenModal,
}) => {
  return (
    <Col style={{ marginTop: 10 }}>
      <Card>
        <Card.Img variant="top" src={poster} />
        <Card.Body>
          <Card.Title>{title || "Card title"}</Card.Title>
        </Card.Body>
        <Card.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <small className="text-muted">
            {year || "Last updated 3 mins ago"}
          </small>
          <Button
            variant={isLiked ? "outline-danger" : "primary"}
            style={{ borderRadius: "50%" }}
          >
            <FaHeart color={isLiked ? "maroon" : "white"} />
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default MovieCard;
