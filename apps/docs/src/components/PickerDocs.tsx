"use client"
import { useState, useRef } from "react";
import { ColorPicker } from "@siamf/react-color-pick";
import "@siamf/react-color-pick/dist/index.css"

import useOutsideClick from "./useHook";

const PickerDocs = () => {
    const [selectedColor, setColor] = useState<string>("");

    const ref = useRef<HTMLDivElement>(null);


    useOutsideClick(ref, () => { console.log("Clicked") });


    return (
        <div className="p-8" ref={ref}>
            <ColorPicker
                value={selectedColor}
                onChange={(e) => setColor(e)}
            />
        </div>
    );
};

export default PickerDocs;