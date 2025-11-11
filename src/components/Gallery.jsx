import { motion } from 'framer-motion'
import { photos } from '../data/photos'

const Gallery = () => {

  return (
    <section id="gallery" className="relative py-12 md:py-20 px-4 md:px-8 bg-white">
      {/* Grid Container - Masonry style using CSS columns */}
      <div className="max-w-7xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="break-inside-avoid mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 group">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={index < 6 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={index < 6 ? 'high' : 'low'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery

