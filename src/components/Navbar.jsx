import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { List, X } from 'phosphor-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a
          href="#"
          className="text-xl md:text-2xl font-light tracking-tight cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          whileHover={{ opacity: 0.7 }}
        >
          Pixel Stories
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          <motion.button
            onClick={() => scrollToSection('gallery')}
            className="text-sm font-light tracking-wide hover:opacity-70 transition-opacity"
            whileHover={{ y: -2 }}
          >
            Gallery
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('about')}
            className="text-sm font-light tracking-wide hover:opacity-70 transition-opacity"
            whileHover={{ y: -2 }}
          >
            About
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="text-sm font-light tracking-wide hover:opacity-70 transition-opacity"
            whileHover={{ y: -2 }}
          >
            Contact
          </motion.button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} weight="light" /> : <List size={28} weight="light" />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          className="md:hidden mt-4 flex flex-col gap-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <button
            onClick={() => scrollToSection('gallery')}
            className="text-left text-sm font-light py-2"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-left text-sm font-light py-2"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-left text-sm font-light py-2"
          >
            Contact
          </button>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar

