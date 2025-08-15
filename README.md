# 📦 ResizableDraggableBox

A reusable React component that lets users **drag** and **resize** a box from all 8 directions. Built with **TypeScript** and styled using **Tailwind CSS**.

---

## 🚀 Features

- ✅ Fully **draggable**
- ✅ **Resizable** from all sides and corners
- ✅ Customizable dimensions and positions
- ✅ Clean and reusable component
- ✅ No external dependencies (besides React)
- ✅ Written in TypeScript

---

## 📸 Demo

<!-- Add a screenshot or GIF here if you want -->
<!-- ![Demo](demo.gif) -->

---

## 📁 File Structure

components/
└── ResizableDraggableBox.tsx
pages/
└── index.tsx (example usage)


---

## 🧩 Usage

```tsx
import ResizableDraggableBox from "@/components/ResizableDraggableBox";

export default function Home() {
  return (
    <ResizableDraggableBox
      initialWidth={400}
      initialHeight={300}
      initialTop={100}
      initialLeft={150}
      minWidth={100}
      minHeight={100}
    >
      <p>This is a draggable and resizable box!</p>
    </ResizableDraggableBox>
  );
}

## 🧱 Installation

This component is self-contained. Just copy the `ResizableDraggableBox.tsx` file into your React project:

```bash
/components
  └── ResizableDraggableBox.tsx


---

### 2. Make sure Tailwind CSS is installed

This component uses Tailwind CSS utility classes.

If Tailwind is not already installed in your project, you can follow the official installation guide here:

👉 [Tailwind CSS Installation Guide](https://tailwindcss.com/docs/installation)

Quick install:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // adjust path to your project
  theme: {
    extend: {},
  },
  plugins: [],
};


/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;


---

Let me know if you'd like the `ResizableDraggableBox.tsx` source code included **in the README** itself (as a full inline code block), or if you want a version formatted for publishing on npm.

