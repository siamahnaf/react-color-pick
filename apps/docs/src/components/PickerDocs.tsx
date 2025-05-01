"use client"
import { useState } from "react";
import { ColorPicker } from "@siamf/react-color-pick";
import "@siamf/react-color-pick/dist/index.css"

const PickerDocs = () => {
    const [selectedColor, setColor] = useState<string>("#C11FB5");

    return (
        <div>
            <ColorPicker
                value={selectedColor}
                onChange={(e) => setColor(e)}
            />
        </div>
    );
};

export default PickerDocs;