// ================= 1. 数据配置中心 =================
const gamesData = [
    {
        id: 'game1', title: '迷雾侦探社', category: '剧情叙事', isNew: false,
        tags: [{ text: '剧情', class: 'purple' }, { text: '微恐', class: 'orange' }],
        imgUrl: 'images/games/game1.jpg', 
        likes: 0, dislikes: 0, 
        url: 'https://aigame.example.com/detective', desc: '这是一款沉浸式的悬疑解谜游戏...'
    },
    {
        id: 'game2', title: '海风小镇', category: '解谜', isNew: true,
        tags: [{ text: '解谜', class: 'blue' }, { text: '多人', class: 'green' }],
        imgUrl: 'images/games/game2.jpg', 
        likes: 0, dislikes: 0, 
        url: 'https://aigame.example.com/seawind', desc: '在美丽的海风小镇里...'
    },
    {
        id: 'game3', title: '机械迷城', category: '治愈休闲', isNew: false,
        tags: [{ text: '治愈', class: 'blue' }, { text: '像素', class: 'orange' }],
        imgUrl: 'images/games/game3.jpg', 
        likes: 0, dislikes: 0, 
        url: 'https://aigame.example.com/mecha', desc: '休闲治愈的像素风游戏...'
    },
    {
        id: 'game4', title: '海风小镇前传', category: '剧情叙事', isNew: true,
        tags: [{ text: '治愈', class: 'purple' }, { text: '像素', class: 'orange' }],
        imgUrl: 'images/games/game4.jpg', 
        likes: 0, dislikes: 0, 
        url: 'https://aigame.example.com/detective2', desc: '剧情向像素游戏...'
    },
    {
        id: 'game5', title: '星空旅人', category: 'roguelike', isNew: false,
        tags: [{ text: '治愈', class: 'purple' }, { text: '像素', class: 'orange' }],
        imgUrl: 'images/games/game5.jpg', 
        likes: 0, dislikes: 0, 
        url: 'https://aigame.example.com/starlight', desc: '在浩瀚的星空中...'
    },
    {
        id: 'game6', title: '星空物语', category: '模拟经营', isNew: true,
        tags: [{ text: '治愈', class: 'purple' }, { text: '多人', class: 'green' }],
        imgUrl: 'images/games/game6.jpg', 
        likes: 0, dislikes: 0, 
        url: 'https://aigame.example.com/orchard', desc: '和朋友们一起经营...'
    },
    {
        id: 'game7', title: '果园物语', category: '模拟经营', isNew: false,
        tags: [{ text: '剧情', class: 'orange' }, { text: '多人', class: 'orange' }],
        imgUrl: 'images/games/game7.jpg', 
        likes: 0, dislikes: 0, 
        url: 'https://aigame.example.com/starlight', desc: '治愈系农场模拟游戏...'
    },
    {
        id: 'game8', title: '荒野快车', category: '解谜', isNew: false,
        tags: [{ text: '治愈', class: 'blue' }, { text: '多人', class: 'orange' }],
        imgUrl: 'images/games/game8.jpg', 
        likes: 0, dislikes: 0, 
        url: 'https://aigame.example.com/starlight', desc: '充满工业气息的解谜冒险...'
    }
];

let userVotedState = {}; 
let currentRankingTab = 'hot'; 

// ================= 2. 核心渲染函数 =================
function createCardHTML(game, isRanking = false, rankNum = '') {
    const voteState = userVotedState[game.id] || '';
    const likedClass = voteState === 'like' ? 'liked' : '';
    const dislikedClass = voteState === 'dislike' ? 'disliked' : '';
    
    const tagsHTML = game.tags.map(tag => 
        `<span class="tag ${tag.class}">${tag.text}</span>`
    ).join('');

    const rankStyle = isRanking && rankNum === '02' ? 'style="color:#c0c0c0;"' : 
                      isRanking && rankNum === '03' ? 'style="color:#cd7f32;"' : '';

    return `
        <div class="game-card ${isRanking ? 'ranking-card' : ''}">
            ${isRanking ? `<div class="rank-number" ${rankStyle}>${rankNum}</div>` : ''}
            
            <div onclick="openDetail('${game.id}')" style="cursor: pointer;">
                <div class="game-card-title">${game.title}</div>
                <div class="game-image-container">
                    <div class="game-tags">${tagsHTML}</div>
                    <img src="${game.imgUrl}" alt="${game.title}">
                </div>
            </div>
            
            <div class="game-stats">
                <div class="stat-btn ${likedClass}" onclick="handleVote('${game.id}', 'like', event)">
                    👍 <span>${game.likes}</span>
                </div>
                <div class="stat-btn ${dislikedClass}" onclick="handleVote('${game.id}', 'dislike', event)">
                    👎 <span>${game.dislikes}</span>
                </div>
            </div>
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

function renderRankingPage() {
    const gameGrid = document.getElementById('ranking-game-grid');
    let displayList = [];

    if (currentRankingTab === 'hot') {
        displayList = [...gamesData].sort((a, b) => (b.likes + b.dislikes) - (a.likes + a.dislikes));
    } else if (currentRankingTab === 'new') {
        displayList = gamesData.filter(g => g.isNew === true);
    } else if (currentRankingTab === 'reputation') {
        displayList = [...gamesData].sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
    }

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

// ================= 3. 交互逻辑 =================

// 修改了 switchView，增加了 scrollToTop 参数
function switchView(viewId, element, scrollToTop = true) {
    document.querySelectorAll('.view-section').forEach(section => section.classList.remove('active'));
    
    if(element) {
        document.querySelectorAll('.nav-links a').forEach(nav => nav.classList.remove('active'));
        element.classList.add('active');
    }
    
    document.getElementById(viewId).classList.add('active');
    
    document.body.className = ''; 
    if (viewId === 'category-view') document.body.classList.add('bg-category');
    if (viewId === 'ranking-view') document.body.classList.add('bg-ranking');
    if (viewId === 'collection-view') document.body.classList.add('bg-collection');
    if (viewId === 'detail-view') document.body.classList.add('bg-detail');
    
    if(viewId === 'ranking-view') {
        renderRankingPage();
    }
    
    if (scrollToTop) {
        window.scrollTo(0, 0);
    }
}

function handleVote(gameId, type, event) {
    event.stopPropagation(); 

    const currentVote = userVotedState[gameId];
    
    if (currentVote === type) {
        userVotedState[gameId] = null;
        if (type === 'like') gamesData.find(g => g.id === gameId).likes--;
        if (type === 'dislike') gamesData.find(g => g.id === gameId).dislikes--;
    } else if (currentVote && currentVote !== type) {
        userVotedState[gameId] = type;
        if (type === 'like') {
            gamesData.find(g => g.id === gameId).likes++;
            gamesData.find(g => g.id === gameId).dislikes--;
        } else {
            gamesData.find(g => g.id === gameId).dislikes++;
            gamesData.find(g => g.id === gameId).likes--;
        }
    } else {
        userVotedState[gameId] = type;
        if (type === 'like') gamesData.find(g => g.id === gameId).likes++;
        if (type === 'dislike') gamesData.find(g => g.id === gameId).dislikes++;
    }

    updateUIVotes(gameId);
}

function updateUIVotes(gameId) {
    const currentSection = document.querySelector('.view-section.active').id;
    
    if (currentSection === 'category-view') {
        const activeCat = document.querySelector('#category-list li.active').innerText;
        renderFilteredGames(activeCat);
    } else if (currentSection === 'ranking-view') {
        renderRankingPage(); 
    } else if (currentSection === 'collection-view') {
        renderCollectionPage();
    } else if (currentSection === 'detail-view') {
        // 在详情页点赞时，重新渲染详情页内容，但保持滚动条位置
        const scrollY = window.scrollY;
        openDetail(gameId, false);
        window.scrollTo(0, scrollY);
    }
}

// 修改了 openDetail，增加了 scrollToTop 参数，并将点赞/拉踩改成了可点击按钮
function openDetail(gameId, scrollToTop = true) {
    const game = gamesData.find(g => g.id === gameId);
    if (!game) return;

    // 获取当前点赞状态，用于显示高亮
    const voteState = userVotedState[gameId] || '';
    const likedClass = voteState === 'like' ? 'liked' : '';
    const dislikedClass = voteState === 'dislike' ? 'disliked' : '';

    const detailContainer = document.getElementById('detail-content');
    
    detailContainer.innerHTML = `
        <div class="detail-image">
            <img src="${game.imgUrl}" alt="${game.title}">
        </div>
        <div class="detail-info">
            <h1 class="detail-title">${game.title}</h1>
            <div style="margin-bottom: 20px;">
                ${game.tags.map(tag => `<span class="tag ${tag.class}" style="margin-right:10px;">${tag.text}</span>`).join('')}
            </div>
            <p class="detail-desc">${game.desc}</p>
            <div style="display: flex; gap: 20px; align-items: center;">
                <a href="${game.url}" target="_blank" class="play-btn">🚀 开始游玩</a>
                
                <!-- 修复了这里的点赞/拉踩按钮 -->
                <div class="game-stats" style="border: none; padding: 0; margin: 0;">
                    <div class="stat-btn ${likedClass}" onclick="handleVote('${game.id}', 'like', event)">
                        👍 <span>${game.likes}</span>
                    </div>
                    <div class="stat-btn ${dislikedClass}" onclick="handleVote('${game.id}', 'dislike', event)">
                        👎 <span>${game.dislikes}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 只在第一次点开详情页时滚到顶部，如果是点赞后重绘，就不滚动了
    switchView('detail-view', null, scrollToTop);
}

function goBack() {
    switchView('category-view', document.querySelector('.nav-links a'));
    renderCategoryPage(); 
}

// ================= 4. 页面初始化 =================
window.onload = () => {
    document.body.classList.add('bg-category');
    renderCategoryPage();
    renderRankingPage();
    renderCollectionPage();
};