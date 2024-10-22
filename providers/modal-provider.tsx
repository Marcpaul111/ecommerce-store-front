"use client"

import ModalProductPreview from "@/components/ModalProductPreview"
import { useEffect, useState } from "react"

const ModalProvider = () => {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  
  return (
    <>
        <ModalProductPreview />
    </>
  )
}

export default ModalProvider