module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      // The old /features page is replaced by the on-brand /platform overview.
      { source: "/features", destination: "/platform", permanent: true },
      // Assets + Vulnerabilities are now one unified Cybersecurity Assurance page.
      { source: "/platform/assets", destination: "/platform/assurance", permanent: true },
      { source: "/platform/vulnerabilities", destination: "/platform/assurance", permanent: true },
    ];
  },
};
