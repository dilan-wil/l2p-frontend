"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function Header() {
  const NavData = [
    {href:'/',title:'home'},
    {href:'/personnal accounts',title:'personnal accounts'},
    {href:'/joint accounts',title:'joint accounts'},
    {href:'/account types',title:'account types'},
    {href:'/more options',title:'more options'},
  ]
  const pathname = usePathname();

  return (
    // <header className="bg-primar text-primary-foreground py-6 px-6 shadow-sm poppins-bol z-10 absolute w-full">
    //   <div className="flex w-full justify-between items-center">
    //     <h1 className="text-2xl font-bold">L2P Finance</h1>
    //     <div className="flex gap-3 items-center">
    //       {NavData.map((nav) => {
    //         const isActive = pathname === nav.href
    //         return(
    //         <Link
    //           key={nav.href}
    //           href={nav.href}
    //           className={isActive ? "text-blue-400 underline-offset-2 font-bold capitalize font-sans":"capitalize font-bold font-sans text-gray-100 hover:text-blue-500/60 duration-500"}
    //         >
    //           {nav.title}
    //         </Link>
    //       )
    //     })}
    //     <div className="flex *:w-20 gap-3 *:cursor-pointer *:duration-500 *:text-shadow-2xl">
    //       <Button className="text-blue-500 hover:text-white bg-transparent hover:bg-blue-500">Log in</Button>
    //       <Button className="bg-blue-500 hover:bg-transparent hover:text-blue-500">Sign up</Button>
    //     </div>
    //     </div>
    //   </div>
    // </header>
  )
}
