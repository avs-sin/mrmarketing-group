'use client'

// React Imports
import React, { useState, useEffect } from 'react'

// Third-party Imports
import { motion, AnimatePresence } from 'motion/react'

// Util Imports
import { cn } from '@/lib/utils'

const TextFlip = ({
  words = ['Culture.', 'Nightlife.', 'Restaurants.', 'Events.', 'Creators.'],
  duration = 3000
}: {
  words?: string[]
  duration?: number
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <motion.span
      layout
      className='bg-primary/10 border-primary relative inline-flex w-fit overflow-hidden rounded-full border px-5.5 py-0.5 backdrop-blur-md'
    >
      <AnimatePresence mode='popLayout'>
        <motion.span
          key={currentIndex}
          initial={{ y: -40, filter: 'blur(10px)' }}
          animate={{
            y: 0,
            filter: 'blur(0px)'
          }}
          exit={{ y: 50, filter: 'blur(10px)', opacity: 0 }}
          transition={{
            duration: 0.5
          }}
          className={cn('inline-block whitespace-nowrap')}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}

export default TextFlip
