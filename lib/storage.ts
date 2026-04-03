import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data');

if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath);
}

export function getUsers() {
  const file = path.join(dataPath, 'users.json');
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

export function saveUser(user: any) {
  const users = getUsers();
  users.push(user);
  fs.writeFileSync(path.join(dataPath, 'users.json'), JSON.stringify(users, null, 2));
  return user;
}

export function findUserByEmail(email: string) {
  const users = getUsers();
  return users.find((u: any) => u.email === email);
}

export function findUserById(id: string) {
  const users = getUsers();
  return users.find((u: any) => u.id === id);
}

export function getProducts() {
  const file = path.join(dataPath, 'products.json');
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

export function saveProduct(product: any) {
  const products = getProducts();
  products.unshift(product);
  fs.writeFileSync(path.join(dataPath, 'products.json'), JSON.stringify(products, null, 2));
  return product;
}

export function updateProductStatus(id: string, status: string) {
  const products = getProducts();
  const index = products.findIndex((p: any) => p.id === id);
  if (index !== -1) {
    products[index].status = status;
    fs.writeFileSync(path.join(dataPath, 'products.json'), JSON.stringify(products, null, 2));
  }
}

export function deleteProduct(id: string) {
  const products = getProducts();
  const filtered = products.filter((p: any) => p.id !== id);
  fs.writeFileSync(path.join(dataPath, 'products.json'), JSON.stringify(filtered, null, 2));
}