/**
 * Weekly picks: what I'm into right now, with direct store links.
 *
 * To add a week, put a new entry at the TOP of `pickWeeks`. Each pick needs
 * a product page URL and a transparent product flat in public/picks. Make
 * one from any product photo with:
 *
 *   scripts/add-pick-image.sh <pick-id> <image-url>
 *
 * which cuts the background out and writes public/picks/<pick-id>.webp.
 */

export interface Pick {
  id: string;
  brand: string;
  name: string;
  /** USD. Shown in mono. */
  price: number;
  store: string;
  /** Product page. */
  href: string;
  image: string;
  /** One line on why. Optional. */
  note?: string;
}

export interface PickWeek {
  /** ISO date the week starts, e.g. "2026-11-02". */
  week: string;
  /** Optional theme line: "Brown season", "Things that fold". */
  title?: string;
  picks: Pick[];
}

export const pickWeeks: PickWeek[] = [
  {
    week: '2026-11-02',
    // Ordered so categories and colours alternate around the loop.
    picks: [
      {
        id: 'renee-renelle-leather-bomber',
        brand: 'Renee Renelle',
        name: 'Muddy Waters Leather Bomber, Gullah Tides V2',
        price: 650,
        store: 'rnernl.com',
        href: 'https://rnernl.com/products/pre-release-leather-bomber',
        image: '/picks/renee-renelle-leather-bomber.webp',
      },
      {
        id: 'cole-buxton-ruched-loafer',
        brand: 'Cole Buxton',
        name: 'Foldable Ruched Loafer',
        price: 250,
        store: 'colebuxton.com',
        href: 'https://www.colebuxton.com/products/cb-black-foldable-ruched-loafer-black-soj11-ezfl',
        image: '/picks/cole-buxton-loafer-pair.webp',
      },
      {
        id: 'spc-core-hoodie',
        brand: 'Science Project Co',
        name: 'Core Pullover Hoodie',
        price: 130,
        store: 'scienceprojectcompany.com',
        href: 'https://scienceprojectcompany.com/products/core-pullover-hoodie',
        image: '/picks/spc-core-hoodie.webp',
      },
      {
        id: 'drkshdw-creatch-cargo',
        brand: 'DRKSHDW by Rick Owens',
        name: 'Creatch Cargo Drawstring Pants',
        price: 726,
        store: 'FWRD',
        href: 'https://www.fwrd.com/product-drkshdw-by-rick-owens-creatch-cargo-drawstring-pants-in-black/DRKS-MP58/',
        image: '/picks/drkshdw-creatch-cargo.webp',
      },
      {
        id: 'sacai-carhartt-blouson',
        brand: 'Sacai x Carhartt WIP',
        name: 'Corduroy-Trimmed Blouson Jacket',
        price: 1605,
        store: 'Lyst',
        href: 'https://www.lyst.com/clothing/sacai-x-carhartt-corduroy-trimmed-blouson-jacket-1/',
        image: '/picks/sacai-carhartt-blouson.webp',
      },
      {
        id: 'spencer-badu-beanie',
        brand: 'Spencer Badu',
        name: 'Knitted Beanie in Multicolour',
        price: 105,
        store: 'spencerbadu.com',
        href: 'https://www.spencerbadu.com/en-us/products/knitted-beanie-in-multicolour',
        image: '/picks/spencer-badu-beanie.webp',
      },
      {
        id: 'balenciaga-venom-boot',
        brand: 'Balenciaga',
        name: 'Venom Boot, Brown',
        price: 2090,
        store: 'balenciaga.com',
        href: 'https://www.balenciaga.com/en-us/venom-boot-brown-814021487.html',
        image: '/picks/balenciaga-venom-boot.webp',
      },
      {
        id: 'paf-m66-short-parka',
        brand: 'Post Archive Faction',
        name: 'M66 Short Parka',
        price: 1000,
        store: 'postarchivefaction.com',
        href: 'https://postarchivefaction.com/products/f26-m66-short-parka-black',
        image: '/picks/paf-m66-short-parka.webp',
      },
    ],
  },
];

export const currentPicks = pickWeeks[0];

export function findPick(id: string): Pick | undefined {
  for (const w of pickWeeks) {
    const p = w.picks.find((x) => x.id === id);
    if (p) return p;
  }
  return undefined;
}

export const formatPrice = (usd: number) =>
  `$${usd.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

/** "WK 45 · NOV 2" */
export function weekLabel(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  const start = Date.UTC(d.getUTCFullYear(), 0, 1);
  const wk = Math.ceil(((d.getTime() - start) / 86400000 + new Date(start).getUTCDay() + 1) / 7);
  const md = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }).toUpperCase();
  return `WK ${wk} · ${md}`;
}
