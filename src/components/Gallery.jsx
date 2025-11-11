import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { photos as fallbackPhotos } from '../data/photos'
import { getInstagramMedia, getStoredAccessToken } from '../services/instagram'

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [photos, setPhotos] = useState(fallbackPhotos)
  const sectionsRef = useRef([])

  // Fetch Instagram photos on mount
  useEffect(() => {
    const loadInstagramPhotos = async () => {
      try {
        const token = getStoredAccessToken()
        if (token) {
          const instagramPhotos = await getInstagramMedia(token, 20)

          // Detect image orientation by loading images
          const photosWithOrientation = await Promise.all(
            instagramPhotos.map(async (photo) => {
              return new Promise((resolve) => {
                const img = new Image()
                img.onload = () => {
                  resolve({
                    ...photo,
                    orientation: img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait',
                  })
                }
                img.onerror = () => {
                  resolve({ ...photo, orientation: 'landscape' })
                }
                img.src = photo.src
              })
            })
          )

          if (photosWithOrientation.length > 0) {
            setPhotos(photosWithOrientation)
          }
        }
      } catch (error) {
        console.error('Failed to load Instagram photos, using fallback:', error)
        setPhotos(fallbackPhotos)
      }
    }

    loadInstagramPhotos()
  }, [])

  useEffect(() => {
    const sections = sectionsRef.current

    sections.forEach((section, index) => {
      if (!section) return

      // Parallax effect on image
      gsap.to(section.querySelector('.gallery-image'), {
        scale: 1.1,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Caption animation removed - no titles in gallery

      // Background color transition on section
      if (index % 2 === 0) {
        gsap.to(section, {
          backgroundColor: '#fafafa',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: true,
          },
        })
      } else {
        gsap.to(section, {
          backgroundColor: '#ffffff',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: true,
          },
        })
      }
    })

    // Track current section
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const newIndex = Math.floor(scrollPosition / window.innerHeight)
      if (newIndex >= 0 && newIndex < photos.length && newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [currentIndex])

  // Group portrait photos in pairs
  const renderPhotos = () => {
    const result = []
    let i = 0

    while (i < photos.length) {
      const currentPhoto = photos[i]
      const nextPhoto = photos[i + 1]

      // Check if current and next photos are both portrait
      if (
        currentPhoto.orientation === 'portrait' &&
        nextPhoto &&
        nextPhoto.orientation === 'portrait'
      ) {
        // Render two portrait photos side by side
        result.push(
          <div
            key={`pair-${currentPhoto.id}-${nextPhoto.id}`}
            ref={(el) => (sectionsRef.current[i] = el)}
            className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${
              i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <div className="w-full h-full flex flex-col md:flex-row gap-4 p-4">
              {/* First portrait photo */}
              <div className="flex-1 relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 gallery-image"
                  initial={{ opacity: 0, scale: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    className="w-full h-full object-cover"
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={i < 2 ? 'high' : 'low'}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </motion.div>
              </div>

              {/* Second portrait photo */}
              <div className="flex-1 relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 gallery-image"
                  initial={{ opacity: 0, scale: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <img
                    src={nextPhoto.src}
                    alt={nextPhoto.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </motion.div>
              </div>
            </div>
          </div>
        )
        i += 2 // Skip both photos
      } else {
        // Render single photo (landscape or single portrait)
        result.push(
          <div
            key={currentPhoto.id}
            ref={(el) => (sectionsRef.current[i] = el)}
            className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${
              i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <motion.div
              className="absolute inset-0 gallery-image"
              initial={{ opacity: 0, scale: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                className="w-full h-full object-cover"
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={i < 2 ? 'high' : 'low'}
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          </div>
        )
        i += 1
      }
    }

    return result
  }

  return <section id="gallery" className="relative">{renderPhotos()}</section>
}

export default Gallery

