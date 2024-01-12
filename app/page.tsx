"use client"
import { Dancing_Script } from "next/font/google"
import { useRouter } from "next/navigation"
import { motion, useAnimation } from "framer-motion"

import { CSSProperties, useEffect, useRef, useState } from "react"
import { RingLoader } from "react-spinners"
import CircleLoader from "react-spinners/CircleLoader"

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
}

const dancing_script = Dancing_Script({
  subsets: ["latin", "vietnamese", "latin-ext"],
  weight: "700",
})

export default function Home() {
  const [loading, setLoading] = useState(false)
  let [color, setColor] = useState("#10044f")
  const [numNoClicks, setNumNoClicks] = useState(0)
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })

  const noButtonRef = useRef<HTMLButtonElement>(null)

  const buttonControls = useAnimation()
  const spiralControls = useAnimation()
  const riverFlowControls = useAnimation() // Additional animation for river flow

  const buttonVariants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [0, -20, 20, -20, 20, 0], // Keyframes for the y-axis movement
      rotate: [0, -5, 5, -5, 5, 0], // Keyframes for rotation
    },
  }
  const sendNoClickNum = async () => {
    try {
      const email = process.env.NODEMAILER_EMAIL
      const message = `No clicked for ${numNoClicks}`
      const response = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({ email, message }),
      })
      const jsonData = await response.json()
    } catch (error) {
      console.log("No click error", error)
    }
  }
  useEffect(() => {
    // if (numNoClicks >= 3) sendNoClickNum()
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", updateViewportSize)
    updateViewportSize()

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateViewportSize)
    }
  }, [])

  const router = useRouter()

  const handleYes = async () => {
    try {
      setLoading(true)
      const email = process.env.NODEMAILER_EMAIL
      const message = "Congrats for the W"
      // const response = await fetch("/api/email", {
      //   method: "POST",
      //   body: JSON.stringify({ email, message }),
      // })
      // const jsonData = await response.json()
      router.push("/yes")
    } catch (error) {
      setLoading(false)
      console.log("Error occured while handling yes", error)
    } finally {
      setLoading(false)
    }
  }
  const handleNo = async () => {
    setNumNoClicks((prev) => prev + 1)
    if (!noButtonRef || !noButtonRef.current) return
    else {
      const buttonRect = noButtonRef.current.getBoundingClientRect()
      console.log(buttonRect)
      const maxX = viewportSize.width
      const maxY = viewportSize.height
      // Calculate random X and Y positions within the entire viewport
      const randomX = Math.random() * (maxX - buttonRect.x - buttonRect.width)
      const randomY = Math.random() * (maxY - buttonRect.y - buttonRect.height)
      // Animate the button to the new position
      await buttonControls.start({
        x: randomX,
        y: randomY,
        rotateX: [0, 360], // Rotate on the x-axis from 0 to 360 degrees
        transition: { duration: 0.5, ease: "easeInOut" },
      })
      // Animate the spiral effect
      await spiralControls.start({
        opacity: [0, 1], // Fade in
        scale: [0, 5], // Scale from 0 to 5
        transition: { duration: 0.8 },
      })
    }
  }

  return (
    <div className="flex items-center gap-8 px-8 flex-col justify-center h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-300 via-fuchsia-600 to-orange-600 ">
      <h1 className={` text-center text-5xl leading-none text-fuchsia-300 ${dancing_script.className}`}>
        {/* Would you be the JavaScript to my HTML and make a beautiful connection? Let&rsquo;s go on a date
        and create some sweet memories together! */}
        Would you like to go out with me today?
      </h1>
      <div className=" w-full justify-center flex gap-6">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          //animate={buttonControls}
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 10px 20px rgba(147, 198, 227, 0.2)", // Add a shadow on hover
            transition: { duration: 0.6 },
            rotate: [0, 300],
          }}
          whileTap={{ scale: 0.9 }}
          className="rounded-md px-4 py-2 bg-gradient-to-r from-red-400  to-blue-400 text-slate-300  text-2xl font-semibold"
          onClick={handleYes}
        >
          {!loading && <span>Yes</span>}
          <RingLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </motion.button>
        <div className="flex gap-4">
          <motion.button
            ref={noButtonRef}
            variants={buttonVariants}
            initial="initial"
            animate={buttonControls}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Add a shadow on hover
              transition: { duration: 0.6 },
              rotate: [0, 170],
            }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNo}
            className="rounded-md px-4 py-2 bg-gradient-to-r from-red-400  to-blue-400 text-slate-300 relative overflow-hidden text-2xl font-semibold "
          >
            No
          </motion.button>
        </div>
      </div>
    </div>
  )
}
