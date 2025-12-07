# Online-Selling-Platform

property-sales-platform/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── ConfirmDialog.jsx
│   │   │
│   │   ├── property/
│   │   │   ├── PropertyCard.jsx
│   │   │   ├── PropertyGrid.jsx
│   │   │   ├── PropertyDetails.jsx
│   │   │   ├── PropertyForm.jsx
│   │   │   ├── PropertyImageUploader.jsx
│   │   │   └── PropertyFilters.jsx
│   │   │
│   │   ├── admin/
│   │   │   ├── UserManagement.jsx
│   │   │   ├── PropertyManagement.jsx
│   │   │   └── AdminStats.jsx
│   │   │
│   │   ├── seller/
│   │   │   ├── MyProperties.jsx
│   │   │   ├── AddProperty.jsx
│   │   │   ├── EditProperty.jsx
│   │   │   └── SellerStats.jsx
│   │   │
│   │   └── buyer/
│   │       ├── FavoritesList.jsx
│   │       └── FavoriteButton.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── SellerDashboard.jsx
│   │   ├── PropertyDetailsPage.jsx
│   │   └── NotFound.jsx
│   │
│   ├── layouts/
│   │   ├── MainLayout.jsx
│   │   ├── DashboardLayout.jsx
│   │   └── AuthLayout.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useProperties.js
│   │   ├── useFavorites.js
│   │   └── useImageUpload.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── PropertyContext.jsx
│   │
│   ├── services/
│   │   ├── supabaseClient.js
│   │   ├── authService.js
│   │   ├── propertyService.js
│   │   ├── favoriteService.js
│   │   ├── userService.js
│   │   └── storageService.js
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── RoleBasedRoute.jsx
│   │
│   ├── styles/
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── custom.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env.example
├── .env.local
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md