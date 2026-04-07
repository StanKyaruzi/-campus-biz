import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'products.json');
const usersPath = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize files if they don't exist
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([]));
}
if (!fs.existsSync(usersPath)) {
  fs.writeFileSync(usersPath, JSON.stringify([]));
}

// Product functions
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
    status: product.status || 'pending',
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

// User functions
export function getUsers() {
  const data = fs.readFileSync(usersPath, 'utf-8');
  return JSON.parse(data);
}

export function saveUsers(users: any[]) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

export function addUser(user: any) {
  const users = getUsers();
  const existing = users.find((u: any) => u.email === user.email);
  if (existing) return null;
  const newUser = { ...user, id: Date.now().toString(), role: 'user', createdAt: new Date().toISOString() };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function findUserByEmail(email: string) {
  const users = getUsers();
  return users.find((u: any) => u.email === email);
}