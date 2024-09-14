import facebook from "@/public/icon/social_media/facebook.png";
import linkedin from "@/public/icon/social_media/linkedin.png";
import messenger from "@/public/icon/social_media/messenger.png";
import whatsapp from "@/public/icon/social_media/whatsapp.png";
import portfolio1 from "@/public/portfolios_images/examples-10.png";
import portfolio2 from "@/public/portfolios_images/examples-13.png";
import portfolio3 from "@/public/portfolios_images/examples-15.png";
import portfolio4 from "@/public/portfolios_images/examples-17.png";
import portfolio5 from "@/public/portfolios_images/examples-18.png";
import portfolio6 from "@/public/portfolios_images/examples-20.png";
import { Package } from "./types/types";
import wLogo from '@/public/logo/logo w.png'


//CONTSATNTS
// Texts data
export const TEXTS = {
  home: {
    tagline: "ONLY DESIGN AGENCY YOU NEED",
    heading: "The design you need,",
    headingEnd: "Get it here",
    packagesBlock: {
      heading: "We provide better design to upscale your business",
      subHeading:
        "Your brand designs are too important to be left in the hands of unreliable freelancers or expensive creative agencies. Why not hire an experienced, full-time designer who knows you by name and your brand by heart?",
      ourTopCustomers: "Our top customer's",
    },
  },
  global: {
    buttons: {
      bookAcall: "BOOK A CALL",
      ourWorks: "OUR WORKS",
      ourPackages: "OUR PACKAGES",
    },
  },
};

// nav links data
export const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Packages",
    href: "/packages"
  },
  {
    title: "Portfolios",
    href: "/portfolios",
  }
];



// ++++++++++++++++++++++++++++++++



// FROM DATABSE
export const HeroFeatures = [
  "Unlimited design for a flat monthly fee.",
  "We will take care of all your creative needs.",
  "No inefficient freelancers.",
  "No lengthy hiring procedures.",
  "No hastle, ingshaALlah.",
]

export const socialMedias = [
  {
    title: "facebook",
    icon: facebook,
    url: "https://www.facebook.com",
  },
  {
    title: "messenger",
    icon: messenger,
    url: "https://www.facebook.me",
  },
  {
    title: "whatsapp",
    icon: whatsapp,
    url: "https://www.whatsapp.com",
  },
  {
    title: "linkedIn",
    icon: linkedin,
    url: "https://www.linkedin.com",
  },
]

// company logo slide
export const workWithCompanies = [
  {
    title: "Facebook",
    logo: facebook,
  },
  {
    title: "Whatsapp",
    logo: whatsapp,
  },
  {
    title: "Linkedin",
    logo: linkedin,
  },
  {
    title: "Messenger",
    logo: messenger,
  },
  {
    title: "Facebook",
    logo: facebook,
  },
  {
    title: "Whatsapp",
    logo: whatsapp,
  },
  {
    title: "Linkedin",
    logo: linkedin,
  },
  {
    title: "Messenger",
    logo: messenger,
  },
];

export const portfolios = [
  {
    id: 1,
    title: "A project image",
    slug: "a-project-image",
    image: portfolio1,
    serviceId: 1
  },
  {
    id: 2,
    title: "lizaala brochure",
    slug: "a-project-image",
    image: portfolio2,
    serviceId: 2
  },
  {
    id: 3,
    title: "Dillash Poster",
    slug: "a-project-image",
    image: portfolio3,
    serviceId: 5
  },
  {
    id: 4,
    title: "Copolooo cartoon",
    slug: "a-project-image",
    image: portfolio4,
    serviceId: 4
  },
  {
    id: 5,
    title: "a new portfolio",
    slug: "a-project-image",
    image: portfolio5,
    serviceId: 3
  },
  {
    id: 6,
    title: "A project of banner",
    slug: "a-project-image",
    image: portfolio6,
    serviceId: 2
  },
  {
    id: 7,
    title: "A project image",
    slug: "a-project-image",
    image: portfolio1,
    serviceId: 4
  },
  {
    id: 8,
    title: "lizaala brochure",
    slug: "a-project-image",
    image: portfolio2,
    serviceId: 2
  },
  {
    id: 9,
    title: "Dillash Poster",
    slug: "a-project-image",
    image: portfolio3,
    serviceId: 3
  },
  {
    id: 10,
    title: "Copolooo cartoon",
    slug: "a-project-image",
    image: portfolio4,
    serviceId: 4
  },
  {
    id: 11,
    title: "a new portfolio",
    slug: "a-project-image",
    image: portfolio5,
    serviceId: 5
  },
  {
    id: 12,
    title: "A project of banner",
    slug: "a-project-image",
    image: portfolio6,
    serviceId: 1
  },
];

export const services = [
  {
    id: 1,
    title: "Branding and identity",
    slug: "branding-and-identity",
    icon: "https://www.svgrepo.com/show/144703/lock.svg",
    image: portfolio1,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum nesciunt exercitationem dicta quaerat deleniti. Unde totam similique adipisci magnam veritatis!",
  },
  {
    id: 2,
    title: "Logo design",
    slug: "logo-design",
    icon: "https://www.svgrepo.com/show/144703/lock.svg",
    image: portfolio2,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum nesciunt exercitationem dicta quaerat deleniti. Unde totam similique adipisci magnam veritatis!",
  },
  {
    id: 3,
    title: "Poster desing",
    slug: "branding-and-identity",
    icon: "https://www.svgrepo.com/show/144703/lock.svg",
    image: portfolio3,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum nesciunt exercitationem dicta quaerat deleniti. Unde totam similique adipisci magnam veritatis!",
  },
  {
    id:   4,
    title: "Banner design",
    slug: "branding-and-identity",
    icon: "https://www.svgrepo.com/show/144703/lock.svg",
    image: portfolio4,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum nesciunt exercitationem dicta quaerat deleniti. Unde totam similique adipisci magnam veritatis!",
  },
  {
    id: 5,
    title: "Brochure design",
    slug: "branding-and-identity",
    icon: "https://www.svgrepo.com/show/144703/lock.svg",
    image: portfolio5,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum nesciunt exercitationem dicta quaerat deleniti. Unde totam similique adipisci magnam veritatis!",
  },
];

export const packages : Package[] = [
  {
    title: "Graphic design",
    description: "Graphic design for day-to-day marketing need.",
    price: 100,
    price_type: "USD",
    features: ["Banner Ads", "Block Graphics", "Clothing & merchadise Design"],
    serviceId: 1,
    active: true,
    offer: {
      perchentage: 10,
      price: 90,
      name: "Happy startign",
      active: true
    }
  },
  {
    title: "Graphic design",
    description: "Graphic design for day-to-day marketing need.",
    price: 10,
    price_type: "USD",
    features: ["Banner Ads", "Block Graphics", "Clothing & merchadise Design"],
    serviceId: 2,
    active: true,
    offer: {
      perchentage: 10,
      price: 9,
      name: "Happy startign",
      active: false
    }
  },
  {
    title: "Graphic design",
    description: "Graphic design for day-to-day marketing need.",
    price: 10,
    price_type: "USD",
    features: ["Banner Ads", "Block Graphics","Banner Ads", "Block Graphics", "Clothing & merchadise Design"],
    serviceId: 2,
    active: true,
    offer: {
      perchentage: 10,
      price: 9,
      name: "Happy startign",
      active: true
    }
  },
  {
    title: "Graphic design",
    description: "Graphic design for day-to-day marketing need.",
    price: 10,
    price_type: "USD",
    features: ["Banner Ads", "Block Graphics", "Clothing & merchadise Design"],
    serviceId: 2,
    active: true,
    offer: {
      perchentage: 10,
      price: 9,
      name: "Happy startign",
      active: false
    }
  },
  {
    title: "Graphic design",
    description: "Graphic design for day-to-day marketing need.",
    price: 10,
    price_type: "USD",
    features: ["Banner Ads", "Block Graphics", "Clothing & merchadise Design"],
    serviceId: 3,
    active: true,
    offer: {
      perchentage: 10,
      price: 9,
      name: "Happy startign",
      active: false
    }
  },
  {
    title: "Graphic design",
    description: "Graphic design for day-to-day marketing need.",
    price: 10,
    price_type: "USD",
    features: ["Banner Ads", "Block Graphics", "Clothing & merchadise Design"],
    serviceId: 4,
    active: true,
    offer: {
      perchentage: 10,
      price: 9,
      name: "Happy startign",
      active: false
    }
  },
  {
    title: "Graphic design",
    description: "Graphic design for day-to-day marketing need.",
    price: 10,
    price_type: "USD",
    features: ["Banner Ads", "Block Graphics", "Clothing & merchadise Design"],
    serviceId: 4,
    active: true,
    offer: {
      perchentage: 10,
      price: 9,
      name: "Happy startign",
      active: false
    }
  },
  {
    title: "Graphic design",
    description: "Graphic design for day-to-day marketing need.",
    price: 10,
    price_type: "USD",
    features: ["Banner Ads", "Block Graphics", "Clothing & merchadise Design"],
    serviceId: 5,
    active: true,
    offer: {
      perchentage: 10,
      price: 9,
      name: "Happy startign",
      active: false
    }
  },
];

export const logo = {
  url: wLogo
}

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
