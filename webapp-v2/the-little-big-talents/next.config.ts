import type { NextConfig } from "next";

// URLs from the old site. They redirect permanently so existing links keep
// working and search engines move the old URL's ranking to the new page.
const LEGACY_REDIRECTS = [
  { source: "/page/classicalguitar", destination: "/group-lessons/classical-guitar-course", permanent: true },
  { source: "/page/drums", destination: "/individual-lessons/drums", permanent: true },
  { source: "/page/guitar", destination: "/individual-lessons/guitar", permanent: true },
  { source: "/page/highereduprep", destination: "/preparatory-lessons/higher-music-school", permanent: true },
  { source: "/page/highschoolprep", destination: "/preparatory-lessons/secondary-music-school", permanent: true },
  { source: "/page/mission", destination: "/about-us/mission", permanent: true },
  { source: "/page/piano", destination: "/individual-lessons/piano", permanent: true },
  { source: "/page/pianojuniors", destination: "/group-lessons/piano-for-little-ones", permanent: true },
  { source: "/page/popjazz", destination: "/individual-lessons/pop-jazz-singing", permanent: true },
  { source: "/page/prices", destination: "/pricing", permanent: true },
  { source: "/page/sfgmtheory", destination: "/group-lessons/solfege-music-theory", permanent: true },
  { source: "/page/subjects", destination: "/about-us/music-disciplines", permanent: true },
  { source: "/page/team", destination: "/about-us/team", permanent: true },
  { source: "/page/vocalgroup", destination: "/group-lessons/vocal-groups", permanent: true },
];

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  redirects: async () => LEGACY_REDIRECTS,
};

export default nextConfig;
