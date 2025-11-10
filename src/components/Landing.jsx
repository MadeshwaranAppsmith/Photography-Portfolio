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
      gsap.to(title, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: title,
          start: 'top top',
          end: '+=300',
          scrub: true,
        },
      })

      gsap.to(subtitle, {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: subtitle,
          start: 'top top',
          end: '+=300',
          scrub: true,
        },
      })
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
      {/* Dark ocean background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&fit=crop"
          alt="Dark ocean background"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center px-6 md:px-12">
        <motion.h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4 text-white drop-shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Pixel Stories
        </motion.h1>
        <motion.p
          ref={subtitleRef}
          className="text-lg md:text-xl font-light tracking-wide text-white/90 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          Capturing the soul of the ocean, one wave at a time
        </motion.p>
      </div>
    </section>
  )
}

export default Landing

