import Link from "next/link";

const links = [
  { href: "/#topics", label: "Explore" },
  { href: "/#featured-products", label: "Shop" },
  { href: "/#news", label: "News" },
];

export default function NavBar() {
  return (
    <header className="bg-zinc-900 text-white">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <Link href="/" className="text-lg font-bold tracking-tight">
          Summit &amp; Stone
        </Link>
        <ul className="flex gap-4 sm:gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-zinc-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
