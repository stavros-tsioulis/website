/**
 * Get a list of strings that we can use to deeply key an object
 */
export type DeepKeys<T> = T extends (infer U)[]
  ? U extends object
    ? `[].${DeepKeys<U>}` | '[]'
    : '[]'
  : T extends object
    ? {
      [K in keyof T]: T[K] extends object
				? K extends string
      		? `${K}.${DeepKeys<T[K]>}` | `${K}`
					: never
      	: K
    }[keyof T]
    : never

/**
 * Using a DeepKey, get the type corresponding to it in the object
 */
export type DeepPropertyType<T, K extends DeepKeys<T>> = K extends keyof T
  ? T[K]
  : K extends '[]'
    ? T extends (infer U)[]
      ? U
      : never
    : K extends `[].${infer RestKeys}`
      ? T extends (infer U)[]
        ? RestKeys extends DeepKeys<U>
          ? DeepPropertyType<U, RestKeys>
          : never
        : never
      : K extends `${infer FirstKey}.[]`
        ? FirstKey extends keyof T
          ? T[FirstKey] extends (infer U)[]
            ? U
            : never
          : FirstKey extends DeepKeys<T>
						? DeepPropertyType<T, FirstKey> extends (infer V)[]
							? V
							: never
            : never
        : K extends `${infer FirstKey}.${infer RestKeys}`
          ? FirstKey extends keyof T
            ? RestKeys extends DeepKeys<T[FirstKey]>
              ? DeepPropertyType<T[FirstKey], RestKeys>
              : never
            : never
          : never

export const languages = {
  en: 'English',
  gr: 'Ελληνικά'
}

export const ui = {
  en: {
    hero: {
      main: 'Stavros Tsioulis',
      description: 'I am a full-stack developer with 4 years of experience, specialized in the JavaScript/TypeScript ecosystem, as well as technologies like React, Vue, Angular, Astro, Express, Ts.ED, NestJS. Isn\'t the picture below cool? I shot it.',
      learnMore: 'More',
    },
    nav: {
      home: 'Home',
      info: 'Info',
      contact: 'Contact'
    },
    section: {
      skillset: {
        title: "Skills & Knowledge",
        items: [
          { title: "Languages", description: "JavaScript, TypeScript, Python, C, C++, Rust" },
          { title: "Languages (human ones)", description: "Greek, English, Japanese (N3)" },
          { title: "Frameworks and Libraries (FE)", description: "React/Next, Vue/Nuxt, Angular, Astro" },
          { title: "Frameworks and Libraries (BE)", description: "Express, Ts.ED, NestJS, MySQL, MongoDB, TypeORM" },
          { title: "Devops", description: "Basic Cloudflare literacy: Pages, Workers, Tunnels. VPS setup; certificate management." },
        ],
      },
      biography: {
        title: 'Biography',
        items: [
          {
            date: 'March 2023 - Present',
            title: 'NamiComi',
            href: 'https://namicomi.com',
            role: "Lead Frontend Developer"
          },
          {
            date: 'February 2023 - March 2023',
            title: 'Provollee',
            href: 'https://provollee.gr',
            role: "Website Developer"
          },
        ]
      },
      contact: {
        title: "Get in touch",
      }
    },
  },
  gr: {
    hero: {
      main: 'Σταύρος Τσιούλης',
      description: 'Είμαι full-stack developer με 4 έτη εμπειρίας, εξειδικευμένος στο οικοσύστημα της JavaScript/TypeScript, καθώς και frameworks όπως React, Vue, Angular, Astro, Express, Ts.ED. Ωραία η κάτω φωτογραφία; Εγώ την έβγαλα.',
      learnMore: 'Περισσότερα',
    },
    nav: {
      home: 'Αρχική',
      info: 'Πληροφορίες',
      contact: 'Επικοινωνία'
    },
    section: {
      skillset: {
        title: "Δεξιότητες & Γνώσεις",
        items: [
          { title: "Γλώσσες", description: "JavaScript, TypeScript, Python, C, C++, Rust" },
          { title: "Γλώσσες (ανρθώπινες)", description: "Greek, English, Japanese (N3)" },
          { title: "Frameworks και βιβλιοθήκες (FE)", description: "React/Next, Vue/Nuxt, Angular, Astro" },
          { title: "Frameworks και βιβλιοθήκες (BE)", description: "Express, Ts.ED, NestJS, MySQL, MongoDB, TypeORM" },
          { title: "Devops", description: "Basic Cloudflare literacy: Pages, Workers, Tunnels. VPS setup; certificate management." },
        ],
      },
      biography: {
        title: 'Βιογραφία.',
        items: [
          {
            date: 'Μάρτιος 2023',
            title: 'NamiComi (Open Beta)',
            href: 'https://namicomi.com',
            role: "Lead Frontend Developer"
          },
          {
            date: 'Φεβρουάριος 2023',
            title: 'Provollee',
            href: 'https://provollee.gr',
            role: "Website Developer"
          },
        ]
      },
      contact: {
        title: 'Eπικοινωνήστε μαζί μου',
      }
    },
  },
};

Object.freeze(ui)

export type Locale = keyof typeof ui
export type UI = typeof ui['en'] | typeof ui['gr']

export function translate<T extends DeepKeys<UI>>(locale: Locale, key: T, indexes: number[] = []): DeepPropertyType<UI, T> {
  let current: string | object = ui[locale]
  let lastIndex = 0
  
  key.split('.').forEach(deeperKey => {
    if (deeperKey === '[]') {
      // @ts-expect-error
      current = current[indexes[lastIndex]]

      lastIndex++
    } else {
      // @ts-expect-error
      current = current[deeperKey]
    }
  })

  return current as DeepPropertyType<UI, T>
}

export function getTranslationFunctionFromSetLocale(locale: Locale) {
  return <T extends DeepKeys<UI>>(key: T) => translate(locale, key)
}


