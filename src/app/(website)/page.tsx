"use client";
import SignLogButton from "@/components/signLogButton";
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AlertTriangle, ChevronRight, Icon, LayoutDashboard, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslations } from "@/lib/useTranslations";

export default function HomePage() {
  const NavData = [
    { href: "/", title: "Accueil" },
    { href: "/personnal accounts", title: "Comptes personnels" },
    { href: "/joint accounts", title: "Comptes joints" },
    { href: "/account types", title: "Types de comptes" },
    { href: "/more options", title: "Plus d'options" },
  ];
  const pathname = usePathname();

  const firstBlock = [
    {
      legend: 'solo',
      title: "Comptes personnels pour vos besoins individuels",
      describ: "Profitez d’un contrôle total sur vos finances.",
      icon: User,
    },
    {
      legend: 'equipe',
      title: "Comptes joints pour vos objectifs financiers partagés",
      describ: "Collaborez avec d’autres tout en gérant vos fonds communs.",
      icon: Users,
    },
    {
      legend: 'attention',
      title: "Restrictions flexibles pour la gestion des comptes",
      describ: "Définissez des permissions personnalisées pour les titulaires de comptes joints.",
      icon: AlertTriangle,
    },
  ];
  const firstBlock1 = [
    {
      title: "Options de compte flexibles, personnel et joint",
      describ:
        "Découvrez une expérience bancaire fluide grâce à nos comptes personnels et joints simples à utiliser.",
      image: "/image.png",
      lien: "En savoir plus",
    },
    {
      title: "Transactions sécurisées avec chiffrement avancé",
      describ:
        "Votre sécurité est notre priorité, garantissant des opérations sûres et protégées.",
      image: "/image.png",
      lien: "S’inscrire",
    },
    {
      title: "Assistance client 24h/24 et 7j/7",
      describ:
        "Notre équipe dédiée est disponible à tout moment pour vous aider.",
      image: "/image.png",
      lien: "Contact",
    },
  ];
  const [monInput, setMonInput] = useState<string>("");
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMonInput(e.target.value);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8); 
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); 
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: false, 
      mirror:true,    
    });
  }, []);

  const t = useTranslations('homePage')
  const g = useTranslations()

  return (
    <main className="flex flex-col items-center poppins relative">
      <header
        className={`${
          scrolled
            ? "text-[#1a1a1a] bg-white shadow-lg"
            : "bg-gray-50 text-black shadow"
        } w-full h-20 duration-500 fixed px-6 z-20 `}
        data-aos="fade-down"
      >
        <div className="flex w-full justify-between items-center h-full" >
          <h1 className="text-2xl font-bold">L2P Finance</h1>
          <div className="flex gap-3 items-center">
            {NavData.map((nav) => {
              const isActive = pathname === nav.href;
              return (
                <Link
                  key={nav.href}
                  href={nav.href}
                  className={
                    isActive
                      ? "text-blue-400 underline-offset-2 font-bold capitalize font-sans"
                      : "capitalize font-bold font-sans hover:text-blue-500/60 duration-500"
                  }
                >
                  {nav.title}
                </Link>
              );
            })}
            <div className="flex *:w-20 gap-3 *:cursor-pointer *:duration-500 *:text-shadow-2xl">
              <Button className="border-2 border-blue-500 text-blue-500 hover:text-white bg-transparent hover:bg-blue-500">
                <Link href='/Sign in'>{t("nav.signUp")}</Link>
              </Button>
              <Button className="bg-blue-500 hover:bg-transparent hover:text-red-500 hover:border-2 border-red-500">
                <Link href='/login'>{t("nav.login")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex w-full relative h-140 justify-between gap-1 items-center px-6 text-foregroun mt-20 bg-[url('https://angular.hibootstrap.com/tartu/assets/images/banners/banner-bg1.jpg')] bg-cover" data-aos='fade-down' data-aos-duration='1000'>
        <div className="w-2/3">
          <p className="text-6xl text-shadow-2xl poppins-bold mb-10" data-aos='zoom-in-right' data-aos-duration='700'>
           {t("hero.title")}
          </p>
          <p data-aos='zoom-in-right'>
            {t("hero.subtitle")}
          </p>
          <div className="flex *:w-20 gap-3 *:cursor-pointer *:duration-500 mt-4 *:text-shadow-2xl">
            <SignLogButton />
          </div>
        </div>
      </div>
      <div className="w-full gap-4 flex flex-col items-center my-20">
        <div className="flex w-full justify-between px-6 gap-8">
          <div className="flex flex-col w-1/2 gap-2">
            <p className="text-blue-500" data-aos='fade-up'>{t("featuresIntro.highlight")}</p>
            <p className="text-5xl text-shadow-6xl poppins-bold" data-aos='fade-up'>{t("featuresIntro.title")}</p>
          </div>
          <p className="w-1/2 h-full my-auto" data-aos='fade-up'>{t("featuresIntro.description")}</p>
        </div>
        <div className="flex mt-10 justify-between w-full px-6 overflow-hidden border py-10">
          {firstBlock.map((el, index) => {
            const Icon = el.icon;
            const duration = index == 0 ? '500' : index == 1 ? '1000' : '1500'
            return (
              <Card
                key={index}
                className="w-95 border-none hover:shadow-lg group transition-all  duration-1000 bg-[#f0f8ff] p-[10px] sm:p-[30px] xl:p-[20px] rounded-[10px] "
                data-aos='fade-up'
                data-aos-duration={duration}
              >
                <CardHeader className="flex items-center my-5">
                  <div className="flex rounded-full justify-center items-center bg-white text-blue-500 ease-in-out duration-500 gap-8 w-12 h-12">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="poppins-bold capitalize group-hover:text-blue-600">
                    {el.legend}
                  </p>
                </CardHeader>
                <CardContent className="">
                  <h3 className="text-lg poppins-bold mb-10 text-shadow-2xl">{el.title}</h3>
                  <p>{el.describ}</p>
                </CardContent>
                <CardFooter className="mt-10 h-10">
                  <SignLogButton />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="relative h-220 bg-sky-100 mt-50 mb-50" data-aos='fade-up'>
        <div className="px-6 w-full h-120 shadow mb-15 -mt-50">
          <div className="flex h-full items-center justify-between mb-20 w-full pr-6 gap-2 bg-blue-500 rounded-2xl md:py-10 lg:py-0">
            <div className="w-1/3 flex h-full bg-red-500 pr-5 rounded-r-2xl">
              <img
                src="/image.png"
                alt="image"
                className="w-full h-full object-cover rounded-2xl" 
              />
            </div>
            <div className="flex flex-col group w-2/3 h-full text-white p-6">
              <p data-aos='fade-up' data-aos-duration='500'>{t("ctaBlock.highlight")}</p>
              <h3 className="text-4xl my-5 text-shadow-5xl poppins-bold" data-aos='fade-up' data-aos-duration='1000'>
                {t('ctaBlock.title')}
              </h3>
              <p className="poppins-semibold" data-aos='fade-up' data-aos-duration='1300'>
                {t("ctaBlock.description")}
              </p>
              <ul className="mt-10 gap-2 *:gap-2" data-aos='fade-up' data-aos-duration='1500'>
                <li>{t("ctaBlock.points.length")}</li>
                <li>Profitez d’une expérience bancaire personnalisée.</li>
                <li>Restez en sécurité grâce à nos fonctionnalités de protection avancées.</li>
              </ul>
              <div className="flex bottom-0 items-end h-full">
                <SignLogButton />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full px-6">
          <h3 className="text-5xl w-4/5 text-center mb-40 mt-20 poppins-bold text-shadow-5xl" data-aos='fade-up'>
            {t("solutions.title")}
          </h3>
          <div className="flex w-full justify-between">
            {firstBlock1.map((el, index) => {
              const duration = index == 0 ? '500' : index == 1 ? '1000' : '1500'
              
              return (
              <Card
                key={index}
                className="w-95 rounded-md py-0 h-120 group bg-white border-none shadow-none group gap-0 border-black"
                data-aos='fade-up'
                data-aos-duration={duration}
              >
                <CardHeader className="min-h-51 w-full p-0 flex overflow-hidden">
                  <img
                    src={el.image}
                    alt="image"
                    className="bg-gray-40 object-cover h-full w-full duration-500 group-hover:scale-105"
                  />
                </CardHeader>
                <div className="flex flex-col h-full group-hover:shadow-xl duration-500 rounded-b-2xl">
                  <CardContent className="hover:bg-white">
                    <h1 className="text-3xl mb-5">{el.title}</h1>
                    <p>{el.describ}</p>
                  </CardContent>
                  <CardFooter className="h-full flex items-end pb-2">
                    <p className="hidden group-hover:flex">{el.lien}</p>{" "}
                    <ChevronRight className=" hidden group-hover:flex w-4 h-4" />
                  </CardFooter>
                </div>
              </Card>
            )})}
          </div>
        </div>
      </div>

      <div className="flex w-full mb-20 mt-40 p-10 h-140" data-aos='fade-up'>
        <div className="flex w-full h-full justify-between items-center group bg-sky-100" data-aos='fade-up'>
          <div className="flex flex-col gap-10 py-4 pl-8 h-full justify-center">
            <h1 className="text-4xl poppins-bold w-2/3" data-aos='fade-up'>
              {t("join.title")}
            </h1>
            <p data-aos='fade-up'>{t("join.description")}</p>
            <div className="w-full h-10" data-aos='fade-up'>
              <SignLogButton />
            </div>
          </div>
          <div className="w-1/2 h-full " data-aos='fade-up'>
            <div className="h-full w-3/4 bg-red-500 float-end pl-4 rounded-l-3xl">
              <img src="/image.png" alt="image" className="float-end h-full w-full rounded-l-4xl object-cover"/>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full flex justify-between px-6 mt-20" data-aos="fade-up">
        <div className="flex flex-col w-1/3" data-aos="fade-up" data-aos-duration="500">
          <h1 className="poppins-bold">Plateforme P2L</h1>
        </div>
        <div className="flex flex-col w-1/5" data-aos="fade-up" data-aos-duration="1300">
          <p className="text-sm poppins-bold uppercase">{t("footer.quickLinks.title")}</p>
          <ul className="*:hover:bg-sky-100 *:my-2 px-2  *:duration-500 *:py-1 *:cursor-pointer *:rounded-md *:hover:pl-2 *:text-[#131313] *:hover:text-black">
            <li>{t("footer.quickLinks.about")}</li>
            <li>{t("footer.quickLinks.contact")}</li>
            <li>{t("footer.quickLinks.support")}</li>
            <li>{t("footer.quickLinks.careers")}</li>
            <li>{t("footer.quickLinks.blog")}</li>
          </ul>
        </div>
        <div className="flex flex-col w-1/5" data-aos="fade-up" data-aos-duration="1500">
          <p className="text-sm poppins-bold uppercase">{t("footer.resources.title")}</p>
          <ul className="*:hover:sky-100/30 *:my-2 px-2  *:duration-500 *:py-1 *:cursor-pointer *:rounded-md *:hover:pl-2 *:text-[#131313] *:hover:text-black">
            <li>{t("footer.resources.faq")}</li>
            <li>{t("footer.resources.guide")}</li>
            <li>{t("footer.resources.forum")}</li>
            <li>{t("footer.resources.feedback")}</li>
            <li>{t("footer.resources.press")}</li>
          </ul>
        </div>
        <div className="flex flex-col w-1/5" data-aos="fade-up" data-aos-duration="1300">
          <p className="text-sm poppins-bold uppercase">{t("footer.updates.title")}</p>
          <ul className="*:hover:bg-gsky-100*:my-2 px-2  *:duration-500 *:py-1 *:cursor-pointer *:rounded-md *:hover:pl-2 *:text-[#131313] *:hover:text-black">
            <li>{t("footer.updates.newsletter")}</li>
            <li>{t("footer.updates.offers")}</li>
            <li>{t("footer.updates.updates")}</li>
            <li>{t("footer.updates.events")}</li>
            <li>{t("footer.updates.alerts")}</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm poppins-bold">{t("footer.subscribe.title")}</p>
          <p>{t("footer.subscribe.description")}</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={t("footer.subscribe.placeholder")}
              value={monInput}
              onChange={handleInput}
              className="w-3/4 outline-none bg-blue-600/50 rounded-md pl-2"
            />
            <Button>{t("footer.subscribe.button")}</Button>
          </div>
          <p>{t("footer.subscribe.consent")}</p>
        </div>
      </footer>
    </main>
  );
} 
