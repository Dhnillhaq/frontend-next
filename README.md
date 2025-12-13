# Production Management System - Frontend

Next.js web application untuk sistem manajemen produksi.

## 🚀 Live Demo

**Frontend URL**: https://frontend-next-production-7958.up.railway.app/

## 🛠️ Tech Stack

- **Next.js 14+** - React framework
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Railway** - Cloud hosting platform


## ✨ Features

- ✅ Dashboard produksi real-time
- ✅ CRUD Operations management
- ✅ Groups, Shifts, dan Production Lines management
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS

## 🚀 Local Development

### Setup

```bash
# Clone repository
git clone <frontend-repo-url>
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### Environment Variables

Buat file `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: Other configs
NEXT_PUBLIC_APP_NAME="Production Management"
```

**PENTING**: File `.env.local` tidak akan ter-commit (sudah ada di `.gitignore`)

### Run Development Server

```bash
# Start development server
npm run dev

# Server akan running di http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) di browser.

## 📋 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   ├── operations/        # Operations pages
│   ├── groups/            # Groups pages
│   └── ...
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── ...
├── lib/                   # Utilities & helpers
│   ├── api.js            # API client
│   └── ...
├── public/               # Static assets
├── .env.local           # Local environment variables
└── package.json
```

## 🔌 API Integration

### API Client Setup

```javascript
// lib/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  // Operations
  getOperations: async () => {
    const res = await fetch(`${API_URL}/operations`);
    return res.json();
  },
  
  createOperation: async (data) => {
    const res = await fetch(`${API_URL}/operations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  
  // Groups
  getGroups: async () => {
    const res = await fetch(`${API_URL}/groups`);
    return res.json();
  },
  
  // ... other API methods
};
```

### Usage in Components

```javascript
// app/operations/page.js
import { api } from '@/lib/api';

export default async function OperationsPage() {
  const operations = await api.fetchOperations();
  
  return (
    <div>
      {operations.data.map(op => (
        <div key={op.id}>{op.quality}</div>
      ))}
    </div>
  );
}
```

## 🎨 Styling with Tailwind CSS

Tailwind CSS sudah dikonfigurasi. Gunakan utility classes:

```jsx
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Submit
</button>
```

## 🌐 Deployment (Railway)

### Automatic Deployment

Setiap push ke branch `main` akan otomatis trigger deployment.

### Environment Variables di Railway

Set di Railway dashboard → Variables:

```env
NEXT_PUBLIC_API_URL=https://rest-express-production-0683.up.railway.app
```

### Build Configuration

Railway akan otomatis:
1. Run `npm install`
2. Run `npm run build`
3. Start server dengan `npm start`

## 🔧 Build Settings

### Railway Build Command
```bash
npm run build
```

### Railway Start Command
```bash
npm start
```

### Port Configuration
Next.js akan otomatis menggunakan `PORT` environment variable dari Railway.

## 📱 Responsive Design

Aplikasi fully responsive dengan breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🐛 Troubleshooting

### API Connection Issues

Cek environment variable:
```bash
echo $NEXT_PUBLIC_API_URL
```

Pastikan backend running dan accessible.

### Build Errors

Clear cache dan rebuild:
```bash
rm -rf .next
npm run build
```

### CORS Errors

Pastikan backend sudah set CORS dengan frontend URL kamu.

## 🔒 Environment Variables

### Development (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Production (Railway)
```env
NEXT_PUBLIC_API_URL=https://rest-express-production-0683.up.railway.app
```

**Note**: Variabel dengan prefix `NEXT_PUBLIC_` akan exposed ke browser.

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Railway Documentation](https://docs.railway.app)

## 🚀 Performance Tips

- Use Next.js Image component untuk optimized images
- Implement ISR (Incremental Static Regeneration) untuk data yang jarang berubah
- Use React Server Components untuk better performance
- Implement proper loading states

## 👨‍💻 Developer

Developed by Dhnillhaq


**Backend Repository**: [Link ke Backend Repo](https://github.com/Dhnillhaq/rest-express)
