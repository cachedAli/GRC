module.exports = {
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
