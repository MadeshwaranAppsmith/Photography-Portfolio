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
            We believe every wedding is a beautifully chaotic masterpiece—where aunties critique your camera angles,
            uncles photobomb your perfectly framed shots, and someone inevitably asks if you got that one moment
            (you didn't, because they didn't tell you it was happening).
          </motion.p>
          <motion.p
            className="text-lg md:text-xl font-light leading-relaxed text-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            But here's the thing—somewhere between dodging flying flower petals, navigating through
            200 relatives who suddenly became photography directors, and trying not to cry during the
            vidaai (okay, we always cry), we capture magic. Real, raw, tear-jerking, laugh-till-you-snort magic.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl font-light leading-relaxed text-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We're not just photographers—we're professional tear-duct activators, stealth mode ninjas
            (you won't even know we're there), and certified experts at making awkward couples look like
            they actually enjoy taking photos together. Your love story deserves to be told with all its
            messy, beautiful, wonderfully imperfect glory.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl font-light leading-relaxed text-gray-600 italic"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            P.S. Yes, we'll make sure your mehendi looks Instagram-worthy. No, we can't Photoshop out
            your suspicious relative from every photo. We tried. They have superpowers.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default About

