
const productDetail = [
    {
      "image": ["image1.jpg", "image2.jpg"],
      "productName": "Samsung Galaxy S21",
      "price": 799.99,
      "salePrice": 749.99,
      "category": "Smartphone",
      "brand": "Samsung",
      "description": "The Samsung Galaxy S21 offers a stunning display, a powerful camera, and fast performance.",
      "totalStock": 100,
      "averageReview": 4.5
    },
    {
      "image": ["image3.jpg", "image4.jpg"],
      "productName": "Nike Air Max 270",
      "price": 150.00,
      "salePrice": 120.00,
      "category": "Footwear",
      "brand": "Nike",
      "description": "A stylish and comfortable sneaker perfect for both casual wear and workouts.",
      "totalStock": 200,
      "averageReview": 4.7
    },
    {
      "image": ["image5.jpg"],
      "productName": "Bose QuietComfort 35 II",
      "price": 299.99,
      "salePrice": 249.99,
      "category": "Electronics",
      "brand": "Bose",
      "description": "Noise-cancelling headphones that provide immersive sound and comfort.",
      "totalStock": 75,
      "averageReview": 4.8
    },
    {
      "image": ["image6.jpg"],
      "productName": "Sony PlayStation 5",
      "price": 499.99,
      "salePrice": 459.99,
      "category": "Gaming",
      "brand": "Sony",
      "description": "Experience next-gen gaming with the PlayStation 5's fast load times and stunning graphics.",
      "totalStock": 50,
      "averageReview": 4.9
    },
    {
      "image": ["image7.jpg", "image8.jpg"],
      "productName": "Apple MacBook Air (M1)",
      "price": 999.99,
      "salePrice": 949.99,
      "category": "Computers",
      "brand": "Apple",
      "description": "A powerful, thin, and lightweight laptop with Apple's M1 chip for exceptional performance.",
      "totalStock": 30,
      "averageReview": 4.6
    },
    {
      "image": ["image9.jpg", "image10.jpg"],
      "productName": "Fitbit Charge 5",
      "price": 129.95,
      "salePrice": 119.95,
      "category": "Fitness",
      "brand": "Fitbit",
      "description": "A sleek fitness tracker that monitors heart rate, sleep, and activity.",
      "totalStock": 150,
      "averageReview": 4.3
    },
    {
      "image": ["image11.jpg"],
      "productName": "Apple iPhone 13",
      "price": 899.99,
      "salePrice": 849.99,
      "category": "Smartphone",
      "brand": "Apple",
      "description": "The iPhone 13 features a high-quality camera, A15 chip, and excellent battery life.",
      "totalStock": 80,
      "averageReview": 4.7
    },
    {
      "image": ["image12.jpg", "image13.jpg"],
      "productName": "Levi's 501 Original Fit Jeans",
      "price": 59.99,
      "salePrice": 49.99,
      "category": "Clothing",
      "brand": "Levi's",
      "description": "Classic fit jeans with a timeless design that works with any casual outfit.",
      "totalStock": 120,
      "averageReview": 4.5
    },
    {
      "image": ["image14.jpg"],
      "productName": "Dyson V11 Torque Drive Vacuum",
      "price": 699.99,
      "salePrice": 649.99,
      "category": "Home Appliances",
      "brand": "Dyson",
      "description": "A powerful cordless vacuum with excellent suction for all floor types.",
      "totalStock": 40,
      "averageReview": 4.8
    },
    {
      "image": ["image15.jpg"],
      "productName": "Nintendo Switch OLED Model",
      "price": 349.99,
      "salePrice": 319.99,
      "category": "Gaming",
      "brand": "Nintendo",
      "description": "The Nintendo Switch OLED Model offers an enhanced handheld gaming experience with a vibrant screen.",
      "totalStock": 60,
      "averageReview": 4.6
    },
    {
      "image": ["image16.jpg"],
      "productName": "Herschel Little America Backpack",
      "price": 99.99,
      "salePrice": 89.99,
      "category": "Accessories",
      "brand": "Herschel",
      "description": "A stylish and durable backpack designed for everyday use, with a spacious interior.",
      "totalStock": 200,
      "averageReview": 4.4
    },
    {
      "image": ["image17.jpg"],
      "productName": "Canon EOS Rebel T7 DSLR Camera",
      "price": 499.99,
      "salePrice": 449.99,
      "category": "Electronics",
      "brand": "Canon",
      "description": "Capture high-quality images and videos with this beginner-friendly DSLR camera.",
      "totalStock": 30,
      "averageReview": 4.7
    },
    {
      "image": ["image18.jpg"],
      "productName": "Anker PowerCore 10000 Portable Charger",
      "price": 25.99,
      "salePrice": 19.99,
      "category": "Accessories",
      "brand": "Anker",
      "description": "Compact and lightweight portable charger for your devices, with fast charging capabilities.",
      "totalStock": 500,
      "averageReview": 4.5
    },
    {
      "image": ["image19.jpg"],
      "productName": "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
      "price": 89.99,
      "salePrice": 79.99,
      "category": "Home Appliances",
      "brand": "Instant Pot",
      "description": "A versatile kitchen appliance for quick and easy cooking of various dishes.",
      "totalStock": 100,
      "averageReview": 4.6
    },
    {
      "image": ["image20.jpg"],
      "productName": "Apple Watch Series 7",
      "price": 399.99,
      "salePrice": 369.99,
      "category": "Wearables",
      "brand": "Apple",
      "description": "A sleek smartwatch with advanced health tracking features, including ECG and blood oxygen monitoring.",
      "totalStock": 80,
      "averageReview": 4.8
    },
    {
      "image": ["image21.jpg"],
      "productName": "Keurig K-Elite Coffee Maker",
      "price": 129.99,
      "salePrice": 109.99,
      "category": "Home Appliances",
      "brand": "Keurig",
      "description": "A versatile coffee maker with a strong brew setting and iced coffee options.",
      "totalStock": 150,
      "averageReview": 4.4
    },
    {
      "image": ["image22.jpg"],
      "productName": "Philips Sonicare ProtectiveClean 6100 Electric Toothbrush",
      "price": 89.99,
      "salePrice": 79.99,
      "category": "Health & Personal Care",
      "brand": "Philips",
      "description": "An advanced electric toothbrush with pressure sensor and multiple cleaning modes.",
      "totalStock": 200,
      "averageReview": 4.7
    },
    {
      "image": ["image23.jpg"],
      "productName": "Vans Old Skool Sneakers",
      "price": 60.00,
      "salePrice": 55.00,
      "category": "Footwear",
      "brand": "Vans",
      "description": "Classic sneakers with a cool design that can match any streetwear look.",
      "totalStock": 150,
      "averageReview": 4.6
    },
    {
      "image": ["image24.jpg"],
      "productName": "Shure SM7B Microphone",
      "price": 399.00,
      "salePrice": 359.00,
      "category": "Electronics",
      "brand": "Shure",
      "description": "A dynamic microphone that is perfect for broadcasting, podcasting, and music recording.",
      "totalStock": 20,
      "averageReview": 4.8
    }
  ]
  

export default productDetail;
