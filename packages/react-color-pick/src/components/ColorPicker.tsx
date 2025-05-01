import { useState, useRef, useEffect, type ChangeEvent } from "react";

//Icon
import EyeDropIcon from "./EyeDropIcon";

//Interface
interface ColorPickerProps {
    value?: string;
    onChange?: (color: string) => void;
    className?: string;
    selectorClassName?: string;
    selectorDotClassName?: string;
    hueClassName?: string;
    hueSliderClassName?: string;
    colorPreviewClassName?: string;
    colorInputClassName?: string;
    eyeDropClassName?: string;
}

const ColorPicker = ({ value = "#FFFFFF", onChange, className = "", selectorClassName = "", selectorDotClassName = "", hueClassName = "", hueSliderClassName = "", colorPreviewClassName = "", colorInputClassName = "", eyeDropClassName = "" }: ColorPickerProps) => {
    //Initial Load
    const { h } = hexToHsv(value)

    //State
    const [color, setColor] = useState("")
    const [inputValue, setInputValue] = useState(value)
    const [hue, setHue] = useState(h)
    const [isDragging, setIsDragging] = useState(false)
    const [isSliderDragging, setIsSliderDragging] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [eyeDropperSupported, setEyeDropperSupported] = useState(false)
    const [isValidColor, setIsValidColor] = useState(true)

    //Ref
    const gradientRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)
    const gradientDotRef = useRef<HTMLDivElement>(null)

    // Check if EyeDropper API is supported
    useEffect(() => {
        setEyeDropperSupported(typeof window !== "undefined" && "EyeDropper" in window)
    }, [])

    // Convert hex to HSV to get initial position
    useEffect(() => {
        if (value && value !== color) {
            setColor(value)
            setInputValue(value)
            const { h, s, v } = hexToHsv(value)
            setHue(h)

            if (gradientRef.current) {
                const width = gradientRef.current.clientWidth
                const height = gradientRef.current.clientHeight
                setPosition({
                    x: s * width,
                    y: (1 - v) * height,
                })
            }
        }
    }, [value])

    // Update color when position or hue changes
    useEffect(() => {
        if (gradientRef.current) {
            const width = gradientRef.current.clientWidth
            const height = gradientRef.current.clientHeight

            const s = Math.max(0, Math.min(1, position.x / width))
            const v = Math.max(0, Math.min(1, 1 - position.y / height))

            const newColor = hsvToHex(hue, s, v)
            setColor(newColor)
            setInputValue(newColor)
            setIsValidColor(true)
            onChange?.(newColor)
        }
    }, [position, hue, onChange])

    // Handle gradient mouse/touch events
    const handleGradientMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault() // Prevent default to avoid text selection
        setIsDragging(true)
        const { x, y } = getEventCoordinates(e, gradientRef.current!)
        setPosition({ x, y })
    }

    // Handle slider mouse/touch events
    const handleSliderMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault() // Prevent default to avoid text selection
        setIsSliderDragging(true)
        if (sliderRef.current) {
            const { x } = getEventCoordinates(e, sliderRef.current)
            const width = sliderRef.current.clientWidth
            setHue(Math.max(0, Math.min(360, (x / width) * 360)))
        }
    }

    // Handle eyedropper click
    const handleEyeDropperClick = async () => {
        if (!eyeDropperSupported) {
            alert("Your browser doesn't support the EyeDropper API")
            return
        }

        try {
            // @ts-ignore - TypeScript doesn't know about EyeDropper API yet
            const eyeDropper = new window.EyeDropper()
            const result = await eyeDropper.open()
            const newColor = result.sRGBHex.toUpperCase()
            setColor(newColor)
            setInputValue(newColor)
            setIsValidColor(true)

            // Update hue and position based on the new color
            const { h, s, v } = hexToHsv(newColor)
            setHue(h)

            if (gradientRef.current) {
                const width = gradientRef.current.clientWidth
                const height = gradientRef.current.clientHeight
                setPosition({
                    x: s * width,
                    y: (1 - v) * height,
                })
            }

            onChange?.(newColor)
        } catch (e) {
            // User canceled the eyedropper
            console.log("EyeDropper was canceled")
        }
    }

    // Handle document-wide mouse/touch events for dragging
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging && gradientRef.current) {
                e.preventDefault() // Prevent default behaviors
                const { x, y } = getEventCoordinates(e, gradientRef.current)
                setPosition({
                    x: Math.max(0, Math.min(gradientRef.current.clientWidth, x)),
                    y: Math.max(0, Math.min(gradientRef.current.clientHeight, y)),
                })
            }

            // Handle slider dragging
            if (isSliderDragging && sliderRef.current) {
                e.preventDefault()
                const { x } = getEventCoordinates(e, sliderRef.current)
                const width = sliderRef.current.clientWidth
                setHue(Math.max(0, Math.min(360, (x / width) * 360)))
            }
        }

        const handleMouseUp = () => {
            setIsDragging(false)
            setIsSliderDragging(false)
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("touchmove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
        document.addEventListener("touchend", handleMouseUp)

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("touchmove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
            document.removeEventListener("touchend", handleMouseUp)
        }
    }, [isDragging, isSliderDragging])

    // Handle hex input change
    const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value

        // Always update the input value to show what the user is typing
        setInputValue(value)

        // Format the input value
        // Remove non-hex characters and ensure it starts with #
        value = value.replace(/[^0-9A-Fa-f#]/g, "")

        // If the # is not at the beginning, add it
        if (!value.startsWith("#")) {
            value = "#" + value
        }

        // Limit to 7 characters (#RRGGBB)
        if (value.length > 7) {
            value = value.slice(0, 7)
        }

        // Check if it's a valid hex color
        const isValid = /^#[0-9A-Fa-f]{6}$/.test(value)
        setIsValidColor(isValid)

        // Only update the color if it's valid
        if (isValid) {
            const upperCaseValue = value.toUpperCase()
            setColor(upperCaseValue)
            setInputValue(upperCaseValue)

            const { h, s, v } = hexToHsv(upperCaseValue)
            setHue(h)

            if (gradientRef.current) {
                const width = gradientRef.current.clientWidth
                const height = gradientRef.current.clientHeight
                setPosition({
                    x: s * width,
                    y: (1 - v) * height,
                })
            }

            onChange?.(upperCaseValue)
        }
    }

    // Handle input blur - format the input when user leaves the field
    const handleInputBlur = () => {
        // If the input is invalid, reset to the last valid color
        if (!isValidColor) {
            setInputValue(color)
            setIsValidColor(true)
        }
        // If it's valid but missing the # or not 7 chars, format it
        else if (inputValue.length < 7 || !inputValue.startsWith("#")) {
            let formattedValue = inputValue

            if (!formattedValue.startsWith("#")) {
                formattedValue = "#" + formattedValue
            }

            // Pad with zeros if needed
            while (formattedValue.length < 7) {
                formattedValue += "0"
            }

            formattedValue = formattedValue.toUpperCase()
            setInputValue(formattedValue)
            setColor(formattedValue)
            onChange?.(formattedValue)
        }
    }

    return (
        <div className={`w-full max-w-xs ${className}`}>
            {/* Main color gradient */}
            <div
                ref={gradientRef}
                className={`relative w-full h-[140px] rounded-lg cursor-crosshair mb-2 ${selectorClassName}`}
                style={{
                    background: `linear-gradient(to bottom, rgba(0,0,0,0), #000), 
                      linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`,
                }}
                onMouseDown={handleGradientMouseDown}
                onTouchStart={handleGradientMouseDown}
            >
                {/* Selector dot */}
                <div
                    ref={gradientDotRef}
                    className={`absolute w-4 h-4 rounded-full border-[4px] border-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none shadow-[0_0_0_1px_rgba(0,0,0,0.02)] ${selectorDotClassName}`}
                    style={{
                        left: position.x,
                        top: position.y,
                    }}
                />
            </div>

            {/* Hue slider */}
            <div
                ref={sliderRef}
                className={`relative w-full h-[14px] rounded-lg cursor-pointer mb-2 ${hueClassName}`}
                style={{
                    background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
                }}
                onMouseDown={handleSliderMouseDown}
                onTouchStart={handleSliderMouseDown}
            >
                {/* Slider thumb */}
                <div
                    className={`absolute w-[11px] h-[11px] rounded-full bg-white border border-gray-300 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 shadow-[0_0_0_1px_rgba(0,0,0,0.01),0_2px_4px_rgba(0,0,0,0.02)] ${hueSliderClassName}`}
                    style={{
                        left: `${(hue / 360) * 100}%`
                    }}
                />
            </div>

            {/* Color input */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full flex-shrink-0 border border-solid border-gray-200 ${colorPreviewClassName}`}
                        style={{ backgroundColor: isValidColor ? color : "#CCCCCC" }}
                    />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleHexChange}
                        onBlur={handleInputBlur}
                        className={`w-full pl-12 pr-10 py-2 border ${isValidColor ? "border-gray-300" : "border-red-500"
                            } rounded-lg focus:outline-none hover:border-gray-400 ${isValidColor ? "focus:border-purple-500" : "focus:border-red-500"
                            } ${colorInputClassName}`}
                        placeholder="#RRGGBB"
                        maxLength={7}
                    />
                </div>
                <button
                    className={`border border-solid border-gray-300 px-[9px] rounded-lg ${eyeDropperSupported
                        ? "text-gray-500 hover:text-gray-700 cursor-pointer"
                        : "text-gray-300 cursor-not-allowed"
                        } ${eyeDropClassName}`}
                    onClick={handleEyeDropperClick}
                    disabled={!eyeDropperSupported}
                    title={eyeDropperSupported ? "Pick color from screen" : "EyeDropper not supported in your browser"}
                    type="button"
                >
                    <EyeDropIcon />
                </button>
            </div>
        </div>
    )
}

export default ColorPicker;

// Helper functions for color conversions
function hexToHsv(hex: string): { h: number; s: number; v: number } {
    // Remove # if present
    hex = hex.replace(/^#/, "")

    // Parse the hex values
    const r = Number.parseInt(hex.substring(0, 2), 16) / 255
    const g = Number.parseInt(hex.substring(2, 4), 16) / 255
    const b = Number.parseInt(hex.substring(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min

    let h = 0
    const s = max === 0 ? 0 : delta / max
    const v = max

    if (delta === 0) {
        h = 0
    } else if (max === r) {
        h = ((g - b) / delta) % 6
    } else if (max === g) {
        h = (b - r) / delta + 2
    } else {
        h = (r - g) / delta + 4
    }

    h = Math.round(h * 60)
    if (h < 0) h += 360

    return { h, s, v }
}

function hsvToHex(h: number, s: number, v: number): string {
    h = Math.max(0, Math.min(360, h))
    s = Math.max(0, Math.min(1, s))
    v = Math.max(0, Math.min(1, v))

    const c = v * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = v - c

    let r = 0,
        g = 0,
        b = 0

    if (h >= 0 && h < 60) {
        r = c
        g = x
        b = 0
    } else if (h >= 60 && h < 120) {
        r = x
        g = c
        b = 0
    } else if (h >= 120 && h < 180) {
        r = 0
        g = c
        b = x
    } else if (h >= 180 && h < 240) {
        r = 0
        g = x
        b = c
    } else if (h >= 240 && h < 300) {
        r = x
        g = 0
        b = c
    } else {
        r = c
        g = 0
        b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    const toHex = (n: number) => {
        const hex = n.toString(16)
        return hex.length === 1 ? "0" + hex : hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

// Helper to get coordinates from mouse or touch events
function getEventCoordinates(
    event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent,
    element: HTMLElement,
): { x: number; y: number } {
    const rect = element.getBoundingClientRect()

    let clientX, clientY

    if ("touches" in event && event.touches.length > 0) {
        // Touch event
        clientX = event.touches[0].clientX
        clientY = event.touches[0].clientY
    } else if ("clientX" in event) {
        // Mouse event
        clientX = event.clientX
        clientY = event.clientY
    } else {
        return { x: 0, y: 0 } // Fallback
    }

    const x = clientX - rect.left
    const y = clientY - rect.top

    return {
        x: Math.max(0, Math.min(element.clientWidth, x)),
        y: Math.max(0, Math.min(element.clientHeight, y)),
    }
}
