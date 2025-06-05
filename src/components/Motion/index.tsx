'use client'
import React from 'react'
import {motion} from 'motion/react'

export const Motion = ({children, index, className}: {children: React.ReactNode, index: number, className?: string}) => {


  return <motion.div className={className} transition={ {delay: index/20, type: 'spring' }} animate={{translateY: 0, opacity: 1}} initial={{translateY: 10, opacity: 0}}>
    {children}
  </motion.div>
}