import PhaseOne from "./components/PhaseOne"
import PhaseTwo from "./components/PhaseTwo"

export default function Page() {
  return (
    <div className="flex min-h-svh justify-center p-6">
      <div className="flex min-w-0 flex-col gap-4 text-sm leading-loose">
        <PhaseOne />
        <PhaseTwo />
      </div>
    </div>
  )
}
