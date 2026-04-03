import fs from 'fs'; 
import path from 'path'; 
 
const dataFolder = path.join(process.cwd(), 'data'); 
if (!fs.existsSync(dataFolder)) fs.mkdirSync(dataFolder); 
 
export function getUsers() { 
  const filePath = path.join(dataFolder, 'users.json'); 
  if (!fs.existsSync(filePath)) return []; 
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')); 
} 
 
export function saveUser(user: any) { 
  const users = getUsers(); 
  users.push(user); 
  fs.writeFileSync(path.join(dataFolder, 'users.json'), JSON.stringify(users, null, 2)); 
  return user; 
} 
 
export function findUserByEmail(email: string) { 
  const users = getUsers(); 
  return users.find((u: any) = === email); 
} 
 
export function findUserById(id: string) { 
  const users = getUsers(); 
  return users.find((u: any) = === id); 
} 
 
export function getProducts() { 
  const filePath = path.join(dataFolder, 'products.json'); 
  if (!fs.existsSync(filePath)) return []; 
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')); 
} 
 
export function saveProduct(product: any) { 
  const products = getProducts(); 
  products.push(product); 
  fs.writeFileSync(path.join(dataFolder, 'products.json'), JSON.stringify(products, null, 2)); 
  return product; 
} 
 
export function updateProductStatus(id: string, status: string) { 
  const products = getProducts(); 
  const index = products.findIndex((p: any) = === id); 
  if (index !== -1) { 
    products[index].status = status; 
    fs.writeFileSync(path.join(dataFolder, 'products.json'), JSON.stringify(products, null, 2)); 
    return products[index]; 
  } 
  return null; 
} 
 
export function deleteProduct(id: string) { 
  const products = getProducts(); 
  const filtered = products.filter((p: any) = !== id); 
  fs.writeFileSync(path.join(dataFolder, 'products.json'), JSON.stringify(filtered, null, 2)); 
} 
