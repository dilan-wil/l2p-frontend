import { Button } from "@/components/ui/button"
import { useTranslations } from "@/lib/useTranslations"
import Link from "next/link"

export default function HomePage() {
  const t = useTranslations('homepage')

  return (
    <main className="h-full flex justify-center items-center">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-foreground">{t('welcome')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
          <div className="pt-4 space-x-4">
            <Button asChild size="lg" className="px-8 py-3 text-lg">
              <Link href="/login">{t('signIn')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 py-3 text-lg bg-transparent">
              <Link href="/register">{t('getStarted')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
