import indexActorServiceInstance from 'services/indexService'
import FeedCoverImg from 'assets/img/feed-cover.png'

export const toFixed = (num: string, fixed: number) => {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
  const matches = num?.match(re)

  if (!matches) {
    return ''
  }

  return matches && typeof matches?.[0] === 'string'
    ? parseFloat(matches[0]).toFixed(fixed)
    : ''
}

const videoPatterns = {
  youtube: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,
  vimeo:
    /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/,
}

export function getVideoEmbedUrl(url: string): string {
  const youtubeMatch = url.match(videoPatterns.youtube)
  if (youtubeMatch && youtubeMatch[2].length === 11) {
    return `https://www.youtube.com/embed/${youtubeMatch[2]}`
  }

  const vimeoMatch = url.match(videoPatterns.vimeo)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  return url
}

export function isVideoUrl(url: string): boolean {
  return videoPatterns.youtube.test(url) || videoPatterns.vimeo.test(url)
}

/**
 * Constructs the full URL for an event's cover photo.
 * @param coverPhotoId The fileId of the cover photo stored in the Event canister.
 * @returns The full, usable URL for the image.
 */
export const getEventCoverImageUrl = (coverPhotoId: string): string => {
  if (!coverPhotoId || !indexActorServiceInstance.indexCanisterId) {
    return FeedCoverImg // Return a default image if IDs are missing
  }
  return `https://${indexActorServiceInstance.indexCanisterId}.raw.icp0.io/d3?file_id=${coverPhotoId}`
}