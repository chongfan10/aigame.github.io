/* 
=============================================================================
【🚨 新增游戏模板区】
=============================================================================
    {
        id: 'game9', 
        title: '你的新游戏名字', 
        category: '社会热点', 
        isNew: true, 
        isUpdated: false,
        tags: [{ text: '解谜' }, { text: '像素' }],
        imgUrl: 'images/games/game9.jpg', 
        url: 'https://你的游戏链接.com',
        author: '你的名字',
        authorUrl: 'https://space.bilibili.com/你的UID', 
        authorAvatar: 'images/authors/avatar9.jpg', 
        authorPlatform: 'B站', 
        authorInfo: '这里是作者的简短介绍。',
        version: 'v1', 
        memeEvent: '这里填关联的热梗事件'
    }
=============================================================================
*/

// ================= 1. 游戏数据配置中心 =================
const gamesData = [
    {
        id: 'game1', title: '迷雾侦探社', category: '社会热点', isNew: true, isUpdated: false,
        tags: [{ text: '剧情' }, { text: '微恐' }],
        imgUrl: 'images/games/game1.jpg', 
        url: 'https://aigame.example.com/detective',
        author: '张三',
        authorUrl: 'https://space.bilibili.com/123456', 
        authorAvatar: 'images/authors/avatar1.jpg',
        authorPlatform: 'B站',
        authorInfo: '专注悬疑解谜的独立开发者，擅长AI互动叙事。',
        version: 'v1', 
        memeEvent: '消失的胡鑫宇案'
    },
    {
        id: 'game2', title: '海风小镇', category: '抽象整活', isNew: false, isUpdated: true,
        tags: [{ text: '解谜' }, { text: '多人' }],
        imgUrl: 'images/games/game2.jpg', 
        url: 'https://aigame.example.com/seawind',
        author: '李四',
        authorUrl: 'https://www.douyin.com/user/654321',
        authorAvatar: 'images/authors/avatar2.jpg',
        authorPlatform: '抖音',
        authorInfo: '海风游戏工作室主理人。',
        version: 'v1', 
        memeEvent: '淄博烧烤爆火事件'
    },
    {
        id: 'game3', title: '机械迷城', category: '抽象整活', isNew: false, isUpdated: false,
        tags: [{ text: '治愈' }, { text: '像素' }],
        imgUrl: 'images/games/game3.jpg', 
        url: 'https://aigame.example.com/mecha',
        author: '王五',
        authorUrl: '', // 测试没有链接的情况
        authorAvatar: 'images/authors/avatar3.jpg',
        authorPlatform: '微博',
        authorInfo: '像素美术狂热爱好者。',
        version: 'v1',
        memeEvent: 'ChatGPT引爆AI热潮'
    }
];

let currentRankingCategory = '全部热梗';
let currentUpCategory = '全部UP主';

// ================= 2. 核心渲染函数 =================

// 辅助函数：生成安全链接（防止 href="#" 导致页面跳回顶部）
function createSafeLink(text, url, className) {
    if (url && url.trim() !== '') {
        return `<a href="${url}" target="_blank" class="${className}">${text}</a>`;
    } else {
        return `<span class="${className}">${text}</span>`;
    }
}

// --- 游戏卡片生成 ---
function createCardHTML(game, isRanking = false, rankNum = '', displayIndex = 1) {
    const tagsHTML = game.tags.map(tag => `<span class="tag">${tag.text}</span>`).join('');
    const archiveNo = String(displayIndex).padStart(3, '0');

    let topLeftBadge = '';
    if (game.isNew || game.isUpdated) {
        topLeftBadge = `<div class="new-badge">NEW</div>`;
    } else if (isRanking) {
        topLeftBadge = `<div class="rank-number">${rankNum}</div>`;
    }

    const authorHTML = createSafeLink(`@${game.author}`, game.authorUrl, 'author-link');
    const platformTag = game.authorPlatform ? `<span class="platform-tag">${game.authorPlatform}</span>` : '';

    return `
        <div class="game-card ${isRanking ? 'ranking-card' : ''}">
            <div class="card-corner-tr"></div>
            <div class="card-corner-bl"></div>
            <div class="card-corner-br"></div>
            ${topLeftBadge}
            <div class="card-no">NO.${archiveNo}</div>
            <div class="game-card-title">${game.title}</div>
            <div class="game-image-container">
                <img src="${game.imgUrl}" alt="${game.title}" loading="lazy">
            </div>
            <div class="game-tags">${tagsHTML}</div>
            
            <div class="card-info">
                <span>📂 所属分类：<strong style="color:#b8522e;">${game.category}</strong></span>
                <span>✍️ 游戏作者：${authorHTML} ${platformTag}</span>
                <span class="author-desc">💬 作者信息：${game.authorInfo || '暂无介绍'}</span>
                <span>🏷️ 游戏版本：<strong style="color:#c99844;">${game.version}</strong></span>
                <div style="margin-top: 8px;">🔥 关联热梗：<br><span class="meme-hashtag"># ${game.memeEvent} #</span></div>
            </div>
            
            <a href="${game.url}" target="_blank" class="card-play-btn">开始游玩</a>
        </div>
    `;
}

// --- UP主卡片生成 ---
function createUpCardHTML(up) {
    const avatarText = up.name.charAt(0);
    const avatarContent = up.avatar 
        ? `<img src="${up.avatar}" alt="${up.name}" loading="lazy">` 
        : avatarText;
        
    const platformTag = up.platform ? `<span class="platform-tag">${up.platform}</span>` : '';
    const upNameHTML = createSafeLink(up.name, up.url, 'up-name-link');

    return `
        <div class="up-card">
            <div class="up-card-corner-tr"></div>
            <div class="up-card-corner-bl"></div>
            <div class="up-card-corner-br"></div>
            
            <div class="up-card-top">
                <div class="up-avatar">${avatarContent}</div>
                <div class="up-info">
                    <div class="up-name">执笔人档案：${upNameHTML} ${platformTag}</div>
                    <div class="up-desc">${up.desc || '暂无简介'}</div>
                    <div class="up-stat">💎 已收录：${up.gameCount} 款游戏</div>
                </div>
            </div>
            
            <a href="${up.url || '#'}" target="_blank" class="card-play-btn">查看TA的史书</a>
        </div>
    `;
}

// ================= 3. 页面渲染逻辑 =================

// 首页
function renderCategoryPage() {
    const gameGrid = document.getElementById('category-game-grid');
    gameGrid.innerHTML = gamesData.map((g, index) => createCardHTML(g, false, '', index + 1)).join('');
}

// 热梗页
function renderRankingSidebar() {
    const categories = ['全部热梗', '社会热点', '抽象整活'];
    const rankingCategoryList = document.getElementById('ranking-category-list');

    rankingCategoryList.innerHTML = categories.map((cat, index) => 
        `<li class="${index === 0 ? 'active' : ''}" onclick="filterRankingCategory('${cat}', this)">
            <span>📁</span> ${cat}
        </li>`
    ).join('');

    renderRankingPage();
}

function filterRankingCategory(category, element) {
    currentRankingCategory = category;
    document.querySelectorAll('#ranking-category-list li').forEach(li => li.classList.remove('active'));
    element.classList.add('active');
    renderRankingPage(); 
}

function renderRankingPage() {
    const gameGrid = document.getElementById('ranking-game-grid');
    let displayList = [...gamesData];

    if (currentRankingCategory !== '全部热梗') {
        displayList = displayList.filter(g => g.category === currentRankingCategory);
    }

    gameGrid.innerHTML = displayList.map((g, index) => {
        const rankNum = String(index + 1).padStart(2, '0'); 
        return createCardHTML(g, true, rankNum, index + 1);
    }).join('');
}

// ================= 🚨 核心：自动生成UP主逻辑 =================

function generateUpData() {
    const upMap = {};
    
    gamesData.forEach(game => {
        if (!upMap[game.author]) {
            // 第一次遇到该作者
            upMap[game.author] = {
                name: game.author,
                desc: game.authorInfo,
                url: game.authorUrl || '',
                avatar: game.authorAvatar || '', 
                platform: game.authorPlatform || '',
                gameCount: 1,
                category: '传统手艺人' 
            };
        } else {
            // 已经存在，数量+1
            upMap[game.author].gameCount += 1;
            
            // 逻辑优化：如果之前的记录里没有头像或链接，但新游戏填了，就补全它
            if (!upMap[game.author].avatar && game.authorAvatar) {
                upMap[game.author].avatar = game.authorAvatar;
            }
            if (!upMap[game.author].url && game.authorUrl) {
                upMap[game.author].url = game.authorUrl;
            }

            if (upMap[game.author].gameCount >= 2) {
                upMap[game.author].category = '高产肝帝';
            }
        }
    });

    return Object.values(upMap);
}

// 档案馆页
function renderUpSidebar() {
    const categories = ['全部UP主', '高产肝帝', '传统手艺人'];
    const upCategoryList = document.getElementById('up-category-list');

    upCategoryList.innerHTML = categories.map((cat, index) => 
        `<li class="${index === 0 ? 'active' : ''}" onclick="filterUpCategory('${cat}', this)">
            <span>👤</span> ${cat}
        </li>`
    ).join('');

    renderCollectionPage();
}

function filterUpCategory(category, element) {
    currentUpCategory = category;
    document.querySelectorAll('#up-category-list li').forEach(li => li.classList.remove('active'));
    element.classList.add('active');
    renderCollectionPage();
}

function renderCollectionPage() {
    const upGrid = document.getElementById('collection-up-grid');
    let allUps = generateUpData();

    if (currentUpCategory !== '全部UP主') {
        allUps = allUps.filter(u => u.category === currentUpCategory);
    }

    upGrid.innerHTML = allUps.map(u => createUpCardHTML(u)).join('');
}

// ================= 4. 导航切换与 Hash 路由 =================

function switchView(viewId, element) {
    document.querySelectorAll('.view-section').forEach(section => section.classList.remove('active'));
    
    if(element) {
        document.querySelectorAll('.breadcrumbs a').forEach(nav => nav.classList.remove('active'));
        element.classList.add('active');
    }
    
    document.getElementById(viewId).classList.add('active');
    
    // 更新 URL Hash，防止刷新丢失状态
    if (viewId === 'category-view') window.location.hash = 'home';
    if (viewId === 'ranking-view') window.location.hash = 'trending';
    if (viewId === 'collection-view') window.location.hash = 'archive';

    if(viewId === 'ranking-view') {
        if(document.getElementById('ranking-category-list').innerHTML === '') {
            renderRankingSidebar();
        } else {
            renderRankingPage();
        }
    } else if (viewId === 'collection-view') {
        if(document.getElementById('up-category-list').innerHTML === '') {
            renderUpSidebar();
        } else {
            renderCollectionPage();
        }
    }
    
    window.scrollTo(0, 0);
}

// ================= 5. 初始化 =================
window.onload = () => {
    // 先渲染首页，保证基础结构存在
    renderCategoryPage();
    
    // 读取 URL 中的 Hash，恢复上次浏览的页面
    const hash = window.location.hash.replace('#', '');
    const navLinks = document.querySelectorAll('.breadcrumbs a');
    
    if (hash === 'trending') {
        switchView('ranking-view', navLinks[1]);
    } else if (hash === 'archive') {
        switchView('collection-view', navLinks[2]);
    } else {
        // 默认首页
        window.location.hash = 'home';
    }
};