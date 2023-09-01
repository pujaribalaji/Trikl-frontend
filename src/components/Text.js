import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";

const Text = ({ text, index, onChangeText }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 200, height: 100 });
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleDrag = (e, ui) => {
    setPosition({ x: ui.x, y: ui.y });
  };

  const handleResize = (e, data) => {
    setSize({ width: data.size.width, height: data.size.height });
  };

  const handleTextChange = (e) => {
    onChangeText(index, e.target.value);
  };

  return (
    <Draggable
      handle=".new-handle"
      defaultPosition={{ x: position.x, y: position.y }}
      onDrag={handleDrag}
    >
      <ResizableBox
        width={size.width}
        height={size.height}
        onResize={handleResize}
        minConstraints={[100, 50]}
      >
        <div className="new-handle" onClick={handleClick}>
          {isEditing ? (
            <textarea
              className="new-text-input"
              value={text}
              onChange={handleTextChange}
              style={{ width: "100%", height: "100%", padding: "4px" }}
            />
          ) : (
            <div className="new-text-display">{text}</div>
          )}
        </div>
      </ResizableBox>
    </Draggable>
  );
};

export default Text;
