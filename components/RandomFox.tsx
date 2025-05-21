import Image, { type ImageProps } from 'next/image';
import { useRef, useEffect, useState } from 'react';
import type { JSX } from 'react';

type LazyImageProps = {
    src: string;
    alt: string;
};

type Props = LazyImageProps & Omit<ImageProps, 'src' | 'alt'>;

export const LazyImage = ({
    src,
    alt,
    ...imgProps
}: Props): JSX.Element => {

    const node = useRef<HTMLImageElement>(null);
    
    const [currentSrc, setCurrentSrc] = useState(
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
    );

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setCurrentSrc(src);
                }
            });
        });

        if (node.current) {
            observer.observe(node.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [src]);

    return (
        <div className="rounded overflow-hidden relative">
            <Image
                ref={node}
                src={currentSrc}
                alt={alt}
                {...imgProps}
            />
        </div>
    );
};