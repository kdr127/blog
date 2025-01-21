import Head from "next/head";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <Head>
        {/* key="metadescription" | key="pagetitle" › to avoid duplications › nimm diesen tag */}
        <title key="pagetitle">hype blog app</title>
        <meta
          name="description"
          content="read our hype blog app page"
          key="metadescription"
        ></meta>
      </Head>

      <div className="min-h-screen bg-[url('/img6.jpg')] relative">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>

        <SiteHeader className="z-10 relative" />

        <main>
          <div className="min-h-[50vh] flex flex-col items-center justify-center z-10 relative">
            <h1 className="text-6xl text-center text-slate-100 mt-80">
              welcome to <span className="text-blue-400">kksen</span>
            </h1>
            <div className="mt-20">
              <Link
                href="/blog"
                className="text-2xl text-slate-100 border-slate-100 border-2 rounded-md py-3 px-4 hover:bg-yellow-300 hover:text-slate-800 hover:border-yellow-300 transition"
              >
                read blog
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
