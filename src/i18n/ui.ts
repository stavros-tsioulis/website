export type DeepKeys<T> = T extends (infer U)[]
  ? U extends object
    // @ts-expect-error
    ? `[].${DeepKeys<U>}` | '[]'
    : '[]'
  : T extends object
    ? {
      [K in keyof T]: T[K] extends object
      // @ts-expect-error
      ? `${K}.${DeepKeys<T[K]>}` | `${K}`
      : K
    }[keyof T]
  : never

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
            // @ts-expect-error we are sure that DeepPropertyType<T, FirstKey> is an array
            ? DeepPropertyType<T, FirstKey>[number]
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
      description: 'I am a full-stack developer with 3 years of experience, specialized in the JavaScript/TypeScript ecosystem, as well as frameworks like React, Vue, Astro, Express, Ts.ED.',
      learnMore: 'More',
    },
    nav: {
      home: 'Home',
      biography: 'Biο',
      contact: 'Contact'
    },
    section: {
      experience: {
        title: 'Experience',
        items: {
          security: {
            title: 'Securtity',
            description: 'The security of a web application is the most important factor I take into consideration during the programming process.'
          },
          speed: {
            title: 'Speed',
            description: 'Speed makes a website stand out in use. I learn the latest methods of optimizing the speed of loading and execution of a page\'s code every day.'
          },
          easeOfUse: {
            title: 'Ease of use',
            description: 'The practice I follow when designing websites is to put myself in the shoes of a user using different devices and usage conditions, covering the widest possible range of usage of the solutions I build, avoiding the tunnel-vision that is created.'
          },
          support: {
            title: 'Support',
            description: 'Especially for a web application, maintenance can be the most costly factor. I make sure my code is clean and easy to read to minimize maintenance costs.'
          }
        }
      },
      biography: {
        title: 'Biography',
        items: [
          {
            date: 'February 2023',
            title: 'Provollee',
            href: 'https://provollee.gr',
          },
          {
            date: 'March 2023',
            title: 'NamiComi (Open Beta)',
            href: 'https://namicomi.com',
          }
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
      description: 'Είμαι full-stack developer με 3 έτη εμπειρίας, εξειδικευμένος στο οικοσύστημα της JavaScript/TypeScript, καθώς και frameworks όπως React, Vue, Astro, Express, Ts.ED.',
      learnMore: 'Περισσότερα',
    },
    nav: {
      home: 'Αρχική',
      biography: 'Βιογραφία',
      contact: 'Επικοινωνία'
    },
    section: {
      experience: {
        title: 'Εμπειρία',
        items: {
          security: {
            title: 'Ασφάλεια',
            description: 'Η ασφάλεια μιας διαδικτυακής εφαρμογής είναι ο πιο σημαντικός παράγοντας που λαμβάνω υπόψιν κατά την διαδικασία του προγραμματισμού.'
          },
          speed: {
            title: 'Ταχύτητα',
            description: 'Η ταχύτητα κάνει μια ιστοσελίδα να ξεχωρίζει στη χρήση. Μαθαίνω καθημερινά τις πιο πρόσφατες μεθόδους βελτιστοποίησης της ταχύτητας φόρτωσης και εκτέλεσης του κώδικα μιας σελίδας.'
          },
          easeOfUse: {
            title: 'Ευκολία',
            description: 'Η πρακτική που ακολουθώ όταν σχεδιάζω ιστοσελίδες είναι να μπαίνω στη θέση ενός χρήστη χρησιμοποιώντας διάφορες συσκευές και συνθήκες χρήσης, καλύπτοντας το όσο το δυνατόν μεγαλύτερο εύρος χρήσης των λύσεων που φτιάχνω, αποφεύγοντας το tunnel-vision που δημιουργείται.'
          },
          support: {
            title: 'Συντήρηση',
            description: 'Ειδικότερα για μια διαδικτυακή εφαρμογή, η συντήρηση μπορεί να γίνει ο παράγοντας με το μεγαλύτερο κόστος. Φροντίζω ο κώδικάς μου να είναι καθαρός και εύκολος στην ανάγνωση για να ελαχιστοποιήσουν το κόστος συντήρησης.'
          }
        }
      },
      biography: {
        title: 'Βιογραφία.',
        items: [
          {
            date: 'Φεβρουάριος 2023',
            title: 'Provollee',
            href: 'https://provollee.gr',
          },
          {
            date: 'Μάρτιος 2023',
            title: 'NamiComi (Open Beta)',
            href: 'https://namicomi.com',
          }
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


