'use client';

// React
import { useEffect, useState } from "react";
import * as React from "react";

// External Libraries
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = useState(false);

  // Only render the ThemeProvider on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // render children without the theme provider during SSR
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
