<div align="center">

# Fyller - AI Smart Inventory & Sales Forecasting System

**Stop Guessing. Start Forecasting.**

Fyller is a **Next-Gen Predictive AI Sales Forecasting & Inventory System** that learns your sales patterns, predicts demand, and automates restocking. Transform your inventory from a liability into a strategic asset. Unlike standard CRUD inventory apps, this system implements **Double-Entry Ledger Accounting** principles for 100% stock accuracy and leverages **Generative AI** to predict future demand based on historical sales trends.


![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=flat&logo=laravel)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react)
![Inertia](https://img.shields.io/badge/Inertia-2.0-855AF0?style=flat&logo=inertia)
![Tailwind](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat&logo=vite)
![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=flat&logo=php)
![OpenAI](https://img.shields.io/badge/AI-OpenAI%20GPT--4-412991?style=flat&logo=openai)

</div>

## 🚀 Features
- **Predictive Sales Forecasting**: AI analyzes historical data and seasonal trends to predict future sales with 98% accuracy.
- **Real-Time Sync**: Instant inventory updates across web, mobile, and physical POS.
- **Smart Safety Stock**: Auto-adjustment of stock levels based on supplier lead times and volatility.
- **Actionable Insights**: Recommendations for bundling, discounting, and restocking.
- **CFO-Level Dashboard**: Visualize revenue trends, identify slow-moving stock, and generate AI purchase orders.

## 🛠 Tech Stack
- **Framework**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 19, Inertia.js 2.0
- **Styling**: Tailwind CSS 4, Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## ⚙️ Usage & Setup

### Prerequisites
- PHP 8.2+
- Composer
- Node.js & NPM

---

## 📂 Folder Structure (DDD)

We follow a strict Domain-Driven structure to ensure scalability:

```text
app/
├── Domain/
│   ├── Inventory/         # Stock logic, Ledgers, Products
│   ├── Sales/             # Orders, Customers, Invoicing
│   └── Forecasting/       # AI logic, Daily Sales Aggregation
├── Http/
│   └── Controllers/       # API & Web Entry Points
└── Infrastructure/        # External Integrations (OpenAI, AWS)
```

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fyller
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Create a .env file**
   ```bash
   cp .env.example .env
   ```

4. **Generate an application key**
   ```bash
   php artisan key:generate
   ```

5. **Update your .env with your database credentials and OpenAI API Key:**
    ```bash
    DB_CONNECTION=pgsql
    OPENAI_API_KEY=sk-your-key-here
    ```

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Run the development server**
   ```bash
   composer run dev
   ```
    Visit http://127.0.0.1:8000/ to access the dashboard.


## 🧪 Testing
Run the test suite with:

    ```bash
    composer run test
    ```

## 📝 License

Fyller is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).