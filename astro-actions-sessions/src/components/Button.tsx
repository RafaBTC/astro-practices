import { actions } from "astro:actions"

export default function Button() {
  const handleAction = async () => {
    const {  } = await actions.auth.login()
  }
  return (
    <button>
      Get Greeting
    </button>
  )
}
