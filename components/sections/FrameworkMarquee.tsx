import {
  publicFrameworks,
  type PublicFramework,
} from "@/data/frameworks";

const availableLogoIds = [
  "sama-csf",
  "iso-27001",
  "nist-csf",
  "cis-controls",
  "pci-dss",
  "soc-2",
  "sox-itgc",
  "cobit-2019",
  "gdpr",
  "dora",
  "nis2",
  "hipaa",
  "hitrust-csf",
  "sbp-cloud",
];

const availableFrameworks = availableLogoIds.flatMap((id) => {
  const framework = publicFrameworks.find((item) => item.id === id);
  return framework?.logo ? [framework] : [];
});

function FrameworkLogo({ framework }: { framework: PublicFramework }) {
  return (
    <article
      className="framework-wordmark"
      aria-label={`${framework.name}: ${framework.fullName}`}
    >
      <img
        className="framework-wordmark-logo"
        src={framework.logo}
        alt=""
        loading="lazy"
        aria-hidden="true"
      />
      <div className="framework-wordmark-title">{framework.name}</div>
    </article>
  );
}

function FrameworkGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className="framework-marquee-home-group"
      aria-hidden={duplicate ? "true" : undefined}
    >
      {availableFrameworks.map((framework) => (
        <FrameworkLogo
          key={`${framework.id}${duplicate ? "-copy" : ""}`}
          framework={framework}
        />
      ))}
    </div>
  );
}

export default function FrameworkMarquee() {
  return (
    <section
      aria-labelledby="framework-marquee-heading"
      className="overflow-hidden bg-[#fbfdfc] py-14 sm:py-16"
    >
      <h2
        id="framework-marquee-heading"
        className="mx-auto max-w-4xl px-6 text-center font-noto-serif text-2xl font-normal tracking-[-0.035em] text-[#000414] sm:text-3xl"
      >
        Built for regulated teams navigating GCC mandates and global standards
      </h2>

      <div
        className="framework-marquee-viewport"
        tabIndex={0}
        aria-label="Framework catalogue. Focus pauses movement."
      >
        <div className="framework-marquee-home-track">
          <FrameworkGroup />
          <FrameworkGroup duplicate />
        </div>
      </div>
    </section>
  );
}
