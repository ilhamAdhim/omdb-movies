import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";

interface IMovieCardProps {
  imdbID: string;
  title: string;
  poster: string;
  year: string;
  isLiked?: boolean;
  openModalDetail: (imdbID: string) => void;
}

const MovieCard: React.FC<IMovieCardProps> = ({
  imdbID,
  title,
  poster,
  year,
  isLiked,
  openModalDetail,
  ...props
}) => {
  return (
    <Col style={{ marginTop: 10 }} data-aos="fade-left" data-aos-delay={100}>
      <Card>
        <Card.Img variant="top" src={poster} height={500} />
        <Card.Body>
          <Card.Title
            style={{
              fontSize: 14,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "70%",
              }}
            >
              {title || "Card title"}
            </div>
            <small className="text-muted" style={{ margin: "auto 0" }}>
              {year || "Last updated 3 mins ago"}
            </small>
          </Card.Title>
        </Card.Body>
        <Card.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="outline-primary"
            onClick={() => openModalDetail(imdbID)}
          >
            See Details
          </Button>
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
