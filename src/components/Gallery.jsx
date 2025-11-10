import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

  return (
    <section id="gallery" className="relative">
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          ref={(el) => (sectionsRef.current[index] = el)}
          className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
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
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index < 2 ? 'high' : 'low'}
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
              {photo.title}
            </h2>
            <p className="text-sm md:text-base font-light text-white/90 drop-shadow-md gallery-caption">
              {photo.caption}
            </p>
          </motion.div>

          {/* Scroll indicator */}
          {index < photos.length - 1 && (
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg
                className="w-6 h-6 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          )}
        </div>
      ))}
    </section>
  )
}

export default Gallery

