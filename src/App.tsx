import clsx from "clsx"
import Header from "@/components/Header"
import { useStore } from "@/stores"
import { useRef } from "react"
import { preload } from "react-dom"

const TechItem = ({ tech }: { tech: string }) => {
  // preload resources https://react.dev/blog/2024/12/05/react-19#support-for-preloading-resources
  preload(
    "https://wxa.wxs.qq.com/wxad-design/fonts/gilroy-semibold-webfont.ttf",
    { as: "font" }
  )
  return (
    <div className="flex items-center px-8 h-28 bg-gray-100 rounded-6 font-[gilroysemibold]">
      {tech}
    </div>
  )
}

function App() {
  const techs = useStore((s) => s.techs)
  const headerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={clsx(
        "min-h-screen",
        "bg-gray-100",
        "border-x border-solid border-gray-200"
      )}
    >
      {/* ref as prop https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop */}
      <Header ref={headerRef} />
      <div className="px-24 pb-32">
        {Object.entries(techs).map(([key, value]) => (
          <div key={key} className="mt-32">
            <div className="mb-12 text-base font-bold">{key}</div>
            <div className="p-20 bg-white rounded-8">
              <div className="grid grid-cols-2 gap-y-12">
                {Object.entries(value).map(([k, val]) => (
                  <div key={k}>
                    <div className="mb-4 text-sm font-medium">{k}</div>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-800">
                      {val.map((tech) => (
                        <TechItem key={tech} tech={tech} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
