const frontmatter = require('frontmatter');
const yaml = require('js-yaml');
const fs = require('fs');

const articles = ['navigating-the-ddr-ui', 'setting-your-speed', 'why-play-ddr', 'basic-gameplay', 'deciding-what-to-play']
const resources = ['glossary'];

articles.forEach(article_base => {
    const article_src = `content/articles/${article_base}.md`;
    const article_dest = `src/content/articles/${article_base}.json`;
    const contents = frontmatter(fs.readFileSync(article_src, 'utf8'));
    fs.writeFileSync(article_dest, JSON.stringify(contents));
});

resources.forEach(resource_base => {
    const resource_src = `content/resources/${resource_base}.yml`;
    const resource_dest = `src/content/resources/${resource_base}.json`;
    const contents = yaml.safeLoad(fs.readFileSync(resource_src, 'utf8'));
    fs.writeFileSync(resource_dest, JSON.stringify(contents));
});