"use client";

import { usePathname } from "next/navigation";
import React, { Fragment } from "react";

function Nav() {
  const pathname = usePathname();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const navigation = [
    { name: "Home", href: "/" },
    { name: "History", href: "/search-history" },
  ];

  return (
    <Fragment>
      <nav className="ps-4 mt-4 navbar navbar-expand-lg bg-light rounded">
        <a className="navbar-brand" href="#">
          InfoScraper :)
        </a>
        <div className="navbar-nav">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                pathname === item.href
                  ? "text-danger fw-bold text-decoration-underline"
                  : "text-success",
                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>
    </Fragment>
  );
}

export default Nav;
