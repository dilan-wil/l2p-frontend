"use client"
import { useTranslations } from "@/lib/useTranslations";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Header() {
    const router = useRouter();

  // function changeLanguage(locale: string) {
  //   document.cookie = `NEXT_LOCALE=${locale}; path=/`;
  //   window.location.reload(); // Force reload so `request.ts` picks up the new cookie
  // }

  function changeLanguage(locale: string) {
    document.cookie = `NEXT_LOCALE=${locale}; path=/`;
    router.refresh(); // instead of window.location.reload()
  }
  const g = useTranslations()

  const nextLocale = g('common.currentLanguage') === 'EN' ? 'en' : 'fr';
  return (
    <header className="bg-primary text-primary-foreground py-6 px-6 shadow-sm">
      <div className="flex justify-between max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">L2P Finance</h1>
        <Button className="bg-white text-black cursor-pointer hover:bg-gray-600" onClick={() => changeLanguage(nextLocale)}>
          {g('common.currentLanguage')}
        </Button>
      </div>
    </header>
  )
}
