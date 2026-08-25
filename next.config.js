module.exports = {
  async redirects() {
    return [
      // The old /features page is replaced by the on-brand /platform overview.
      { source: "/features", destination: "/platform", permanent: false },
      // Assets + Vulnerabilities are now one unified Cybersecurity Assurance page.
      { source: "/platform/assets", destination: "/platform/assurance", permanent: false },
      { source: "/platform/vulnerabilities", destination: "/platform/assurance", permanent: false },
    ];
  },
  async rewrites() {
    return [
      { source: "/landing-2", destination: "/landing-2/index.html" },
      { source: "/landing-2/platform", destination: "/landing-2/platform.html" },
      { source: "/landing-2/frameworks", destination: "/landing-2/frameworks.html" },
      { source: "/landing-2/ai", destination: "/landing-2/ai.html" },
      { source: "/landing-2/comparison", destination: "/landing-2/comparison.html" },
      { source: "/landing-2/experience", destination: "/landing-2/experience.html" },
    ];
  },
};
