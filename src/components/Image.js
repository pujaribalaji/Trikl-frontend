import React, { useState, useEffect } from "react";
import axios from "axios";
import Text from "./Text";

const API_KEY = "hqMDXWZcEnHLMkWUc0nwkkLJyu3yd3eYMAkT60Bz0kU";

const Image = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [textOverlays, setTextOverlays] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              count: 1,
            },
            headers: {
              Authorization: `Client-ID ${API_KEY}`,
            },
          }
        );
        setSelectedImage(response.data[0].urls.regular);
        setTextOverlays([]);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleAddText = () => {
    if (textInput.trim() !== "") {
      const textWidth = 200;
      const textHeight = 100;
      const canvasWidth = 600;
      const canvasHeight = 400;
      const position = {
        x: (canvasWidth - textWidth) / 2,
        y: (canvasHeight - textHeight) / 2,
      };

      setTextOverlays([
        ...textOverlays,
        {
          text: textInput,
          position,
          size: { width: textWidth, height: textHeight },
        },
      ]);
      setTextInput("");
    }
  };

  const handleTextChange = (index, newText) => {
    const updatedTextOverlays = [...textOverlays];
    updatedTextOverlays[index].text = newText;
    setTextOverlays(updatedTextOverlays);
  };

  const handleResizeText = (index, newSize) => {
    const updatedTextOverlays = [...textOverlays];
    updatedTextOverlays[index].size = newSize;
    setTextOverlays(updatedTextOverlays);
  };

  return (
    <div className="new-app">
      <div className="new-add-btn-container">
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <button className="new-add-btn" onClick={handleAddText}>
          Add Text
        </button>
      </div>
      <div className="new-selected-image">
        <div className="new-image-with-text">
          <img
            className="new-selected-image"
            src={selectedImage}
            alt="Selected from Unsplash"
          />
          <div className="new-text-overlays">
            {textOverlays.map((text, index) => (
              <Text
                key={index}
                text={text.text}
                index={index}
                position={text.position}
                size={text.size}
                onChangeText={handleTextChange}
                onResizeText={handleResizeText}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
