import { useEffect } from "react"
import Appbar from "../components/Appbar"
import Dashboard from "../components/Dashboard"

const Setting = () => {

  useEffect(() => {
    document.title = "Settings - MediClone"
  })
  return (
    <div className="flex flex-col min-h-screen">
      <Appbar/>
      <Dashboard/>
    </div>
  )
}

export default Setting