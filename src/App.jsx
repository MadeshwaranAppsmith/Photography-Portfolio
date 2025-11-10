import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Smooth scroll setup
    document.body.style.overflow = 'auto'
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="app">
      <CustomCursor />
      <Navbar />
      <Landing />
      <Gallery />
      <About />
      <Contact />
    </div>
  )
}

export default App

