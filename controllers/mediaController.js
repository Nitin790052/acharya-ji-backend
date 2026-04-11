const Media = require('../models/Media');
const MediaSettings = require('../models/MediaSettings');
const fs = require('fs');
const path = require('path');
const axios = require('axios'); // We'll assume axios is available or use fetch if on node 18+

exports.getAllMedia = async (req, res) => {
    try {
        const media = await Media.find().sort({ createdAt: -1 });
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching media', error: error.message });
    }
};

exports.getMediaByType = async (req, res) => {
    try {
        const { type } = req.params;
        const media = await Media.find({ type }).sort({ createdAt: -1 });
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching media by type', error: error.message });
    }
};

exports.createMedia = async (req, res) => {
    try {
        const mediaData = { ...req.body };
        
        if (req.files) {
            if (req.files.image && req.files.image[0]) {
                mediaData.image = `/uploads/media/${req.files.image[0].filename}`;
            }
            if (req.files.video && req.files.video[0]) {
                mediaData.video = `/uploads/media/${req.files.video[0].filename}`;
            }
        }

        const newMedia = new Media(mediaData);
        await newMedia.save();
        res.status(201).json({ message: 'Media created successfully', media: newMedia });
    } catch (error) {
        res.status(500).json({ message: 'Error creating media', error: error.message });
    }
};

exports.updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        if (req.files) {
            const existingMedia = await Media.findById(id);
            if (!existingMedia) return res.status(404).json({ message: 'Media not found' });

            if (req.files.image && req.files.image[0]) {
                updates.image = `/uploads/media/${req.files.image[0].filename}`;
                // Delete old image
                if (existingMedia.image && existingMedia.image.startsWith('/uploads/')) {
                    const oldPath = path.join(__dirname, '..', existingMedia.image);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
            }

            if (req.files.video && req.files.video[0]) {
                updates.video = `/uploads/media/${req.files.video[0].filename}`;
                // Delete old video
                if (existingMedia.video && existingMedia.video.startsWith('/uploads/')) {
                    const oldPath = path.join(__dirname, '..', existingMedia.video);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
            }
        }

        const updatedMedia = await Media.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedMedia) {
            return res.status(404).json({ message: 'Media not found' });
        }

        res.status(200).json({ message: 'Media updated successfully', media: updatedMedia });
    } catch (error) {
        res.status(500).json({ message: 'Error updating media', error: error.message });
    }
};

exports.deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await Media.findById(id);

        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }

        if (media.image && media.image.startsWith('/uploads/')) {
            const pathP = path.join(__dirname, '..', media.image);
            if (fs.existsSync(pathP)) fs.unlinkSync(pathP);
        }
        if (media.video && media.video.startsWith('/uploads/')) {
            const pathV = path.join(__dirname, '..', media.video);
            if (fs.existsSync(pathV)) fs.unlinkSync(pathV);
        }

        await Media.findByIdAndDelete(id);
        res.status(200).json({ message: 'Media deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting media', error: error.message });
    }
};

exports.seedMedia = async (req, res) => {
    try {
        await Media.deleteMany();
        const sampleMedia = [
            // NEWS
            {
                type: 'news',
                title: 'Acharya Ji Explains Importance of Navgraha Shanti',
                excerpt: 'Leading astrologer shares insights on planetary remedies and their significance in modern times.',
                publication: 'Spiritual Times',
                date: '15 Dec 2024',
                image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
                link: '#'
            },
            {
                type: 'news',
                title: 'Vastu Remedies for Modern Homes - Expert Opinion',
                excerpt: 'Practical Vastu solutions for contemporary living spaces without major renovations.',
                publication: 'Home & Living Magazine',
                date: '3 Jan 2025',
                image: 'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?w=800&q=80',
                link: '#'
            },
            {
                type: 'news',
                title: 'Ancient Wisdom Meets Modern Astrology',
                excerpt: 'How traditional Vedic practices are helping people navigate contemporary challenges.',
                publication: 'Daily Dharma',
                date: '28 Nov 2024',
                image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
                link: '#'
            },
            // VIDEOS
            {
                type: 'video',
                title: 'Understanding Shani Sade Sati - Complete Guide',
                duration: '12:45',
                views: '25K',
                date: '10 Jan 2025',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
                videoId: 'dQw4w9WgXcQ'
            },
            {
                type: 'video',
                title: 'Navratri Puja Vidhi - Step by Step',
                duration: '18:30',
                views: '42K',
                date: '5 Oct 2024',
                image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1a4a0f5?w=800&q=80',
                videoId: 'dQw4w9WgXcQ'
            },
            {
                type: 'video',
                title: 'Career Astrology Q&A Session',
                duration: '22:15',
                views: '18K',
                date: '20 Dec 2024',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
                videoId: 'dQw4w9WgXcQ'
            },
            // EVENTS
            {
                type: 'event',
                title: 'Vedic Astrology Workshop - Delhi',
                location: 'Connaught Place, New Delhi',
                date: '18 Nov 2024',
                attendees: '200+',
                description: 'Two-day intensive workshop on Vedic astrology fundamentals and practical applications.',
                image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80'
            },
            {
                type: 'event',
                title: 'Maha Shivaratri Special Seminar',
                location: 'Community Hall, Dwarka',
                date: '8 Mar 2024',
                attendees: '350+',
                description: 'Special discourse on significance of Maha Shivaratri and powerful remedies.',
                image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80'
            },
            // AWARDS
            {
                type: 'award',
                title: 'Best Vedic Astrologer Award 2024',
                organization: 'Indian Astrology Council',
                year: '2024',
                image: 'https://images.unsplash.com/photo-1578574515323-c3c8ef01456e?w=800&q=80'
            },
            {
                type: 'award',
                title: 'Excellence in Traditional Knowledge',
                organization: 'Spiritual Leaders Forum',
                year: '2023',
                image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=800&q=80'
            },
            // SOCIAL
            {
                type: 'social',
                platform: 'instagram',
                title: 'Daily Astrology Tips',
                engagement: '15K likes',
                date: '2 days ago',
                image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80'
            },
            {
                type: 'social',
                platform: 'youtube',
                title: 'Remedies for Mercury Retrograde',
                engagement: '8K views',
                date: '1 week ago',
                image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80'
            }
        ];
        await Media.insertMany(sampleMedia);

        // Seed default stats
        await MediaSettings.deleteMany();
        const defaultStats = [
            { value: '50K+', label: 'Subscribers', iconType: 'youtube' },
            { value: '35K+', label: 'Followers', iconType: 'instagram' },
            { value: '100+', label: 'Features', iconType: 'newspaper' },
            { value: '25+', label: 'Public Events', iconType: 'users' }
        ];
        const defaultCTA = {
            badge: 'SPIRITUAL CONNECTION',
            title: 'EXPERIENCE THE',
            titleHighlight: 'DIVINE GRACE',
            description: "Join Acharya Ji's spiritual family and discover the profound impact of authentic Vedic rituals and divine guidance in your life.",
            primaryBtnText: 'Book Sacred Puja',
            primaryBtnLink: '/puja/online',
            secondaryBtnText: 'Professional Consultation',
            secondaryBtnLink: '/talk-to-astrologer'
        };
        const newSettings = new MediaSettings({ stats: defaultStats, cta: defaultCTA });
        await newSettings.save();

        res.status(201).json({ message: 'Media and Stats seeded successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding media', error: error.message });
    }
};

exports.fetchYTMetadata = async (req, res) => {
    try {
        const { id } = req.params;
        const url = `https://www.youtube.com/watch?v=${id}`;
        
        console.log(`📡 Fetching metadata for Video ID: ${id}`);
        
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            timeout: 8000
        });

        const html = response.data;
        
        // Use a more resilient regex to find the JSON response
        const jsonMatch = html.match(/var ytInitialPlayerResponse\s*=\s*({[\s\S]*?});/);
        let data = null;
        
        if (jsonMatch && jsonMatch[1]) {
            try {
                data = JSON.parse(jsonMatch[1]);
            } catch (pErr) {
                console.error("JSON Parse failed", pErr);
            }
        }

        if (!data || !data.videoDetails) {
            return res.status(404).json({ message: 'Could not fetch metadata (Format mismatch)' });
        }

        const details = data.videoDetails;
        
        // Convert seconds to MM:SS
        const seconds = parseInt(details.lengthSeconds || 0);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const duration = seconds > 0 ? `${minutes}:${remainingSeconds.toString().padStart(2, '0')}` : "0:00";

        // Format Views (e.g. 25000 -> 25K)
        const viewCount = parseInt(details.viewCount || 0);
        let views = viewCount.toString();
        if (viewCount >= 1000000) views = (viewCount / 1000000).toFixed(1) + 'M';
        else if (viewCount >= 1000) views = (viewCount / 1000).toFixed(1) + 'K';

        // Get Date (microformat datePublished or publishedTimeText)
        let formattedDate = "";
        const dateMatch = html.match(/"datePublished":"([^"]+)"/);
        const rawDate = dateMatch ? dateMatch[1] : null;
        if (rawDate) {
            const dateObj = new Date(rawDate);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
        } else {
            // Fallback for date
            formattedDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        }

        const thumbnail = details.thumbnail.thumbnails.slice(-1)[0].url;

        console.log(`✅ Successfully fetched metadata for: ${details.title}`);

        res.status(200).json({
            title: details.title,
            views: views,
            duration: duration,
            date: formattedDate,
            thumbnail: thumbnail
        });
    } catch (error) {
        console.error('YT Fetch Error:', error.message);
        res.status(500).json({ message: 'Error fetching metadata from YouTube', error: error.message });
    }
};

exports.getMediaSettings = async (req, res) => {
    try {
        let settings = await MediaSettings.findOne();
        if (!settings) {
            // Default stats if none exist
            const defaultStats = [
                { value: '50K+', label: 'Subscribers', iconType: 'youtube' },
                { value: '35K+', label: 'Followers', iconType: 'instagram' },
                { value: '100+', label: 'Features', iconType: 'newspaper' },
                { value: '25+', label: 'Public Events', iconType: 'users' }
            ];
            const defaultCTA = {
                badge: 'SPIRITUAL CONNECTION',
                title: 'EXPERIENCE THE',
                titleHighlight: 'DIVINE GRACE',
                description: "Join Acharya Ji's spiritual family and discover the profound impact of authentic Vedic rituals and divine guidance in your life.",
                primaryBtnText: 'Book Sacred Puja',
                primaryBtnLink: '/puja/online',
                secondaryBtnText: 'Professional Consultation',
                secondaryBtnLink: '/talk-to-astrologer'
            };
            settings = new MediaSettings({ stats: defaultStats, cta: defaultCTA });
            await settings.save();
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching media settings', error: error.message });
    }
};

exports.updateMediaSettings = async (req, res) => {
    try {
        const { stats, cta } = req.body;
        let settings = await MediaSettings.findOne();
        if (settings) {
            if (stats) settings.stats = stats;
            if (cta) settings.cta = cta;
        } else {
            settings = new MediaSettings({ stats, cta });
        }
        await settings.save();
        res.status(200).json({ message: 'Media settings updated successfully', settings });
    } catch (error) {
        res.status(500).json({ message: 'Error updating media settings', error: error.message });
    }
};
