import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";

function ColorPicker({prevColor, pickColor }) {
  const [color, setColor] = useState(prevColor.color);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div>
      <Button
        size="medium"
        color="primary"
        variant="contained"
        onClick={() => {
          setShowPicker((showPicker) => !showPicker);
        }}
        style={{
          width: "100%",
          padding: "10px 10px",
          marginBottom: "15px",
          alignSelf: "center",
        }}
      >
        {showPicker ? "Close color picker" : "Pick a color"}
      </Button>
      {showPicker && (
        <>
          <ChromePicker
            color={color}
            onChange={(updateColor) => {
              setColor(updateColor.hex);
              pickColor(updateColor.hex)
            }}
          />
        </>
      )}
      <h4>Selected color: {color}</h4>
    </div>
  );
}

export default ColorPicker;
