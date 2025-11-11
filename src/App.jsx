import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import InstagramAuth from './components/InstagramAuth'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  useEffect(() => {
    // Smooth scroll setup
    document.body.style.overflow = 'auto'

    // Check if URL is /admin/instagram
    const isAdminRoute = window.location.pathname === '/admin/instagram' ||
                         window.location.search.includes('code=')
    setShowAdminPanel(isAdminRoute)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Show admin panel if accessing /admin/instagram
  if (showAdminPanel) {
    return <InstagramAuth onAuthComplete={() => {
      // Redirect to home after auth
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    }} />
  }

  return (
    <div className="app">
      <Navbar />
      <Landing />
      <Gallery />
      <About />
      <Contact />
    </div>
  )
}

export default App

