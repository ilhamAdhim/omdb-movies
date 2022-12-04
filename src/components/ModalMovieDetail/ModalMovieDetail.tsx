import Spinner from "components/Spinner";
import useMediaQuery from "hooks/useMediaQuery";

import { getMovieById } from "data/data-source";
import { useCallback, useEffect, useState } from "react";
import { Modal, Badge } from "react-bootstrap";
import { FaUserAlt, FaStar, FaTags, FaCalendarAlt } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";

interface IModalMovieDetailProps {
  imdbIDCurrent: string;
  isLiked?: boolean;
  isModalDetailOpen: boolean;
  handleCloseModal?: () => void;
}

const ModalMovieDetail: React.FC<IModalMovieDetailProps> = ({
  imdbIDCurrent,
  isLiked,
  isModalDetailOpen,
  handleCloseModal,
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const [currentMovie, setCurrentMovie] = useState<IMovieItemByIDAPI>();
  const [isLoading, setIsLoading] = useState(false);

  const getDataMovie = useCallback(async () => {
    if (imdbIDCurrent) {
      setIsLoading(true);
      try {
        const data = await getMovieById(imdbIDCurrent);
        setCurrentMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [imdbIDCurrent]);

  useEffect(() => {
    getDataMovie();
  }, [getDataMovie]);

  return (
    <Modal
      size="lg"
      centered
      show={isModalDetailOpen}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{currentMovie?.Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          gap: "1em",
        }}
      >
        <img
          src={currentMovie?.Poster}
          alt={currentMovie?.Title}
          width={isSmallScreen ? "100%" : "40%"}
          loading="lazy"
        />
        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "auto",
              height: "300px",
              textAlign: "center",
            }}
          >
            <Spinner text="Getting movie..." />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <p style={{ textAlign: "justify" }}>
              {currentMovie?.Plot ||
                `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ea
              porro rem sed possimus repudiandae labore asperiores totam minus
              eos at dolorum fugit, beatae et rerum nisi soluta quisquam
              pariatur!`}
            </p>
            {currentMovie?.Runtime !== "N/A" && (
              <div style={{ display: "flex", gap: "1em" }}>
                <RiMovie2Fill
                  color="#3E36C1"
                  fontSize="1em"
                  style={{ margin: "auto 0" }}
                />
                {currentMovie?.Runtime}
              </div>
            )}

            {currentMovie?.Released !== "N/A" && (
              <div style={{ display: "flex", gap: "1em" }}>
                <FaCalendarAlt
                  color="#3E36C1"
                  fontSize="1em"
                  style={{ margin: "auto 0" }}
                />
                {currentMovie?.Released}
              </div>
            )}

            {currentMovie?.Actors !== "N/A" && (
              <div style={{ display: "flex", gap: "1em" }}>
                <FaUserAlt
                  color="#3E36C1"
                  fontSize="1em"
                  style={{ margin: "auto 0" }}
                />
                {currentMovie?.Actors}
              </div>
            )}

            <div style={{ display: "flex", gap: "1em" }}>
              <FaTags color="#3E36C1" />
              <div style={{ display: "flex", gap: "0.2em" }}>
                {currentMovie?.Genre?.split(",").map((item, id) => (
                  <Badge key={id} pill bg="primary">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {currentMovie?.imdbRating !== "N/A" && (
              <div style={{ display: "flex", gap: "1em" }}>
                <FaStar
                  color="orange"
                  fontSize="1em"
                  style={{ margin: "auto 0" }}
                />
                {currentMovie?.imdbRating}/10
              </div>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalMovieDetail;
