# Novantix Innovation Technology - Landing Page

![Banner](https://img.shields.io/badge/EdTech-Landing%20Page-6366f1?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-10b981?style=for-the-badge)

## 📁 Folder Structure

This folder contains the **main landing page** (marketing website) for Novantix Innovation Technology, which is **separate** from the student portal.

```
landing-page/
├── index.html          # Main landing page (home)
├── login.html          # Login page (redirects to portal)
├── styles.css          # CSS design system
└── script.js           # JavaScript interactivity
```

## 🎯 Purpose

- **Company Branding**: Showcase Novantix Innovation Technology
- **Course Promotion**: Display available courses and programs
- **Student Trust**: Build credibility with testimonials and certifications
- **Portal Gateway**: Redirect to the existing student portal for login

## 🚀 How to View

### Local Development
Open `index.html` in any modern browser:
```
file:///C:/Users/nsp19/Downloads/Institute/landing-page/index.html
```

### Web Server
For better features (CORS, etc.), use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 🔗 Integration with Student Portal

### Login Flow
1. User clicks "LOGIN" button on landing page
2. Redirected to `login.html`
3. After entering credentials, redirected to student portal at:
   ```
   ../frontend/public/index.html
   ```

### Portal Location
The existing student portal is located in:
```
Institute/frontend/
```

## 📋 Landing Page Sections

1. **Header/Navbar** - Sticky navigation with login button
2. **Hero Section** - Main headline with CTAs
3. **About Us** - Company mission and vision
4. **Courses** - 7 course cards (Java, DSA, MySQL, Spring Boot, n8n, Full-Stack, Projects)
5. **Projects** - Mini & major project support
6. **Certification** - Professional certification details
7. **Placements** - Career support services
8. **Reviews** - Student testimonials
9. **CTA** - Final enrollment call-to-action
10. **Footer** - Contact info & NSP Creative Hub credit

## 🎨 Design Features

- **Modern EdTech Aesthetic**: Premium purple/violet gradient theme
- **Fully Responsive**: Mobile, tablet, desktop optimized
- **Smooth Animations**: Fade-in, parallax, hover effects
- **Glassmorphism**: Modern translucent card effects
- **SEO Optimized**: Proper meta tags and semantic HTML

## ⚙️ Configuration

### Update Portal URL
If your student portal is at a different location, edit `login.html` line 300:
```javascript
window.location.href = 'YOUR_PORTAL_URL';
```

### Update Contact Information
Edit `index.html` footer section:
- Email
- Phone
- Address
- Social media links

## 🌐 Deployment Options

### Option 1: Same Domain (Recommended)
```
yourdomain.com/              → Landing page (this folder)
yourdomain.com/portal/       → Student portal (frontend folder)
```

### Option 2: Separate Domains
```
novantix.com                 → Landing page
portal.novantix.com          → Student portal
```

### Option 3: Subdirectory
```
institute.com/               → Landing page
institute.com/student-portal → Student portal
```

## 📦 Deployment Services

- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free static hosting
- **Traditional Web Host**: Upload via FTP/SFTP

## 🔧 Maintenance

### Adding New Courses
Edit `index.html` around line 160-230 (Courses section)

### Updating Testimonials
Edit `index.html` around line 420-520 (Reviews section)

### Changing Colors
Edit CSS variables in `styles.css` lines 8-20

## 📞 Support

**Developed by**: [NSP Creative Hub](https://nspcreativehub.info)  
**Email**: nspcreativehub@gmail.com

## 📄 License

© 2026 Novantix Innovation Technology. All Rights Reserved.

---

## ✅ Checklist

- [x] Landing page created
- [x] Login page with branding
- [x] Responsive design
- [x] Login redirects to portal
- [x] NSP Creative Hub attribution
- [ ] Update contact information
- [ ] Deploy to production
- [ ] Connect domain name
