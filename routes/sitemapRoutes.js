const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const PujaOffering = require('../models/PujaOffering');
const Service = require('../models/Service');

const SITE_URL = 'https://acharya-ji.com'; // Adjust to your production URL

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}, 'slug updatedAt');
    const pujas = await PujaOffering.find({}, 'slug updatedAt');
    const services = await Service.find({}, 'slug updatedAt');

    const staticPages = [
      '',
      '/about',
      '/pujaServices',
      '/pujaServices/bookPuja',
      '/career',
      '/media',
      '/gallery',
      '/blog',
      '/contact',
      '/astrologer',
      '/kundli',
      '/reiki-healing',
      '/crystal-healing',
      '/vastu-consultation',
      '/shop-puja-samagri'
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add Static Pages
    staticPages.forEach(page => {
      xml += `
  <url>
    <loc>${SITE_URL}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    // Add Dynamic Blogs
    blogs.forEach(blog => {
      xml += `
  <url>
    <loc>${SITE_URL}/blog/${blog.slug}</loc>
    <lastmod>${blog.updatedAt.toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Add Dynamic Pujas
    pujas.forEach(puja => {
      xml += `
  <url>
    <loc>${SITE_URL}/puja/${puja.slug}</loc>
    <lastmod>${puja.updatedAt.toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    // Add Dynamic Services
    services.forEach(service => {
        xml += `
    <url>
      <loc>${SITE_URL}/service/${service.slug}</loc>
      <lastmod>${service.updatedAt.toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`;
      });

    xml += `
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;
