import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Landing = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const title = titleRef.current
    const subtitle = subtitleRef.current

    if (title && subtitle) {
      // Animate title on scroll with proper reset
      gsap.fromTo(title,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: title,
            start: 'top top',
            end: '+=300',
            scrub: true,
            toggleActions: 'play reverse play reverse',
          },
        }
      )

      // Animate subtitle on scroll with proper reset
      gsap.fromTo(subtitle,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -30,
          scrollTrigger: {
            trigger: subtitle,
            start: 'top top',
            end: '+=300',
            scrub: true,
            toggleActions: 'play reverse play reverse',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === title || trigger.vars.trigger === subtitle) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Light minimal wedding background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80"
          alt="Wedding preparation background"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <div className="relative z-10 text-center px-6 md:px-12">
        <motion.h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4 text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Pixel Stories
        </motion.h1>
        <motion.p
          ref={subtitleRef}
          className="text-lg md:text-xl font-light tracking-wide text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          Capturing timeless moments of love and celebration
        </motion.p>
      </div>
    </section>
  )
}

export default Landing

