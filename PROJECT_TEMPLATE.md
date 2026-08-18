# Portfolio Project Page Template

This document outlines the standardized layout and Tailwind CSS formatting for project pages (e.g., `avanade`, `bestmylife`, `omnireflex`). Use this structure when adding new case studies to ensure visual consistency across the portfolio. The design relies on a clean, minimalist typography system.

## 1. Page Wrapper & Navigation

Every project page should be wrapped in a `<main>` tag with a minimum height and bottom padding. The top navigation uses a mix-blend mode for the back button.

```tsx
<main ref={containerRef} className="relative min-h-screen bg-[#FAFAFA] pb-32">
  {/* Navigation */}
  <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 mix-blend-difference text-white pointer-events-none">
    {/* ... back button code ... */}
  </nav>
  
  {/* Rest of the content */}
</main>
```

## 2. Hero Header

The header contains the project category, title, subtitle, and a short description. 
- **Title (`h1`)**: `text-4xl md:text-5xl font-medium`
- **Subtitle (`h2`)**: `text-lg font-medium text-neutral-500 mt-4`

```tsx
<header className="pt-48 pb-16 px-6 md:px-12 lg:px-24">
  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
    <p className="text-lg font-medium text-neutral-500 mb-4">
      Category Name
    </p>
    <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900">
      Project Title
    </h1>
    <h2 className="text-lg font-medium text-neutral-500 mt-4 max-w-4xl leading-tight">
      Subtitle goes here.
    </h2>
    <p className="mt-6 text-lg text-neutral-500 font-normal max-w-2xl leading-relaxed">
      Brief description of the project.
    </p>
  </motion.div>
</header>
```

## 3. Hero Image Section

The hero image container uses a `16/9` aspect ratio on mobile, expanding to `21/9` on desktop (`md:aspect-[21/9]`). Ensure the `group` class is applied if using hover effects.
- **Margin Bottom**: `mb-24`

```tsx
<section className="px-6 md:px-12 lg:px-24 mb-24">
  <motion.div 
    className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-200 overflow-hidden border border-black/5 group"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
  >
    {/* Image content */}
  </motion.div>
</section>
```

## 4. Greeting ("Hey there!")

A centered highlight block providing a personal touch to the case study. 
- **Margin Bottom**: `mb-16`

```tsx
<section className="px-6 md:px-12 lg:px-24 mb-16 flex justify-center text-center">
  <div className="max-w-4xl p-8 md:p-12 border border-[YOUR_COLOR]/50 bg-[YOUR_COLOR]/20">
    <p className="text-lg font-normal text-neutral-900 leading-relaxed">
      <span className="font-medium text-neutral-500 block mb-4 text-lg">Hey there!</span>
      Your personal greeting text...
    </p>
  </div>
</section>
```

## 5. Metadata Grid

A 4-column grid (2 columns on mobile) displaying key project details.
- **Margin Bottom**: `mb-32`

```tsx
<section className="px-6 md:px-12 lg:px-24 mb-32">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-b border-black/5 py-12">
    <div>
      <h3 className="text-lg font-medium text-neutral-500 mb-2">Role</h3>
      <p className="text-lg font-normal text-neutral-900">Your Role</p>
    </div>
    <div>
      <h3 className="text-lg font-medium text-neutral-500 mb-2">Timeline</h3>
      <p className="text-lg font-normal text-neutral-900">Date Range</p>
    </div>
    <div>
      <h3 className="text-lg font-medium text-neutral-500 mb-2">Team</h3>
      <p className="text-lg font-normal text-neutral-900">Team Details</p>
    </div>
    <div>
      <h3 className="text-lg font-medium text-neutral-500 mb-2">Client</h3>
      <p className="text-lg font-normal text-neutral-900">Client Name</p>
    </div>
  </div>
</section>
```

## 6. Long-form Content & Table of Contents (TOC)

The main body of the case study. The wrapper is a flex container that separates the sticky TOC from the scrolling content.

### Wrapper & TOC Sidebar
- **TOC Title**: "Contents"
- Ensure `href` links match the `id` of the content divs. No uppercase text.

```tsx
<section className="px-6 md:px-12 lg:px-24 mb-32 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
  {/* Sticky TOC */}
  <aside className="lg:w-1/4 hidden lg:block">
    <div className="sticky top-32">
      <h4 className="text-lg font-medium text-neutral-900 mb-4">Contents</h4>
      <ul className="space-y-3 text-lg font-normal text-neutral-500">
        <li><a href="#section-1" className="hover:text-neutral-900 transition-colors">Section One</a></li>
        <li><a href="#section-2" className="hover:text-neutral-900 transition-colors">Section Two</a></li>
      </ul>
    </div>
  </aside>

  {/* Main Content Area */}
  <div className="lg:w-3/4 max-w-4xl">
    {/* Content Sections Go Here */}
  </div>
</section>
```

### Content Sections (Inside Main Area)
- **Section Spacing**: `mb-20`. We rely entirely on whitespace, removing heavy borders between sections.
- **Heading Format**: `<h2 className="text-2xl font-medium text-neutral-900 mb-6">`
- **Body Text**: `<div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">`
- **Subheadings**: `<h3 className="text-lg font-medium text-neutral-900 mb-2">`

```tsx
{/* Standard Section */}
<div id="section-1" className="mb-20">
  <h2 className="text-2xl font-medium text-neutral-900 mb-6">
    Section One
  </h2>
  <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
    <p>Content goes here...</p>

    {/* Example Subheading inside content */}
    <div>
      <h3 className="text-lg font-medium text-neutral-900 mb-2">Key Feature</h3>
      <p>Explanation of the feature...</p>
    </div>
  </div>
</div>
```

## 7. Next Project CTA

The bottom section that links to two other projects.

```tsx
<section className="px-6 md:px-12 lg:px-24 pt-32 pb-32">
  <p className="text-lg font-medium text-neutral-500 mb-16 text-center">
    More Projects
  </p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 text-center">
    <Link href="/projects/other-project" className="group flex flex-col items-center cursor-pointer">
      <h2 className="text-2xl font-medium text-neutral-900 group-hover:text-neutral-500 transition-colors">
        Project Name
      </h2>
      {/* MagneticButton Code */}
    </Link>
  </div>
</section>
```
