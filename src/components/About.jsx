import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const About = () => {
  const textRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const text = textRef.current
    const container = containerRef.current

    if (text && container) {
      // Animate text on scroll
      gsap.fromTo(
        text.querySelectorAll('p'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: container,
            start: 'top 70%',
            end: 'top 40%',
            scrub: true,
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-white py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-light mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          About
        </motion.h2>
        <div ref={textRef} className="space-y-6">
          <motion.p
            className="text-lg md:text-xl font-light leading-relaxed text-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            I am a photographer passionate about capturing the beauty of the world around us.
            Through my lens, I seek to tell stories, evoke emotions, and preserve moments that
            might otherwise be forgotten.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl font-light leading-relaxed text-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            My work spans landscapes, portraits, and documentary photography, always with a focus
            on authenticity and the interplay between light and shadow. Each image is a carefully
            composed narrative, inviting viewers to pause and reflect.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl font-light leading-relaxed text-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Based in [Your Location], I am available for commissions, collaborations, and
            exhibitions worldwide.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default About

