import useMediaQuery from "hooks/useMediaQuery";
import styles from "./MovieCard.module.css";
import React, { useState } from "react";

import { Card, Col, Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { likeMovie, unlikeMovie } from "data/data-source";

interface IMovieCardProps {
  id: number;
  imdbID: string;
  title: string;
  poster: string;
  year: string;
  isLiked?: boolean;
  openModalDetail: (imdbID: string) => void;
}

const MovieCard: React.FC<IMovieCardProps> = ({
  id,
  imdbID,
  title,
  poster,
  year,
  isLiked,
  openModalDetail,
  ...props
}) => {
  const [movieLiked, setMovieLiked] = useState(isLiked || false);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const handleLike = (movie: IMovieItemSavedLocal) => {
    setMovieLiked((prev) => !prev);
    if (movieLiked) unlikeMovie(movie);
    else likeMovie(movie);
  };

  return (
    <Col
      style={{ marginTop: 10 }}
      data-aos="fade-left"
      data-aos-delay={isSmallScreen ? 0 : id * 50}
    >
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
            style={{ borderRadius: "50%" }}
            className={movieLiked ? styles.buttonLiked : styles.buttonUnliked}
            onClick={() =>
              handleLike({
                imdbID,
                Title: title,
                Poster: poster,
                Year: year,
                isLiked: !movieLiked,
              })
            }
            variant={movieLiked ? "outline-danger" : "primary"}
          >
            <FaHeart color={movieLiked ? "maroon" : "white"} />
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default MovieCard;
