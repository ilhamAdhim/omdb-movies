import React from "react";
import { Card, Col } from "react-bootstrap";

interface IMovieCardProps {
  title?: string;
  poster?: string;
  year?: string;
  imdbID?: string;
  handleOpenModal?: (imdbID: string) => void;
}

const MovieCard: React.FC<IMovieCardProps> = ({
  title,
  poster,
  year,
  imdbID,
  handleOpenModal,
}) => {
  return (
    <Col style={{ marginTop: 10 }}>
      <Card>
        <Card.Img variant="top" src={poster} />
        <Card.Body>
          <Card.Title>{title || "Card title"}</Card.Title>
          <Card.Text>
            {
              "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
            }
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            {year || "Last updated 3 mins ago"}
          </small>
          <small className="text-muted">
            {year || "Last updated 3 mins ago"}
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default MovieCard;
