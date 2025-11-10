import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (isMobile) {
      return () => window.removeEventListener('resize', checkMobile)
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.tagName === 'IMG' ||
        target.closest('.gallery-image')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('resize', checkMobile)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isMobile])

  // Hide cursor on mobile
  if (isMobile) {
    return null
  }

  return (
    <>
      {/* Inner dot - 40% smaller */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          width: '7.2px',
          height: '7.2px',
          backgroundColor: '#000',
          boxShadow: '0 0 6px rgba(0,0,0,0.3)',
        }}
        animate={{
          x: mousePosition.x - 3.6,
          y: mousePosition.y - 3.6,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Outer ring - 40% smaller */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          width: '24px',
          height: '24px',
          border: '1.2px solid #000',
          backgroundColor: isHovering ? 'rgba(0,0,0,0.1)' : 'transparent',
        }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      />

      {/* Glow effect on hover - 40% smaller */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997]"
          style={{
            width: '38.4px',
            height: '38.4px',
            border: '0.6px solid rgba(0,0,0,0.2)',
            backgroundColor: 'rgba(0,0,0,0.05)',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            x: mousePosition.x - 19.2,
            y: mousePosition.y - 19.2,
            opacity: 1,
            scale: 1,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
        />
      )}
    </>
  )
}

export default CustomCursor

