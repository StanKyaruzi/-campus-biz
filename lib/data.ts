// Shared data storage - all APIs use this same file
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'products.json');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize file if it doesn't exist
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([]));
}

export function getProducts() {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

export function saveProducts(products: any[]) {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
}

export function addProduct(product: any) {
  const products = getProducts();
  const newProduct = {
    id: Date.now().toString(),
    ...product,
    createdAt: new Date().toISOString()
  };
  products.unshift(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: any) {
  const products = getProducts();
  const index = products.findIndex((p: any) => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
    return products[index];
  }
  return null;
}

export function deleteProduct(id: string) {
  const products = getProducts();
  const filtered = products.filter((p: any) => p.id !== id);
  saveProducts(filtered);
}