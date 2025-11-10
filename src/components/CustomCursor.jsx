import { useEffect, useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 })
  const hoveredElementRef = useRef(null)

  // Smooth spring animations for cursor position with different speeds
  const cursorX = useSpring(0, { stiffness: 800, damping: 35 })
  const cursorY = useSpring(0, { stiffness: 800, damping: 35 })
  const outerX = useSpring(0, { stiffness: 150, damping: 20 })
  const outerY = useSpring(0, { stiffness: 150, damping: 20 })

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

      // Magnetic attraction effect
      if (hoveredElementRef.current) {
        const rect = hoveredElementRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distanceX = centerX - e.clientX
        const distanceY = centerY - e.clientY
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

        // Pull cursor towards element center (max 15px)
        if (distance < 100) {
          const pull = Math.min(distance / 100, 1)
          setMagneticOffset({
            x: distanceX * pull * 0.3,
            y: distanceY * pull * 0.3,
          })
        } else {
          setMagneticOffset({ x: 0, y: 0 })
        }
      } else {
        setMagneticOffset({ x: 0, y: 0 })
      }
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
        hoveredElementRef.current = target.closest('a') || target.closest('button') || target
      } else {
        setIsHovering(false)
        hoveredElementRef.current = null
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
      hoveredElementRef.current = null
      setMagneticOffset({ x: 0, y: 0 })
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

  // Update spring values with magnetic offset
  useEffect(() => {
    cursorX.set(mousePosition.x + magneticOffset.x - 3.6)
    cursorY.set(mousePosition.y + magneticOffset.y - 3.6)
    outerX.set(mousePosition.x + magneticOffset.x - 12)
    outerY.set(mousePosition.y + magneticOffset.y - 12)
  }, [mousePosition, magneticOffset, cursorX, cursorY, outerX, outerY])

  // Hide cursor on mobile
  if (isMobile) {
    return null
  }

  return (
    <>
      {/* Inner dot with fast response */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          width: '7.2px',
          height: '7.2px',
          backgroundColor: '#000',
          boxShadow: '0 0 6px rgba(0,0,0,0.3)',
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{
          scale: {
            type: 'spring',
            stiffness: 400,
            damping: 25,
          },
        }}
      />

      {/* Outer ring with slower, fluid lag */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          x: outerX,
          y: outerY,
          width: '24px',
          height: '24px',
          border: '1.2px solid #000',
          backgroundColor: isHovering ? 'rgba(0,0,0,0.1)' : 'transparent',
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{
          scale: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
          },
        }}
      />

      {/* Glow effect on hover with elastic spring */}
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
            x: mousePosition.x + magneticOffset.x - 19.2,
            y: mousePosition.y + magneticOffset.y - 19.2,
            opacity: 1,
            scale: 1,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            type: 'spring',
            stiffness: 250,
            damping: 18,
          }}
        />
      )}
    </>
  )
}

export default CustomCursor

