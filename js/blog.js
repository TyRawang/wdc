/* ==========================================================================
   Blog rendering: latest posts (home), blog list with category/tag
   filters, single post, categories and tags pages.
   Relies on POSTS from posts.js and observeReveals from main.js.
   ========================================================================== */

(() => {
  if (typeof POSTS === "undefined") return;

  const CATEGORY_DESCRIPTIONS = {
    "Strategy & Tips": "Practical advice for planning, measuring and growing your business.",
    "Web Design": "How good design, speed and structure turn visitors into customers.",
    "Marketing": "Ideas for getting noticed, staying relevant and building your brand.",
    "Case Studies": "Real projects and what we learned along the way.",
  };

  /* ---------- Helpers ---------- */

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const slugify = (str) =>
    str.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // Parse YYYY-MM-DD as a local date so it doesn't shift a day in some time zones.
  const parseDate = (iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const formatDate = (iso) =>
    parseDate(iso).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

  const postUrl = (post) => `post.html?slug=${encodeURIComponent(post.slug)}`;
  const categoryUrl = (name) => `blog.html?category=${slugify(name)}`;
  const tagUrl = (name) => `blog.html?tag=${slugify(name)}`;

  const sortedPosts = [...POSTS].sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const countBy = (getter) => {
    const counts = new Map();
    POSTS.forEach((post) => {
      [].concat(getter(post)).forEach((name) => counts.set(name, (counts.get(name) || 0) + 1));
    });
    return counts;
  };

  const postCard = (post) => `
    <article class="post-card reveal">
      <a class="post-card__thumb" href="${postUrl(post)}" tabindex="-1" aria-hidden="true">
        <img src="${escapeHtml(post.thumb)}" alt="" width="300" height="269" loading="lazy">
      </a>
      <div>
        <div class="meta">
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          <a href="${categoryUrl(post.category)}">${escapeHtml(post.category)}</a>
        </div>
        <h3 class="post-card__title"><a href="${postUrl(post)}">${escapeHtml(post.title)}</a></h3>
        <p class="post-card__excerpt">${escapeHtml(post.excerpt)}</p>
        <a class="post-card__more" href="${postUrl(post)}">Read more<span class="visually-hidden">: ${escapeHtml(post.title)}</span> &rarr;</a>
      </div>
    </article>`;

  const render = (el, html) => {
    el.innerHTML = html;
    if (typeof observeReveals === "function") observeReveals(el);
  };

  const params = new URLSearchParams(window.location.search);

  /* ---------- Home: latest posts ---------- */

  const latest = document.getElementById("latest-posts");
  if (latest) {
    const limit = Number(latest.dataset.limit) || 4;
    render(latest, sortedPosts.slice(0, limit).map(postCard).join(""));
  }

  /* ---------- Blog list (with optional filter) ---------- */

  const list = document.getElementById("post-list");
  if (list) {
    const catSlug = params.get("category");
    const tagSlug = params.get("tag");
    let posts = sortedPosts;
    let filterLabel = "";

    if (catSlug) {
      posts = posts.filter((p) => slugify(p.category) === catSlug);
      const name = posts[0]?.category;
      filterLabel = name ? `Category: ${name}` : "Unknown category";
    } else if (tagSlug) {
      posts = posts.filter((p) => p.tags.some((t) => slugify(t) === tagSlug));
      const name = posts[0]?.tags.find((t) => slugify(t) === tagSlug);
      filterLabel = name ? `Tag: ${name}` : "Unknown tag";
    }

    const bar = document.getElementById("filter-bar");
    if (filterLabel && bar) {
      bar.hidden = false;
      bar.querySelector("[data-filter-label]").textContent =
        `${filterLabel} (${posts.length} ${posts.length === 1 ? "post" : "posts"})`;
      document.title = `${filterLabel} | Blog | Web Design Calgary`;
    }

    render(
      list,
      posts.length
        ? posts.map(postCard).join("")
        : `<p class="empty-state">No posts found. <a href="blog.html">See all posts</a>.</p>`
    );
  }

  /* ---------- Single post ---------- */

  const article = document.getElementById("article");
  if (article) {
    const post = POSTS.find((p) => p.slug === params.get("slug"));

    if (!post) {
      document.title = "Post not found | Web Design Calgary";
      render(
        article,
        `<div class="empty-state">
           <h1>Post not found</h1>
           <p>The article you're looking for may have moved.</p>
           <a class="btn" href="blog.html">Browse the blog</a>
         </div>`
      );
    } else {
      document.title = `${post.title} | Web Design Calgary`;
      document.querySelector('meta[name="description"]')?.setAttribute("content", post.excerpt);

      const tags = post.tags.map((t) => `<a class="chip" href="${tagUrl(t)}">${escapeHtml(t)}</a>`).join("");
      const related = sortedPosts
        .filter((p) => p.slug !== post.slug && p.category === post.category)
        .slice(0, 2);

      render(
        article,
        `<nav class="breadcrumb" aria-label="Breadcrumb">
           <a href="index.html">Home</a> / <a href="blog.html">Blog</a> /
           <a href="${categoryUrl(post.category)}">${escapeHtml(post.category)}</a>
         </nav>
         <h1>${escapeHtml(post.title)}</h1>
         <div class="meta">
           <time datetime="${post.date}">${formatDate(post.date)}</time>
           <a href="${categoryUrl(post.category)}">${escapeHtml(post.category)}</a>
         </div>
         <img class="article__cover" src="${escapeHtml(post.image)}" alt="" width="714" height="640">
         <div class="article__body">${post.body}</div>
         <footer class="article__footer">
           <p><strong>Tags:</strong></p>
           ${tags}
         </footer>`
      );

      const relatedWrap = document.getElementById("related");
      if (relatedWrap && related.length) {
        relatedWrap.hidden = false;
        render(relatedWrap.querySelector(".grid"), related.map(postCard).join(""));
      }
    }
  }

  /* ---------- Categories page ---------- */

  const catGrid = document.getElementById("category-list");
  if (catGrid) {
    const counts = countBy((p) => p.category);
    render(
      catGrid,
      [...counts.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(
          ([name, count]) => `
          <a class="card tax-card reveal" href="${categoryUrl(name)}">
            <h3>${escapeHtml(name)}</h3>
            <p>${escapeHtml(CATEGORY_DESCRIPTIONS[name] || "")}</p>
            <span class="tax-card__count">${count} ${count === 1 ? "post" : "posts"} &rarr;</span>
          </a>`
        )
        .join("")
    );
  }

  /* ---------- Tags page ---------- */

  const tagCloud = document.getElementById("tag-list");
  if (tagCloud) {
    const counts = countBy((p) => p.tags);
    render(
      tagCloud,
      [...counts.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(
          ([name, count]) =>
            `<a class="chip" href="${tagUrl(name)}">${escapeHtml(name)}<span class="chip__count">(${count})</span></a>`
        )
        .join("")
    );
  }
})();
