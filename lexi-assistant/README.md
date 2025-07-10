
# Lexisg-frontend-intern-test

> GitHub Link: [https://github.com/siyamregn777/Lexisg-frontend-intern-test.git](https://github.com/siyamregn777/Lexisg-frontend-intern-test.git)

screen recording link:  https://drive.google.com/file/d/1JXpoBVS2i8S8i_7FBXgrvLowtZWLeG14/view?usp=sharing
## 🚀 Features

- ✅ AI-powered legal question answering
- 📎 Proper citation formatting
- 📄 PDF document linking with paragraph reference
- 🌙 Dark/light mode toggle
- 📱 Fully responsive design
- 💬 Chat-style interface similar to ChatGPT

## 📦 Getting Started

### Step 1: Create App and Setup Tailwind

```bash
npx create-next-app@latest lexi-assistant --typescript
cd lexi-assistant
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
````

### Step 2: Install Required Packages

```bash
npm install openai
npm install react-pdf @react-pdf/renderer
npm install next-themes
```

### Step 3: Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧩 Additional UI Setup with Shadcn UI

Make sure you are inside the project folder:

```bash
cd lexi-assistant
```

Then run these commands to add UI components:

```bash
npx shadcn@latest init
npx shadcn@latest add sidebar
npx shadcn@latest add dropdown-menu
npx shadcn@latest add skeleton
npx shadcn@latest add textarea
npx shadcn@latest add button
```

---

## ✅ Prerequisites

* Node.js (v18 or later)
* npm (v9 or later)
* OpenAI API Key (optional for dynamic AI backend)

---

## 🧠 Notes

* The app uses a fake AI response from `/api/ask` for the frontend test.
* Citations open a PDF link and simulate paragraph highlighting.
* ReactMarkdown is used to format the assistant's messages cleanly.

---

## 🧪 Example Use

Ask:

> "In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of death, is the claimant entitled to an addition towards future prospects in computing compensation under Section 166 of the Motor Vehicles Act, 1988? If so, how much?"

It responds with:

> " Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased’s annual income should be added as future prospects"

---

## 📎 Citation Preview

Clicking the citation opens the PDF and it will scrolls to the relevant paragraph .

---

## 🧑‍💻 Author

**Siyamregn Yeshidagna**
📧 [siyamregnyeshidagna777@gmail.com](mailto:siyamregnyeshidagna777@gmail.com)
🔗 [GitHub Profile](https://github.com/siyamregn777)

---


# How citation linking was handled

## Citation Handling System

### 1. How Citations Work
Lexi provides verifiable legal references with:
- **Direct PDF linking** to source documents
- **Precise paragraph references**
- **Quoted text** from judgments(books or references)

### 2. Implementation Details

{
  answer: "Yes, under Section 166...",
  citation: {
    text: "10% of income should be awarded...",
    pdfUrl: "/Dani Vs Pritam (Future 10 at age 54-55).pdf#page=2",
    paragraph: "7"
  }
}


# 3. Key Features
# Feature	Implementation

```
One-click PDF access	target="_blank" links to /public/cases
Paragraph references	Displays "Para 7" with quoted text
Visual distinction	Italicized quotes + document icon
````

# UI Components

```
// Citation display component
{citation && (
  <div className="mt-4 border-t pt-4">
    <blockquote className="italic pl-4 border-l-4 border-gray-200">
      "{citation.text}"
    </blockquote>
    
    <div className="mt-3 flex items-center gap-2">
      <FileText className="w-4 h-4 text-gray-500" />
      <a href={citation.pdfUrl}
         target="_blank"
         className="text-blue-600 hover:underline">
        View Full Judgment
      </a>
      <span className="text-sm text-gray-500">
        (Scroll to Para {citation.paragraph})
      </span>
    </div>
  </div>
)}
```

# Workflow
1. User asks a legal question
2. Lexi processes the question
3. Lexi queries the API
4. API returns answer + citation
5. Lexi displays answer with citation and PDF link
6. User clicks on PDF 
