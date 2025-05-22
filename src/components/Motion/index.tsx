'use client'
import React from 'react'
import {motion} from 'motion/react'

export const Motion = ({children, index}: {children: React.ReactNode, index: number}) => {


  return <motion.div transition={ {delay: index/20, type: 'spring' }} animate={{translateY: 0, opacity: 1}} initial={{translateY: 10, opacity: 0}}>
    {children}
  </motion.div>
}