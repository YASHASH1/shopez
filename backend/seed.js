const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const Product = require('./models/Product');
const Category = require('./models/Category');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

        // Clear existing data
        await Product.deleteMany();
        await Category.deleteMany();
        await User.deleteMany();
        console.log('Cleared existing data.');

        // Fetch 100 products from DummyJSON
        console.log('Fetching 100 products from DummyJSON...');
        const { data } = await axios.get('https://dummyjson.com/products?limit=100');
        const dummyProducts = data.products;

        // Extract unique categories
        const uniqueCategoryNames = [...new Set(dummyProducts.map(p => p.category))];

        // Robust mapping using EXACT lowercase keys from the API
        const categoryImages = {
            'beauty': 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=800',
            'fragrances': 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
            'furniture': 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800',
            'groceries': 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800',
            'home-decoration': 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800',
            'kitchen-accessories': 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
            'laptops': 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
            'mens-shirts': 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800',
            'mens-shoes': 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
            'mens-watches': 'https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=800',
            'mobile-accessories': 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
            'motorbikes': 'https://images.pexels.com/photos/2116491/pexels-photo-2116491.jpeg?auto=compress&cs=tinysrgb&w=800',
            'skin-care': 'https://images.pexels.com/photos/3762882/pexels-photo-3762882.jpeg?auto=compress&cs=tinysrgb&w=800',
            'smartphones': 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800',
            'sports-accessories': 'https://images.pexels.com/photos/3625441/pexels-photo-3625441.jpeg?auto=compress&cs=tinysrgb&w=800',
            'sunglasses': 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=800',
            'tablets': 'https://images.pexels.com/photos/106344/pexels-photo-106344.jpeg?auto=compress&cs=tinysrgb&w=800',
            'tops': 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=800',
            'vehicle': 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
            'womens-bags': 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
            'womens-dresses': 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800',
            'womens-jewellery': 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=800',
            'womens-shoes': 'https://images.pexels.com/photos/3389419/pexels-photo-3389419.jpeg?auto=compress&cs=tinysrgb&w=800',
            'womens-watches': 'https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg?auto=compress&cs=tinysrgb&w=800'
        };

        const categories = uniqueCategoryNames.map(name => {
            return {
                name: name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                image: categoryImages[name] || 'https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg?auto=compress&cs=tinysrgb&w=800'
            };
        });

        await Category.insertMany(categories);
        console.log(`Added ${categories.length} categories.`);

        // Format and insert products
        const productsToInsert = dummyProducts.map(p => ({
            name: p.title,
            description: p.description,
            price: p.price,
            image: p.thumbnail,
            images: p.images || [],
            category: p.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            brand: p.brand || 'Unbranded',
            returnPolicy: p.returnPolicy || '14 Days Return',
            stock: p.stock,
            rating: p.rating,
            numReviews: p.reviews ? p.reviews.length : (Math.floor(Math.random() * 20) + 5),
            reviews: p.reviews ? p.reviews.map(r => ({
                rating: r.rating,
                comment: r.comment,
                date: new Date(r.date),
                reviewerName: r.reviewerName,
                reviewerEmail: r.reviewerEmail
            })) : []
        }));

        await Product.insertMany(productsToInsert);
        console.log(`Added ${productsToInsert.length} products to the database.`);

        // Add Admin User
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', salt);
        await User.create({
            name: 'Admin User',
            email: 'admin@shopez.com',
            password: adminPassword,
            role: 'admin'
        });
        console.log('Admin user created (admin@shopez.com / admin123)!');

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (err) {
        console.error('Error seeding data:', err.message);
        process.exit(1);
    }
};

seedData();
