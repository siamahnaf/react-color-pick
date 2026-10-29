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
        <div className={`rcp-root rcp:w-full rcp:max-w-xs ${className}`}>
            <div
                ref={gradientRef}
                className={`rcp:relative rcp:w-full rcp:h-[140px] rcp:rounded-lg rcp:cursor-crosshair rcp:mb-2 ${selectorClassName}`}
                style={{
                    background: `linear-gradient(to bottom, rgba(0,0,0,0), #000), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`,
                }}
                onMouseDown={handleGradientMouseDown}
                onTouchStart={handleGradientMouseDown}
            >
                <div
                    ref={gradientDotRef}
                    className={`rcp:absolute rcp:w-4 rcp:h-4 rcp:rounded-full rcp:border-[4px] rcp:border-white rcp:transform rcp:-translate-x-1/2 rcp:-translate-y-1/2 rcp:pointer-events-none rcp:shadow-[0_0_0_1px_rgba(0,0,0,0.02)] ${selectorDotClassName}`}
                    style={{
                        left: position.x,
                        top: position.y,
                    }}
                />
            </div>
            <div
                ref={sliderRef}
                className={`rcp:relative rcp:w-full rcp:h-[14px] rcp:rounded-lg rcp:cursor-pointer rcp:mb-2 ${hueClassName}`}
                style={{
                    background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
                }}
                onMouseDown={handleSliderMouseDown}
                onTouchStart={handleSliderMouseDown}
            >
                <div
                    className={`rcp:absolute rcp:w-[11px] rcp:h-[11px] rcp:rounded-full rcp:bg-white rcp:border rcp:border-gray-300 rcp:transform rcp:-translate-x-1/2 rcp:-translate-y-1/2 rcp:pointer-events-none rcp:top-1/2 rcp:shadow-[0_0_0_1px_rgba(0,0,0,0.01),0_2px_4px_rgba(0,0,0,0.02)] ${hueSliderClassName}`}
                    style={{
                        left: `${(hue / 360) * 100}%`,
                    }}
                />
            </div>
            <div className="rcp:flex rcp:gap-2">
                <div className="rcp:relative rcp:flex-1">
                    <div
                        className={`rcp:absolute rcp:left-3 rcp:top-1/2 rcp:transform rcp:-translate-y-1/2 rcp:w-6 rcp:h-6 rcp:rounded-full rcp:flex-shrink-0 rcp:border rcp:border-solid rcp:border-gray-200 ${colorPreviewClassName}`}
                        style={{ backgroundColor: isValidColor ? color : "#CCCCCC" }}
                    />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleHexChange}
                        onBlur={handleInputBlur}
                        className={`rcp:w-full rcp:pl-12 rcp:bg-white rcp:pr-10 rcp:py-2 rcp:border ${isValidColor ? "rcp:border-gray-300" : "rcp:border-red-500"
                            } rcp:rounded-lg rcp:focus:outline-none rcp:hover:border-gray-400 ${isValidColor ? "rcp:focus:border-purple-500" : "rcp:focus:border-red-500"
                            } ${colorInputClassName}`}
                        placeholder="#RRGGBB"
                        maxLength={7}
                    />
                </div>
                <button
                    className={`rcp:border rcp:border-solid rcp:bg-white rcp:border-gray-300 rcp:px-[9px] rcp:rounded-lg ${eyeDropperSupported
                        ? "rcp:text-gray-500 rcp:hover:text-gray-700 rcp:cursor-pointer"
                        : "rcp:text-gray-300 rcp:cursor-not-allowed"
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
