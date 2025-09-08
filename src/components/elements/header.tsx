"use client";

import * as React from "react"
import Link from "next/link"
import { ThemeToggleMenu } from "../theme/theme-toggle";
import { Button } from "../ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
]

interface HeaderProps {
  onNewSearch: () => void;
}

export function Header({ onNewSearch }: HeaderProps) {
  return (
    <header className="bg-card">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-4 lg:px-8">
            <div className="flex lg:flex-1 items-center gap-x-2">
                {/* <a href="#" className="-m-1.5 p-1.5">
                    <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=green&shade=600"
                    className="h-8 w-auto dark:hidden"
                    />
                    <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=green&shade=500"
                    className="hidden h-8 w-auto dark:block"
                    />
                </a> */}
                <a href="/">
                  <span className="font-bold text-xm">Breathe Easy</span>
                </a>
                
            </div>

             <div className="flex flex-1 items-center justify-end gap-x-6">
          {/* <button
            type="button"
            aria-label="Setup"
            className="p-2 rounded-full bg-muted hover:bg-primary/10 text-gray-900 dark:text-white"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('appStateChange', { detail: { state: 'setup' } }));
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button> */}
          {/* API Settings? */}
          <Button 
            onClick={() => {}}
          />

          {/* Search */}
          <Button
            onClick={onNewSearch}
          >
            Search
          </Button>

          <ThemeToggleMenu />
            </div>


        </nav>
        
    </header>
   
  )
}