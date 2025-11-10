import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'phosphor-react'
import { photos } from '../data/photos'

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionsRef = useRef([])

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

      // Fade in caption
      gsap.fromTo(
        section.querySelector('.gallery-caption'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      )

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
                <motion.div
                  className="relative z-10 absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center px-4 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h3 className="text-xl md:text-3xl font-light text-white mb-2 drop-shadow-lg">
                    {currentPhoto.title}
                  </h3>
                  <p className="text-xs md:text-sm font-light text-white/90 drop-shadow-md gallery-caption">
                    {currentPhoto.caption}
                  </p>
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
                <motion.div
                  className="relative z-10 absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center px-4 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h3 className="text-xl md:text-3xl font-light text-white mb-2 drop-shadow-lg">
                    {nextPhoto.title}
                  </h3>
                  <p className="text-xs md:text-sm font-light text-white/90 drop-shadow-md gallery-caption">
                    {nextPhoto.caption}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Scroll indicator */}
            {i < photos.length - 2 && (
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={24} weight="light" className="text-white/70" />
              </motion.div>
            )}
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

            <motion.div
              className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-4 drop-shadow-lg">
                {currentPhoto.title}
              </h2>
              <p className="text-sm md:text-base font-light text-white/90 drop-shadow-md gallery-caption">
                {currentPhoto.caption}
              </p>
            </motion.div>

            {/* Scroll indicator */}
            {i < photos.length - 1 && (
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={24} weight="light" className="text-white/70" />
              </motion.div>
            )}
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

