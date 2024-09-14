interface Service {
  title: string;
  slug: string;
  icon: string;
  image: Image;
  description: string;
}

interface Portfolio {
  title: string;
  slug: string;
  image: Image;
  service: string;
}

interface Package {
  title: string;
  description: string;
  price: number;
  price_type: "BDT" | "USD";
  features: string[];
  service: string;
  active: boolean;
  offer: Offer;
}

interface Offer {
  title: string;
  percentage: number;
  active: true;
}

interface Image {
  url: string;
}
