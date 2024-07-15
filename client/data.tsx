// mission tagline data

export const missionTaglineData = {
  tagline:
    "Our mission is simple - to create best design and increase your business",
};

export const videoData = {
  advertiseVideo: [
    {
      src: process.env.ADDVERTISE_VIDEO_LINK as string,
      type: process.env.ADDVERTISE_VIDEO_TYPE as string,
    }
  ],
};

export type Source = (typeof videoData.advertiseVideo)[0];

// home services Data

export const servicePageOverviewAndService = [
  {
    id: 1,
    title: "Overview",
    slug: "overview",
    short_description:
      "Wafipix believes in helping businesses define what their brand stands for, their core values and tone of voice. We communicate those terms consistently across all media outlets.",
  },
  {
    id: 1,
    title: "Services",
    slug: "service",
    short_description:
      "You bring the steak, we’ll add the sizzle. We are a brand strategy agency, specializing in creating effective campaigns through identity design, brand story, messaging, and web development.",
  },
];

// Contact data
export const contactData = {
  address: {
    country: process.env.COUNTRY as string,
    city: process.env.CITY as string,
    area: process.env.AREA as string,
    phone: process.env.PHONE as string,
    email: process.env.EMAIL as string,
  },
};

/**
 * Text data
 */

// nav links data
export const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Portfolios",
    href: "/portfolios",
  },
  {
    title: "Reviews",
    href: "/reviews",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

// Follow links data
export const followLinks = [
  {
    title: "Facebook",
    link: process.env.FACEBOOK_PAGE_LINK as string,
  },
  {
    title: "Dribbble",
    link: process.env.DRIBBBLE_LINK as string,
  },
  {
    title: "Messenger",
    link: process.env.FACEBOOK_MESSENGER_LINK as string,
  },
];

export const servicePageTexts = {
  sidebar: {
    firstTagLine: "If you need it then we can do it.",
    secondTagline: "From Design To Publish and more.",
  },
};
export const aboutPageTexts = {
  sidebar: {
    firstTagLine: "Our Mission Is Simple",
    secondTagline: "We Build Compelling Brands That Connect.",
  },
};
