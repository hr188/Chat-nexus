import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
           <UserButton afterSignOutUrl="/" />
           <hr/>
           <ModeToggle />
        </div>
    </>
  )
}
