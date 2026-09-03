import Image from 'next/image'
import React from 'react'

interface CImageProps {
  src: string
  caption: string
  height?: number
  width?: number
}

function CImage({ src, caption, width = 1200, height = 630 }: CImageProps) {
  return (
    <div className="mt-10">
      <Image
        loading="lazy"
        alt={caption}
        src={src}
        width={width}
        height={height}
        sizes="100vw"
        className="w-full h-auto"
        style={{ width: '100%', height: 'auto' }}
      />
      <figcaption className="-mt-4 text-center font-mono text-xs text-muted">{caption}</figcaption>
    </div>
  )
}

export default CImage
