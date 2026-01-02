"use client"
import { useEffect, RefObject } from "react";

interface Options {
    ids?: string[];
    classNames?: string[];
}

const useOutsideClick = (ref: RefObject<HTMLElement | null>, handler: () => void, options?: Options) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const target = event.target as HTMLElement;
            if (!ref.current) return;

            if (ref.current.contains(target)) {
                return;
            }

            if (options?.ids?.some(id => {
                const el = document.getElementById(id);
                return el?.contains(target);
            })) {
                return;
            }

            if (options?.classNames?.some(className => {
                return target.closest(`.${className}`);
            })) {
                return;
            }
            handler();
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, handler]);
};

export default useOutsideClick;