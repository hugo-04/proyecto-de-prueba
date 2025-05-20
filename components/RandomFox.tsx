import Image from 'next/image'
import { useRef, useEffect ,useState } from 'react'
import type { JSX } from 'react'

type Props = {
    image: string
    alt?: string
}

export const RandomFox = ({
    image,
    alt = 'Random fox',
}: Props): JSX.Element => {
    const node = useRef<HTMLImageElement>(null);
    const [Src, setSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");

    useEffect(() => {
        //nuevo observador
        const observador = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setSrc(image)
                }
            });
        });

        //observador node
        if (node.current) {
            observador.observe(node.current);
        }

        //desconectar
        return () => {
            observador.disconnect()
        }
    }, [image]);

    return (
        <div className="rounded overflow-hidden">
            <Image
                ref={node}
                src={Src}
                alt={alt}
                width={320}
                height={320}
                className="rounded bg-gray-300"
                priority
            />
        </div>
    );
}