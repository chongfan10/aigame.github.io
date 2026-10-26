// ================= 1. 数据配置中心 =================
// 去掉了 likes 和 dislikes，因为不再需要了
const gamesData = [
    {
        id: 'game1', title: '迷雾侦探社', category: '剧情叙事', isNew: false,
        tags: [{ text: '剧情', class: 'purple' }, { text: '微恐', class: 'orange' }],
        imgUrl: 'images/games/game1.jpg', 
        url: 'https://aigame.example.com/detective'
    },
    {
        id: 'game2', title: '海风小镇', category: '解谜', isNew: true,
        tags: [{ text: '解谜', class: 'blue' }, { text: '多人', class: 'green' }],
        imgUrl: 'images/games/game2.jpg', 
        url: 'https://aigame.example.com/seawind'
    },
    {
        id: 'game3', title: '机械迷城', category: '治愈休闲', isNew: false,
        tags: [{ text: '治愈', class: 'blue' }, { text: '像素', class: 'orange' }],
        imgUrl: 'images/games/game3.jpg', 
        url: 'https://aigame.example.com/mecha'
    },
    {
        id: 'game4', title: '海风小镇前传', category: '剧情叙事', isNew: true,
        tags: [{ text: '治愈', class: 'purple' }, { text: '像素', class: 'orange' }],
        imgUrl: 'images/games/game4.jpg', 
        url: 'https://aigame.example.com/detective2'
    },
    {
        id: 'game5', title: '星空旅人', category: 'roguelike', isNew: false,
        tags: [{ text: '治愈', class: 'purple' }, { text: '像素', class: 'orange' }],
        imgUrl: 'images/games/game5.jpg', 
        url: 'https://aigame.example.com/starlight'
    },
    {
        id: 'game6', title: '星空物语', category: '模拟经营', isNew: true,
        tags: [{ text: '治愈', class: 'purple' }, { text: '多人', class: 'green' }],
        imgUrl: 'images/games/game6.jpg', 
        url: 'https://aigame.example.com/orchard'
    },
    {
        id: 'game7', title: '果园物语', category: '模拟经营', isNew: false,
        tags: [{ text: '剧情', class: 'orange' }, { text: '多人', class: 'orange' }],
        imgUrl: 'images/games/game7.jpg', 
        url: 'https://aigame.example.com/starlight'
    },
    {
        id: 'game8', title: '荒野快车', category: '解谜', isNew: false,
        tags: [{ text: '治愈', class: 'blue' }, { text: '多人', class: 'orange' }],
        imgUrl: 'images/games/game8.jpg', 
        url: 'https://aigame.example.com/starlight'
    }
];

let currentRankingTab = 'hot'; 

// ================= 2. 核心渲染函数 =================

// 生成卡片，现在加入了“开始游玩”按钮
function createCardHTML(game, isRanking = false, rankNum = '') {
    const tagsHTML = game.tags.map(tag => 
        `<span class="tag ${tag.class}">${tag.text}</span>`
    ).join('');

    const rankStyle = isRanking && rankNum === '02' ? 'style="color:#c0c0c0;"' : 
                      isRanking && rankNum === '03' ? 'style="color:#cd7f32;"' : '';

    return `
        <div class="game-card ${isRanking ? 'ranking-card' : ''}">
            ${isRanking ? `<div class="rank-number" ${rankStyle}>${rankNum}</div>` : ''}
            
            <div>
                <div class="game-card-title">${game.title}</div>
                <div class="game-image-container">
                    <div class="game-tags">${tagsHTML}</div>
                    <img src="${game.imgUrl}" alt="${game.title}">
                </div>
            </div>
            
            <!-- 替换为直接开始游玩的按钮 -->
            <a href="${game.url}" target="_blank" class="card-play-btn">🚀 开始游玩</a>
            
            <div class="game-url">${game.url}</div>
        </div>
    `;
}

function renderCategoryPage() {
    const categories = ['全部游戏', '剧情叙事', '解谜', 'roguelike', '模拟经营', '治愈休闲'];
    const categoryList = document.getElementById('category-list');

    categoryList.innerHTML = categories.map((cat, index) => 
        `<li class="${index === 0 ? 'active' : ''}" onclick="filterCategory('${cat}', this)">${cat}</li>`
    ).join('');

    renderFilteredGames('全部游戏');
}

function filterCategory(category, element) {
    document.querySelectorAll('#category-list li').forEach(li => li.classList.remove('active'));
    element.classList.add('active');
    renderFilteredGames(category);
}

function renderFilteredGames(category) {
    const gameGrid = document.getElementById('category-game-grid');
    let filtered = category === '全部游戏' ? gamesData : gamesData.filter(g => g.category === category);
    gameGrid.innerHTML = filtered.map(g => createCardHTML(g)).join('');
}

function switchRankingTab(type, element) {
    currentRankingTab = type;
    document.querySelectorAll('.ranking-tab').forEach(tab => tab.classList.remove('active'));
    element.classList.add('active');
    renderRankingPage();
}

// 因为没有点赞数据了，热门/口碑榜按顺序展示前5个，新品榜过滤 isNew
function renderRankingPage() {
    const gameGrid = document.getElementById('ranking-game-grid');
    let displayList = [...gamesData];

    if (currentRankingTab === 'new') {
        displayList = gamesData.filter(g => g.isNew === true);
    }

    // 不管什么榜，最多展示 5 个
    displayList = displayList.slice(0, 5);

    gameGrid.innerHTML = displayList.map((g, index) => {
        const rankNum = String(index + 1).padStart(2, '0'); 
        return createCardHTML(g, true, rankNum);
    }).join('');
}

function renderCollectionPage() {
    const gameGrid = document.getElementById('collection-game-grid');
    gameGrid.innerHTML = gamesData.map(g => createCardHTML(g)).join('');
}

// ================= 3. 导航切换逻辑 =================
function switchView(viewId, element) {
    document.querySelectorAll('.view-section').forEach(section => section.classList.remove('active'));
    
    if(element) {
        document.querySelectorAll('.nav-links a').forEach(nav => nav.classList.remove('active'));
        element.classList.add('active');
    }
    
    document.getElementById(viewId).classList.add('active');
    
    // 切换背景图
    document.body.className = ''; 
    if (viewId === 'category-view') document.body.classList.add('bg-category');
    if (viewId === 'ranking-view') document.body.classList.add('bg-ranking');
    if (viewId === 'collection-view') document.body.classList.add('bg-collection');
    
    if(viewId === 'ranking-view') {
        renderRankingPage();
    }
    window.scrollTo(0, 0);
}

// ================= 4. 页面初始化 =================
window.onload = () => {
    document.body.classList.add('bg-category');
    renderCategoryPage();
    renderRankingPage();
    renderCollectionPage();
};