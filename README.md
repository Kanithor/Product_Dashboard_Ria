# Product Dashboard Ria Money Transfer
Technical test for Product Engineer DevOps role.

## Run app locally

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to see the page built for the test.

# Requested Software Details
This dashboard was developed to be useful for an internal stakeholder working on a sales company. The decisions made behind the main elements of the app are having in mind 3 pillars for better decision making: Money (Price), Inventory (Stock Quantity), and Quality (Ratings).

Here's the explanation of every section of the page and why it was built that way:
- A first row of 3 dynamic cards, showing info about the products listed on the table with what's more important for the stakeholder at first sight
    - Average price for the products.
    - A simple card counting the qty of products.
    - And finally a card showing qty products with low inventory stock.
- Second row, less important but to support first row, with searchbox to filter by product name, a price cap slider and a group of button to select every category or a single one.
- Third we have the main table, where products are listed following the filtering and sorting order, showing image, name, price, rating, category and units in stock. If you click a product, it will show a simple modal with more info.
## Features
[x] Modular component design architecture for readability, scalability and maintainability.

[x] Search, category and price filters all working in sync.

[x] Product detail drawer opens on row click.

[x] 3-Way sorting implemented on table headers (no sort, ascending & descending).

[x] Simple but yet proffesional UI.

[x] API Route exists at `/api/products` with fetched data.

[x] Dashboard UI at `/dashboard` with dynamic KPI cards.

[x] Next.js App Router structure used instead of Pages Router.
