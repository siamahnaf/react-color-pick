import { useState, useRef, useEffect, type ChangeEvent } from "react"
import EyeDropIcon from "./EyeDropIcon"

interface ColorPickerProps {
    value?: string
    onChange?: (color: string) => void
    className?: string
    selectorClassName?: string
    selectorDotClassName?: string
    hueClassName?: string
    hueSliderClassName?: string
    colorPreviewClassName?: string
    colorInputClassName?: string
    eyeDropClassName?: string
}

const ColorPicker = ({
    value,
    onChange,
    className = "",
    selectorClassName = "",
    selectorDotClassName = "",
    hueClassName = "",
    hueSliderClassName = "",
    colorPreviewClassName = "",
    colorInputClassName = "",
    eyeDropClassName = "",
}: ColorPickerProps) => {
    const initialColor = /^#[0-9A-Fa-f]{6}$/.test(value || "") ? value! : "#FFFFFF"
    const { h } = hexToHsv(initialColor)

    const [color, setColor] = useState(initialColor)
    const [inputValue, setInputValue] = useState(initialColor)
    const [hue, setHue] = useState(h)
    const [isDragging, setIsDragging] = useState(false)
    const [isSliderDragging, setIsSliderDragging] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [eyeDropperSupported, setEyeDropperSupported] = useState(false)
    const [isValidColor, setIsValidColor] = useState(true)
    const [didMount, setDidMount] = useState(false)

    const gradientRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)
    const gradientDotRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setEyeDropperSupported(typeof window !== "undefined" && "EyeDropper" in window)
    }, [])

    useEffect(() => {
        if (!didMount) return
        if (value && value !== color && /^#[0-9A-Fa-f]{6}$/.test(value)) {
            setColor(value)
            setInputValue(value)
            const { h } = hexToHsv(value)
            setHue(h)
        }
    }, [value])

    useEffect(() => {
        if (value && !didMount) {
            const { s, v } = hexToHsv(value)
            if (gradientRef.current) {
                const width = gradientRef.current.clientWidth
                const height = gradientRef.current.clientHeight
                setPosition({ x: s * width, y: (1 - v) * height })
            }
        }
    }, [value])

    useEffect(() => {
        if (!didMount) {
            setDidMount(true)
            return
        }

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
    }, [position, hue])

    const handleGradientMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault()
        setIsDragging(true)
        const { x, y } = getEventCoordinates(e, gradientRef.current!)
        setPosition({ x, y })
    }

    const handleSliderMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault()
        setIsSliderDragging(true)
        if (sliderRef.current) {
            const { x } = getEventCoordinates(e, sliderRef.current)
            const width = sliderRef.current.clientWidth
            setHue(Math.max(0, Math.min(360, (x / width) * 360)))
        }
    }

    const handleEyeDropperClick = async () => {
        if (!eyeDropperSupported) return
        try {
            // @ts-ignore
            const eyeDropper = new window.EyeDropper()
            const result = await eyeDropper.open()
            const newColor = result.sRGBHex.toUpperCase()
            setColor(newColor)
            setInputValue(newColor)
            setIsValidColor(true)
            const { h, s, v } = hexToHsv(newColor)
            setHue(h)
            if (gradientRef.current) {
                const width = gradientRef.current.clientWidth
                const height = gradientRef.current.clientHeight
                setPosition({ x: s * width, y: (1 - v) * height })
            }
            onChange?.(newColor)
        } catch { }
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging && gradientRef.current) {
                const { x, y } = getEventCoordinates(e, gradientRef.current)
                setPosition({
                    x: Math.max(0, Math.min(gradientRef.current.clientWidth, x)),
                    y: Math.max(0, Math.min(gradientRef.current.clientHeight, y)),
                })
            }
            if (isSliderDragging && sliderRef.current) {
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

    const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        setInputValue(val)
        val = val.replace(/[^0-9A-Fa-f#]/g, "")
        if (!val.startsWith("#")) val = "#" + val
        if (val.length > 7) val = val.slice(0, 7)
        const isValid = /^#[0-9A-Fa-f]{6}$/.test(val)
        setIsValidColor(isValid)
        if (isValid) {
            const upper = val.toUpperCase()
            setColor(upper)
            setInputValue(upper)
            const { h, s, v } = hexToHsv(upper)
            setHue(h)
            if (gradientRef.current) {
                const width = gradientRef.current.clientWidth
                const height = gradientRef.current.clientHeight
                setPosition({ x: s * width, y: (1 - v) * height })
            }
            onChange?.(upper)
        }
    }

    const handleInputBlur = () => {
        if (!isValidColor) {
            setInputValue(color)
            setIsValidColor(true)
        } else if (inputValue.length < 7 || !inputValue.startsWith("#")) {
            let val = inputValue
            if (!val.startsWith("#")) val = "#" + val
            while (val.length < 7) val += "0"
            val = val.toUpperCase()
            setInputValue(val)
            setColor(val)
            onChange?.(val)
        }
    }

    return (
        <div className={`w-full max-w-xs ${className}`}>
            <div
                ref={gradientRef}
                className={`relative w-full h-[140px] rounded-lg cursor-crosshair mb-2 ${selectorClassName}`}
                style={{
                    background: `linear-gradient(to bottom, rgba(0,0,0,0), #000), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`,
                }}
                onMouseDown={handleGradientMouseDown}
                onTouchStart={handleGradientMouseDown}
            >
                <div
                    ref={gradientDotRef}
                    className={`absolute w-4 h-4 rounded-full border-[4px] border-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none shadow-[0_0_0_1px_rgba(0,0,0,0.02)] ${selectorDotClassName}`}
                    style={{
                        left: position.x,
                        top: position.y,
                    }}
                />
            </div>
            <div
                ref={sliderRef}
                className={`relative w-full h-[14px] rounded-lg cursor-pointer mb-2 ${hueClassName}`}
                style={{
                    background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
                }}
                onMouseDown={handleSliderMouseDown}
                onTouchStart={handleSliderMouseDown}
            >
                <div
                    className={`absolute w-[11px] h-[11px] rounded-full bg-white border border-gray-300 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 shadow-[0_0_0_1px_rgba(0,0,0,0.01),0_2px_4px_rgba(0,0,0,0.02)] ${hueSliderClassName}`}
                    style={{
                        left: `${(hue / 360) * 100}%`,
                    }}
                />
            </div>
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
                        className={`w-full pl-12 bg-white pr-10 py-2 border ${isValidColor ? "border-gray-300" : "border-red-500"
                            } rounded-lg focus:outline-none hover:border-gray-400 ${isValidColor ? "focus:border-purple-500" : "focus:border-red-500"
                            } ${colorInputClassName}`}
                        placeholder="#RRGGBB"
                        maxLength={7}
                    />
                </div>
                <button
                    className={`border border-solid bg-white border-gray-300 px-[9px] rounded-lg ${eyeDropperSupported
                        ? "text-gray-500 hover:text-gray-700 cursor-pointer"
                        : "text-gray-300 cursor-not-allowed"
                        } ${eyeDropClassName}`}
                    onClick={handleEyeDropperClick}
                    disabled={!eyeDropperSupported}
                    type="button"
                >
                    <EyeDropIcon />
                </button>
            </div>
        </div>
    )
}

export default ColorPicker

function hexToHsv(hex: string): { h: number; s: number; v: number } {
    hex = hex.replace(/^#/, "")
    const r = parseInt(hex.slice(0, 2), 16) / 255
    const g = parseInt(hex.slice(2, 4), 16) / 255
    const b = parseInt(hex.slice(4, 6), 16) / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min
    let h = 0
    const s = max === 0 ? 0 : delta / max
    const v = max
    if (delta !== 0) {
        if (max === r) h = ((g - b) / delta) % 6
        else if (max === g) h = (b - r) / delta + 2
        else h = (r - g) / delta + 4
        h *= 60
        if (h < 0) h += 360
    }
    return { h, s, v }
}

function hsvToHex(h: number, s: number, v: number): string {
    const c = v * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = v - c
    let [r, g, b] = [0, 0, 0]
    if (h < 60) [r, g, b] = [c, x, 0]
    else if (h < 120) [r, g, b] = [x, c, 0]
    else if (h < 180) [r, g, b] = [0, c, x]
    else if (h < 240) [r, g, b] = [0, x, c]
    else if (h < 300) [r, g, b] = [x, 0, c]
    else[r, g, b] = [c, 0, x]
    const toHex = (n: number) => (Math.round((n + m) * 255).toString(16).padStart(2, "0"))
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

function getEventCoordinates(
    event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent,
    element: HTMLElement,
): { x: number; y: number } {
    const rect = element.getBoundingClientRect()
    const clientX = "touches" in event ? event.touches[0].clientX : (event as any).clientX
    const clientY = "touches" in event ? event.touches[0].clientY : (event as any).clientY
    const x = clientX - rect.left
    const y = clientY - rect.top
    return {
        x: Math.max(0, Math.min(element.clientWidth, x)),
        y: Math.max(0, Math.min(element.clientHeight, y)),
    }
}
