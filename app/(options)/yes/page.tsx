"use client"
import { motion } from "framer-motion"

const VideoBackground = () => {
  return (
    <div
      style={{ position: "fixed", width: "100%", height: "100%", overflow: "hidden", zIndex: -1 }}
    >
      <video autoPlay muted loop style={{ objectFit: "cover", width: "100%", height: "100%" }}>
        <source src="/cat.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
export default function Yes() {
  return (
    <div className="w-full h-screen relative">
      <VideoBackground />
      <AnimatedText />
    </div>
  )
}

const AnimatedText = () => {
  const arrThank = "THANK".split("")
  const arrYou = "YOU".split("")
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "inertia",
        damping: 14,
        stiffness: 100,
      },
    },
  }
  return (
    <>
      <motion.div
        className="overflow-hidden flex text-[18%] font-bold text-custom-text absolute right-[2%] bottom-[25%] sm:right-[6%] sm:top-[20%] md:top-[20%] md:right-[15%] md:text-[20%]"
        style={{ overflow: "hidden", display: "flex", fontSize: "2rem" }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {arrThank.map((letter, index) => (
          <motion.span variants={child} style={{ fontSize: "4rem" }} key={index}>
            {letter}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        className="overflow-hidden flex text-[18%] font-bold text-custom-text absolute right-[3%] bottom-[16%] sm:right-[5%] sm:top-[30%] md:top-[28%] md:right-[15%] md:text-[20%]"
        style={{ overflow: "hidden", display: "flex", fontSize: "2rem" }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {arrYou.map((letter, index) => (
          <motion.span variants={child} style={{ fontSize: "4rem" }} key={index}>
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </>
  )
}
