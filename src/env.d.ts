/// <reference types="astro/client" />

// Starlight 0.42 ships as compiled JavaScript and no longer carries ambient
// declarations for its `virtual:starlight/*` modules. The component overrides
// in src/components/ import two of them, so declare them here for `astro check`.
declare module 'virtual:starlight/user-config' {
  const config: import('@astrojs/starlight/types').StarlightConfig;
  export default config;
}

declare module 'virtual:starlight/components/MobileMenuToggle' {
  const MobileMenuToggle: typeof import('@astrojs/starlight/components/MobileMenuToggle.astro').default;
  export default MobileMenuToggle;
}
