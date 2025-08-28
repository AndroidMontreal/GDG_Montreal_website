import { FaDiscord } from 'react-icons/fa';

export const headerConfig = {
  logo: {
    src: "/images/logo/gdg_montreal.png",
    alt: {
      en: "Montreal Google Developer Group",
      fr: "Groupe de Développeurs Google Montréal"
    },
    width: 250,
    height: 100,
    href: "/"
  },
  smallLogo: {
    src: "/images/logo/gdg.png",
    alt: {
      en: "Montreal Google Developer Group",
      fr: "Groupe de Développeurs Google Montréal"
    },
    width: 60,
    height: 60,
    href: "/"
  },
  cta: {
    href: "https://discord.gg/QpVZjYFQhF",
    label: {
      en: "Join Community",
      fr: "Rejoindre la Communauté"
    }
  },
  compactIcon: {
    component: FaDiscord,
    className: "w-6 h-6 text-indigo-600",
    ariaLabel: {
      en: "Join our Discord community",
      fr: "Rejoindre notre communauté Discord"
    }
  },
  mobileMenu: {
    ariaLabel: {
      en: "menu",
      fr: "menu"
    }
  }
};
