# 🚗 Rentcar App

A modern, full-featured car rental application built with cutting-edge web technologies. Browse, filter, and reserve vehicles seamlessly with an intuitive user interface and robust backend integration.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Available Scripts](#available-scripts)
- [Routes](#routes)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Contributing](#contributing)

---

## Overview

**Rentcar App** is a professional car rental platform that demonstrates modern full-stack web development practices. It provides a complete user experience for discovering and booking vehicles while incorporating best practices for performance, type safety, and maintainability.

The application leverages a **public REST API** to deliver real-time vehicle data: [Car Rental API](https://car-rental-api.goit.global/api-docs/)

---

## Features

### 🔍 Advanced Filtering System

- **Brand filtering** with All Brands reset option
- **Price range filtering** (hourly rates)
- **Mileage filtering** (from/to) with flexible input formats

### 📋 Comprehensive Catalog

- Paginated vehicle listing (backend-powered)
- Infinite scroll with "Load More" functionality
- Real-time search with combined filter parameters
- URL parameter synchronization for shareable links

### ❤️ Favorites Management

- Add/remove vehicles to personal wishlist
- Persistent state using Zustand
- Seamless UX with instant feedback

### 📄 Detailed Vehicle Information

- High-quality imagery
- Complete vehicle specifications
- Integrated booking form
- Professional presentation

### 🎯 User Experience

- Responsive design
- Type-safe operations
- Input validation
- Error handling
- Optimized performance

---

## Tech Stack

| Category             | Technology                   |
| -------------------- | ---------------------------- |
| **Framework**        | Next.js 16.0.4 (App Router)  |
| **Language**         | TypeScript 5                 |
| **Frontend**         | React 19.2.0                 |
| **State Management** | Zustand 5.0.8                |
| **HTTP Client**      | Axios 1.13.2                 |
| **Data Fetching**    | TanStack React Query 5.90.11 |
| **Styling**          | CSS Modules                  |
| **Pagination**       | React Paginate 8.3.0         |
| **Linting**          | ESLint 9                     |
| **Code Formatting**  | Prettier 3.6.2               |

---

## Project Structure

```
rentcar-app/
├── app/                          # Next.js App Router
│   ├── catalog/
│   │   ├── page.tsx              # Server-side catalog page
│   │   ├── CatalogClient.tsx      # Client-side catalog logic
│   │   ├── [id]/
│   │   │   └── page.tsx           # Vehicle details page
│   │   └── *.module.css           # Catalog styles
│   ├── components/                # Reusable UI components
│   │   ├── BookingForm/           # Reservation form
│   │   ├── CarDetails/            # Vehicle information display
│   │   ├── FilterBar/             # Advanced filtering UI
│   │   ├── Header/                # Navigation header
│   │   ├── Hero/                  # Landing hero section
│   │   ├── Loader/                # Loading indicator
│   │   └── Pagination/            # Pagination controls
│   ├── services/
│   │   ├── api.ts                 # API client functions
│   │   └── carsData.ts            # Data processing utilities
│   ├── store/
│   │   └── useCarsStore.ts        # Zustand store (favorites)
│   ├── types/
│   │   ├── car.ts                 # Vehicle type definitions
│   │   └── pagination.ts          # Pagination types
│   ├── utils/                     # Helper functions
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── globals.css                # Global styles
│   └── loading.tsx                # Loading UI
├── public/                        # Static assets
│   └── images/
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── README.md
```

---

## Installation & Setup

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager

### 1. Clone the Repository

```bash
git clone <repository-url>
cd rentcar-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the project root (if needed for custom API endpoints):

```env
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.global
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start development server with hot reload |
| `npm run build` | Build for production                     |
| `npm start`     | Run production server                    |
| `npm run lint`  | Run ESLint to check code quality         |

---

## Routes

| Route           | Component           | Description                                          |
| --------------- | ------------------- | ---------------------------------------------------- |
| `/`             | `page.tsx`          | Landing page with hero section and CTA               |
| `/catalog`      | `CatalogClient.tsx` | Vehicle catalog with filters, search, and pagination |
| `/catalog/[id]` | `[id]/page.tsx`     | Individual vehicle details with booking form         |

---

## API Integration

### Base URL

```
https://car-rental-api.goit.global
```

### Key Endpoints

**Get All Vehicles**

```
GET /cars?page=1&limit=12
```

**Get Vehicle by ID**

```
GET /cars/:id
```

**Available Filters (Query Parameters)**

- `brand` - Filter by manufacturer
- `price` - Filter by hourly rental rate
- `mileageFrom` - Minimum mileage
- `mileageTo` - Maximum mileage
- `page` - Pagination page number
- `limit` - Items per page

For full API documentation, visit: [API Docs](https://car-rental-api.goit.global/api-docs/)

---

## State Management

### Zustand Store (`useCarsStore.ts`)

Manages the global state for user's favorite vehicles:

```typescript
// Add/remove from favorites
const { toggleFavorite, favorites } = useCarsStore();
```

**Advantages:**

- Lightweight and performant
- Simple API
- TypeScript support
- Minimal boilerplate

---

## Code Organization

### Services (`services/api.ts`)

- Centralized API calls using Axios
- Reusable query functions
- Error handling
- Request/response interceptors

### Components

- Modular and reusable UI components
- CSS Modules for scoped styling
- Component-level state with React hooks
- Server and Client components

### Type Safety

- Comprehensive TypeScript types
- Strict type checking
- Better IDE support and autocompletion

---

## Development Workflow

### Best Practices

1. **Use TypeScript** - Leverage strict type checking
2. **CSS Modules** - Avoid global CSS conflicts
3. **Server Components** - Optimize with Next.js app router
4. **Client Components** - Use `'use client'` directive when needed
5. **API Abstraction** - Keep API calls in services layer

### Code Quality

- **ESLint** - Enforce consistent code style
- **Prettier** - Automatic code formatting
- **TypeScript** - Static type checking

---

## Future Enhancements

- [ ] User authentication and profile management
- [ ] Complete booking workflow with payment integration
- [ ] Real-time vehicle availability tracking
- [ ] User reviews and ratings system
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Email notifications

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow existing code style
- Ensure all tests pass
- Update documentation as needed
- Use meaningful commit messages

---

## License

This project is open source and available under the MIT License.
