import manifest from '@/assets/data/media-manifest.json'
import { MediaCard } from '@/components/blocks/home/media-card'

/** The playable film behind an image: either named by id, or the film whose poster this image is. */
export const findFilm = ({ image, video }: { image?: string; video?: string }) =>
  manifest.find(asset => asset.kind === 'video' && (asset.id === video || (image && asset.poster === image)))

/**
 * Feature media for service and project pages. A film still always becomes the playable film, so nothing on
 * the site looks like a video that can't play; anything else renders as a framed photo with no letterbox.
 */
const MediaFeature = ({ image, video, alt }: { image?: string; video?: string; alt: string }) => {
  const film = findFilm({ image, video })

  if (film) {
    return (
      <div className='mx-auto w-full max-w-[18rem] sm:max-w-xs'>
        <MediaCard asset={{ ...film, kind: 'video' }} />
      </div>
    )
  }

  if (!image) return null

  return (
    <img
      src={image}
      alt={manifest.find(asset => asset.src === image)?.alt ?? alt}
      loading='lazy'
      className='img-outline mx-auto max-h-120 w-auto max-w-full rounded-2xl object-cover'
    />
  )
}

export default MediaFeature
