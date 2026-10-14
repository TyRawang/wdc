# Web Design Calgary — static site

Plain HTML, CSS and JavaScript. No build step or dependencies.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `about.html` | About |
| `contact.html` | Contact Us |
| `blog.html` | All posts; filters with `?category=<slug>` or `?tag=<slug>` |
| `post.html?slug=<slug>` | Single post |
| `categories.html` | Category list |
| `tags.html` | Tag list |
| `404.html` | Not found |

## Structure

```
css/style.css   all styles (brand colours are CSS variables at the top)
js/main.js      mobile menu, active nav link, footer year, scroll reveal, contact form
js/posts.js     blog content: edit this to add or change posts
js/blog.js      renders the blog, post, category and tag pages from posts.js
images/         logo, favicons, hero, blog and banner images (banner/*.jpg are
                the optimised 1600w and -800 versions; the .png sources are not used)
```

## Adding a blog post

Add an object to `POSTS` in `js/posts.js` with `slug`, `title`, `date` (YYYY-MM-DD),
`category`, `tags`, `image`, `thumb`, `excerpt` and `body`. New categories and tags
appear automatically. To give a new category a description, add it to
`CATEGORY_DESCRIPTIONS` in `js/blog.js`.

## Before going live

- **Contact form:** it validates but does not send anything yet. Point the form's
  `action` at a form service and follow the TODO in `js/main.js`.
- **Contact details:** add your email and phone number in `contact.html` (see the TODO).
- **Previewing:** opening the files directly works, but `python3 -m http.server`
  inside this folder gives the most realistic preview.
