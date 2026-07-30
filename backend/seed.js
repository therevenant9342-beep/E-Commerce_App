import mongoose from 'mongoose';
import fs from 'fs/promises';
import { productModel } from './db/models/product.model.js';

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce_db');
    
    const data = await fs.readFile('./products.json', 'utf-8');
    const products = JSON.parse(data);
    
    const formattedProducts = products.map(item => ({
        title: item.title,
        description: item.description,
        price: item.price,
        stock: 50,
        category: item.category,
        image: item.image
    }));

    await productModel.deleteMany({});
    await productModel.insertMany(formattedProducts);
    
    console.log('Database seeded successfully from local file');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

seedDatabase();