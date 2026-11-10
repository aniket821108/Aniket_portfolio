require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Skill = require('../models/Skill');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

const projects = [
  {
    title: 'INDILEX — Indian Legal Event Extraction & LLM Benchmark',
    description:
      'End-to-end NLP pipeline extracting structured legal entities from 762+ Indian High Court judgments across 7 courts and 3 languages. Benchmarked 4 open-source LLMs (Qwen2.5, Gemma-2, DeepSeek-R1) using a 4E framework.',
    longDescription:
      'Engineered during research internship at IIT Patna. The pipeline automates legal event extraction from 762+ raw judgments across 7 High Courts in Hindi, Assamese, and English. Implemented intelligent document routing with a three-stage chunking pipeline for 50K+ character documents, vLLM tensor-parallel inference, and automated evaluation using Exact Match, Token F1, ROUGE, and BERTScore.',
    techStack: [
      'Python',
      'PyTorch',
      'HuggingFace',
      'Qwen2.5',
      'Gemma-2',
      'DeepSeek-R1',
      'vLLM',
      'NLP',
      'Information Extraction',
    ],
    category: 'ml',
    githubUrl: 'https://github.com/aniket821108/Indilex',
    featured: true,
    order: 1,
    status: 'Completed',
  },
  {
    title: 'Aerial Image Segmentation & Geospatial Analytics (Mizoram)',
    description:
      'Unsupervised Domain Adaptation (Urban to Rural) with DeepLabV3+ ResNet-50 and GDAL Geospatial Engine on LoveDA benchmark for terrain analysis in Mizoram, featuring Gemini 1.5 Flash Vision guardrails.',
    longDescription:
      'B.Tech Capstone Project at NIT Mizoram. Bridges urban-to-rural remote sensing domain gap using Class-Balanced Self-Training (CBST), achieving +19.3% relative mIoU surge. Features GDAL geospatial raster generation (8-bit GeoTIFF with color tables) calculating real-world surface area in hectares. Includes a full-stack MERN + Python web app with multimodal AI domain verification via Google Gemini 1.5 Flash Vision.',
    techStack: [
      'PyTorch',
      'DeepLabV3+',
      'GDAL',
      'ResNet-50',
      'Google Gemini AI',
      'React.js',
      'Flask',
      'OpenCV',
      'MongoDB',
    ],
    category: 'ml',
    githubUrl: 'https://github.com/aniket821108/Aerial-LandCover-Segmentation-Mizoram',
    featured: true,
    order: 2,
    status: 'Completed',
  },
  {
    title: 'E-Shop — AI Powered E-Commerce Platform',
    description:
      'MERN Stack e-commerce platform with microservices architecture. Integrated a Python-based ML churn prediction model into a Role-Based Admin Dashboard that flags at-risk customers in real-time.',
    longDescription:
      'A production-grade e-commerce platform built with a MERN microservices architecture. Features include product management, cart, order tracking, and a dedicated admin panel. The standout feature is the AI-powered churn prediction engine — a Python Flask microservice exposing a Scikit-Learn model that analyses user behaviour, purchase history, and engagement metrics to predict churn probability. The results surface in the admin dashboard as actionable alerts.',
    techStack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Redux',
      'Python',
      'Flask',
      'Scikit-Learn',
      'Tailwind CSS',
    ],
    category: 'fullstack',
    githubUrl: 'https://github.com/aniket821108/ecommerce-churn-prediction',
    featured: true,
    order: 3,
    status: 'Completed',
  },
  {
    title: 'Predictive Maintenance System',
    description:
      'ML pipeline classifying bearing health stages and estimating Remaining Useful Life (RUL) from time-series vibration sensor data, with a real-time monitoring dashboard and maintenance alerts.',
    longDescription:
      'An end-to-end predictive maintenance system developed during the ML internship at IIT Guwahati. Raw vibration sensor data is preprocessed with FFT-based feature extraction, statistical moments (RMS, kurtosis, skewness), and envelope analysis. Multi-class classifiers (XGBoost, Random Forest, SVM) detect four bearing health degradation stages. A separate regression model estimates RUL. Results are visualised in a Flask-powered real-time dashboard.',
    techStack: [
      'Python',
      'Scikit-Learn',
      'XGBoost',
      'Pandas',
      'NumPy',
      'SciPy',
      'Flask',
      'Matplotlib',
      'Seaborn',
    ],
    category: 'ml',
    githubUrl: 'https://github.com/aniket821108',
    featured: true,
    order: 4,
    status: 'Completed',
  },
];

const skills = [
  // Languages
  { name: 'Python', category: 'language', proficiency: 90, order: 1 },
  { name: 'JavaScript (ES6+)', category: 'language', proficiency: 88, order: 2 },
  { name: 'C++', category: 'language', proficiency: 85, order: 3 },

  // Web
  { name: 'React.js', category: 'web', proficiency: 88, order: 1 },
  { name: 'Node.js', category: 'web', proficiency: 85, order: 2 },
  { name: 'Express.js', category: 'web', proficiency: 85, order: 3 },
  { name: 'MongoDB', category: 'web', proficiency: 82, order: 4 },
  { name: 'Tailwind CSS', category: 'web', proficiency: 90, order: 5 },
  { name: 'Django', category: 'web', proficiency: 75, order: 6 },

  // ML
  { name: 'Scikit-Learn', category: 'ml', proficiency: 87, order: 1 },
  { name: 'Pandas', category: 'ml', proficiency: 90, order: 2 },
  { name: 'NumPy', category: 'ml', proficiency: 88, order: 3 },
  { name: 'XGBoost', category: 'ml', proficiency: 78, order: 4 },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Project.deleteMany();
    await Skill.deleteMany();
    console.log('Cleared existing data');

    await Project.insertMany(projects);
    await Skill.insertMany(skills);
    console.log(`✅ Seeded ${projects.length} projects and ${skills.length} skills`);

    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
