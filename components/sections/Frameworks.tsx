"use client";

import Image from "next/image";
import { type CSSProperties, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Network } from "lucide-react";

type Framework = {
  id: string;
  name: string;
  subtitle: string;
  fullName: string;
  acronym: string;
  logo?: string;
  logoOffsetX?: number;
  logoOffsetY?: number;
  region: string;
  ring: "inner" | "outer";
};

const frameworks: Framework[] = [
  { id: "nca-ecc", name: "NCA ECC", subtitle: "Essential cyber controls", fullName: "NCA Essential Cybersecurity Controls", acronym: "NCA", region: "GCC", ring: "outer" },
  { id: "sama-csf", name: "SAMA CSF", subtitle: "Saudi financial security", fullName: "SAMA Cyber Security Framework", acronym: "SAMA", logo: "/frameworks/sama.gov.sa.png", region: "GCC", ring: "outer" },
  { id: "pdpl", name: "PDPL", subtitle: "Privacy obligations", fullName: "Saudi Personal Data Protection Law", acronym: "PDPL", region: "GCC", ring: "outer" },
  { id: "iso-27001", name: "ISO 27001", subtitle: "ISMS certification", fullName: "ISO/IEC 27001 Information Security Management", acronym: "ISO", logo: "/frameworks/iso.org.png", region: "Global", ring: "inner" },
  { id: "iso-22301", name: "ISO 22301", subtitle: "Business continuity", fullName: "ISO 22301 Business Continuity Management", acronym: "ISO", logo: "/frameworks/iso.org.png", region: "Global", ring: "outer" },
  { id: "iso-27701", name: "ISO 27701", subtitle: "Privacy management", fullName: "ISO/IEC 27701 Privacy Information Management", acronym: "ISO", logo: "/frameworks/iso.org.png", region: "Global", ring: "outer" },
  { id: "nist-csf", name: "NIST CSF", subtitle: "Cybersecurity functions", fullName: "NIST Cybersecurity Framework", acronym: "NIST", logo: "/frameworks/nist.gov.png", logoOffsetY: 1, region: "Global", ring: "inner" },
  { id: "nis2", name: "NIS2", subtitle: "EU cyber directive", fullName: "Network and Information Security Directive 2", acronym: "NIS2", logo: "/frameworks/enisa.europa.eu.png", region: "EU", ring: "outer" },
  { id: "pci-dss", name: "PCI DSS", subtitle: "Cardholder security", fullName: "Payment Card Industry Data Security Standard", acronym: "PCI", logo: "/frameworks/pcisecuritystandards.org.png", logoOffsetY: -2, region: "Global", ring: "inner" },
  { id: "soc-2", name: "SOC 2", subtitle: "Trust services criteria", fullName: "SOC 2 Trust Services Criteria", acronym: "SOC", logo: "/frameworks/aicpa.org.png", region: "Global", ring: "inner" },
  { id: "gdpr", name: "GDPR", subtitle: "EU privacy regulation", fullName: "General Data Protection Regulation", acronym: "GDPR", logo: "/frameworks/gdpr.eu.png", region: "EU", ring: "inner" },
  { id: "dora", name: "DORA", subtitle: "Operational resilience", fullName: "Digital Operational Resilience Act", acronym: "DORA", logo: "/frameworks/esma.europa.eu.png", region: "EU", ring: "outer" },
  { id: "cis-controls", name: "CIS Controls", subtitle: "Security baselines", fullName: "CIS Critical Security Controls", acronym: "CIS", logo: "/frameworks/cisecurity.org.png", logoOffsetX: 3, region: "Global", ring: "outer" },
  { id: "cobit", name: "COBIT", subtitle: "IT governance", fullName: "COBIT 2019 Governance Framework", acronym: "COBIT", logo: "/frameworks/isaca.org.png", region: "Global", ring: "outer" },
  { id: "sox", name: "SOX", subtitle: "Financial reporting", fullName: "Sarbanes-Oxley IT General Controls", acronym: "SOX", logo: "/frameworks/sec.gov.png", region: "US", ring: "outer" },
  { id: "hipaa", name: "HIPAA", subtitle: "Healthcare safeguards", fullName: "HIPAA Security and Privacy Rule", acronym: "HIPAA", logo: "/frameworks/hhs.gov.png", logoOffsetX: 2, region: "US", ring: "outer" },
  { id: "hitrust", name: "HITRUST", subtitle: "Health trust", fullName: "HITRUST Common Security Framework", acronym: "HIT", logo: "/frameworks/hitrustalliance.net.png", region: "Global", ring: "outer" },
  { id: "aramco-ccc", name: "Aramco CCC", subtitle: "Industrial cyber controls", fullName: "Aramco Cybersecurity Compliance Controls", acronym: "CCC", region: "GCC", ring: "outer" },
];

const frameworkCount = 30;

function OrbitNode({
  framework,
  index,
  count,
  activeId,
  setActiveId,
  reduceMotion,
}: {
  framework: Framework;
  index: number;
  count: number;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  reduceMotion: boolean;
}) {
  const active = activeId === framework.id;
  const dimmed = activeId !== null && !active;
  const radius = framework.ring === "inner" ? 215 : 340;
  const angle = (360 / count) * index;
  const outer = framework.ring === "outer";
  const opensLeft = outer && Math.cos((angle * Math.PI) / 180) > 0;

  return (
    <motion.div
      className={`framework-home-orbit-anchor ${outer ? "framework-home-orbit-anchor--outer" : ""}`}
      data-active={active}
      data-paused={activeId !== null || reduceMotion}
      style={{
        "--framework-angle": `${angle}deg`,
        "--framework-radius": `${radius}px`,
      } as CSSProperties}
    >
      <button
        type="button"
        aria-label={`${framework.name}: ${framework.subtitle}`}
        aria-pressed={active}
        onMouseEnter={() => setActiveId(framework.id)}
        onMouseLeave={() => setActiveId(null)}
        onFocus={() => setActiveId(framework.id)}
        onBlur={() => setActiveId(null)}
        onClick={() => setActiveId(framework.id)}
        className={`framework-home-orbit-node absolute flex cursor-pointer items-center overflow-hidden border bg-white/90 p-2 text-left outline-none transition-[width,border-radius,opacity,background-color,border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#12d8ff] focus-visible:ring-offset-4 ${active ? (opensLeft ? "flex-row-reverse justify-start" : "justify-start") : "justify-center"} ${
          opensLeft ? (outer ? "-right-[37px] left-auto -top-[37px]" : "-right-[43px] left-auto -top-[43px]") : (outer ? "-left-[37px] -top-[37px]" : "-left-[43px] -top-[43px]")
        } ${outer ? "h-[74px]" : "h-[86px]"} ${
          active ? (outer ? "w-[292px] rounded-full" : "w-[320px] rounded-full") : (outer ? "w-[74px] rounded-full" : "w-[86px] rounded-full")
        } ${
          dimmed ? "opacity-30" : "opacity-100"
        } ${
          active ? "border-[#0057ff]/55 bg-white shadow-[0_24px_50px_-22px_rgba(0,87,255,0.52),0_0_0_6px_rgba(18,216,255,0.15)]" : "border-[#0057ff]/18 shadow-[0_18px_34px_-22px_rgba(2,8,36,0.3)]"
        }`}
      >
        <span className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#0057ff]/14 bg-[radial-gradient(circle_at_30%_30%,#fff,#eef7ff_62%,#d8ebfa)] font-mono font-bold uppercase tracking-[-0.07em] text-[#0057ff] transition-transform duration-300 ${outer ? "h-[50px] w-[50px] text-[0.52rem]" : "h-[58px] w-[58px] text-[0.58rem]"} ${active ? "scale-110" : "scale-100"}`}>
          {framework.logo ? (
            <Image
              src={framework.logo}
              alt=""
              width={58}
              height={58}
              className="block h-[72%] w-[72%] shrink-0 object-contain object-center"
              style={{
                transform: `translate(${framework.logoOffsetX ?? 0}px, ${framework.logoOffsetY ?? 0}px)`,
              }}
            />
          ) : framework.acronym}
        </span>
        <span className={`min-w-0 overflow-hidden whitespace-normal text-left transition-[max-width,opacity,transform,margin] duration-300 ${active ? (opensLeft ? (outer ? "mr-3 max-w-[205px] translate-x-0 opacity-100" : "mr-3 max-w-[225px] translate-x-0 opacity-100") : (outer ? "ml-3 max-w-[205px] translate-x-0 opacity-100" : "ml-3 max-w-[225px] translate-x-0 opacity-100")) : "ml-0 max-w-0 translate-x-2 opacity-0"}`}>
          <strong className="block font-body text-sm font-semibold leading-[1.05] text-[#000414]">{framework.name}</strong>
          <small className="mt-0.5 block line-clamp-2 font-body text-xs leading-snug text-[#020824]/60">{active ? `${framework.fullName} · ${framework.region}` : framework.subtitle}</small>
        </span>
      </button>
    </motion.div>
  );
}

export default function Frameworks() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const innerRing = frameworks.filter((framework) => framework.ring === "inner");
  const outerRing = frameworks.filter((framework) => framework.ring === "outer");
  const activeFramework = frameworks.find((framework) => framework.id === activeId);

  return (
    <section id="frameworks" className="bg-[#fbfdfc] px-3 py-5 sm:px-6 md:px-8">
      <div className="relative isolate mx-auto max-w-[1480px] overflow-hidden rounded-[2.5rem] border border-[#d8ebfa] bg-[#eef7ff] px-4 py-20 sm:px-6 md:py-28">
        <div aria-hidden="true" className="absolute inset-0 opacity-65 [background-image:linear-gradient(rgba(0,87,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(0,87,255,0.055)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div aria-hidden="true" className="absolute left-[7%] top-[14%] h-[280px] w-[280px] rounded-full bg-[#12d8ff]/18 blur-[28px]" />
        <div aria-hidden="true" className="absolute bottom-[10%] right-[6%] h-[320px] w-[320px] rounded-full bg-[#0057ff]/14 blur-[30px]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.header
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[800px] text-center"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#0057ff]">Framework intelligence</p>
            <h2 className="mt-3 font-display text-[2.25rem] font-semibold leading-[1.15] text-[#000414]">One connected system for every framework you run.</h2>
            <p className="mx-auto mt-4 max-w-[650px] font-body text-base leading-relaxed text-[#020824]/68">From GCC mandates to global certifications, CompliVerse turns every framework into a connected control, evidence, and assurance program.</p>
          </motion.header>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onMouseLeave={() => setActiveId(null)}
            className="relative mx-auto mt-12 hidden min-h-[880px] max-w-[1060px] overflow-hidden rounded-[2.5rem] border border-[#0057ff]/14 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.96),rgba(231,244,255,0.92)_46%,rgba(216,235,250,0.86)_100%)] shadow-[0_30px_90px_-50px_rgba(0,87,255,0.35)] md:block"
          >
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[690px] w-[690px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0057ff]/22 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.44)]" />
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#12d8ff]/50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.44)]" />

            {innerRing.map((framework, index) => <OrbitNode key={framework.id} framework={framework} index={index} count={innerRing.length} activeId={activeId} setActiveId={setActiveId} reduceMotion={Boolean(reduceMotion)} />)}
            {outerRing.map((framework, index) => <OrbitNode key={framework.id} framework={framework} index={index} count={outerRing.length} activeId={activeId} setActiveId={setActiveId} reduceMotion={Boolean(reduceMotion)} />)}

            <div className="absolute left-1/2 top-1/2 z-20 w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-[22px] border border-[#0057ff]/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(238,247,255,0.94))] px-4 py-4 text-center shadow-[0_24px_65px_-30px_rgba(0,87,255,0.28)]">
              <div aria-hidden="true" className="pointer-events-none absolute -inset-2 rounded-[36px] border border-[#12d8ff]/35" />
              <div className="relative">
                <div className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-[#0057ff] text-white"><Network size={18} strokeWidth={1.7} /></div>
                <span className="mt-3 block font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#0057ff]">CompliVerse</span>
                <strong className="mt-1.5 block font-display text-[1.55rem] font-semibold leading-[1.02] text-[#000414]">Framework<br />intelligence</strong>
                <div className="mt-2.5 grid gap-1.5">
                  <span className="border border-[#0057ff]/14 bg-white/80 px-2 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.08em] text-[#0057ff]">{frameworkCount} frameworks</span>
                  <span className="border border-[#0057ff]/14 bg-white/80 px-2 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.08em] text-[#0057ff]">GCC + global</span>
                  <span className="border border-[#0057ff]/14 bg-white/80 px-2 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.08em] text-[#0057ff]">Mapped to controls</span>
                </div>
              </div>
            </div>

          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="framework-reuse-strip"
            aria-label="Framework reuse model"
          >
            <span>Framework requirements</span>
            <i aria-hidden="true">{"->"}</i>
            <span>Shared control</span>
            <i aria-hidden="true">{"->"}</i>
            <span>Approved evidence</span>
            <i aria-hidden="true">{"->"}</i>
            <span>Coverage</span>
          </motion.div>

          <div className="mt-10 grid gap-2 md:hidden">
            <div className="border border-[#0057ff]/18 bg-white p-5"><p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#0057ff]">Framework intelligence</p><h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-[#000414]">{frameworkCount} frameworks mapped to one control layer.</h3></div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{frameworks.map((framework) => <button key={framework.id} type="button" aria-pressed={activeId === framework.id} onClick={() => setActiveId(activeId === framework.id ? null : framework.id)} className={`min-h-14 cursor-pointer border px-3 py-2 text-left font-mono text-[0.62rem] font-semibold uppercase tracking-[0.06em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12d8ff] ${activeId === framework.id ? "border-[#0057ff] bg-[#0057ff] text-white" : "border-[#0057ff]/18 bg-white text-[#000414]"}`}>{framework.name}</button>)}</div>
            {activeFramework && <p className="border-l-2 border-[#12d8ff] bg-white px-4 py-3 font-body text-sm leading-relaxed text-[#020824]/72"><strong className="font-semibold text-[#000414]">{activeFramework.fullName}</strong> · {activeFramework.region}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
