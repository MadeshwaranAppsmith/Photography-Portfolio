import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EnvelopeSimple, InstagramLogo, TwitterLogo, LinkedinLogo } from 'phosphor-react'

const socialLinks = [
  { name: 'Email', url: 'mailto:your.email@example.com', Icon: EnvelopeSimple },
  { name: 'Instagram', url: 'https://instagram.com', Icon: InstagramLogo },
  { name: 'Twitter', url: 'https://twitter.com', Icon: TwitterLogo },
  { name: 'LinkedIn', url: 'https://linkedin.com', Icon: LinkedinLogo },
]

const Contact = () => {
  const containerRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const links = linksRef.current

    if (container && links) {
      // Animate links on scroll
      gsap.fromTo(
        links.querySelectorAll('a'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
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
      id="contact"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-white py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-light mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          Get in Touch
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl font-light text-gray-700 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          For inquiries, collaborations, or just to say hello, feel free to reach out.
        </motion.p>

        <div
          ref={linksRef}
          className="flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {socialLinks.map((link, index) => {
            const { Icon } = link
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 text-gray-700 hover:text-black transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Icon size={48} weight="light" className="md:w-14 md:h-14" />
                <span className="text-sm md:text-base font-light tracking-wide">
                  {link.name}
                </span>
              </motion.a>
            )
          })}
        </div>

        <motion.div
          className="mt-16 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-sm font-light text-gray-500">
            © {new Date().getFullYear()} Pixel Stories. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

