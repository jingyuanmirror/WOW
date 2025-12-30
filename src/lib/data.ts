export const skins = [
  {
    id: 1,
    name: "暗影之刃 UI",
    nameEn: "Shadow Blade UI",
    description: "专为盗贼和潜行者设计的极简暗黑风格界面",
    descriptionEn: "Minimalist dark-themed interface designed for rogues and stealth classes",
    price: 29.99,
    originalPrice: 39.99,
    category: "PvP",
    quality: "epic", // legendary, epic, rare, uncommon
    image: "/skins/shadow-blade.jpg",
    video: "/skins/shadow-blade-demo.mp4",
    featured: true,
    downloads: 15420,
    rating: 4.9,
    reviews: 342,
    tags: ["暗黑", "极简", "PvP", "盗贼"],
    features: [
      "高度自定义的动作条",
      "优化的资源显示",
      "PvP计时器集成",
      "暗黑主题配色"
    ],
    compatibility: "10.2.x - 11.0.x",
    lastUpdate: "2025-12-15"
  },
  {
    id: 2,
    name: "圣光守护者",
    nameEn: "Holy Guardian",
    description: "为治疗职业打造的清晰明快界面，团队框架一目了然",
    descriptionEn: "Clear and intuitive interface for healers with comprehensive raid frames",
    price: 34.99,
    originalPrice: 44.99,
    category: "PvE",
    quality: "legendary",
    image: "/skins/holy-guardian.jpg",
    video: "/skins/holy-guardian-demo.mp4",
    featured: true,
    downloads: 23890,
    rating: 5.0,
    reviews: 567,
    tags: ["治疗", "团队", "PvE", "清晰"],
    features: [
      "增强型团队框架",
      "BUFF/DEBUFF追踪",
      "法力条优化显示",
      "治疗预判提示"
    ],
    compatibility: "10.2.x - 11.0.x",
    lastUpdate: "2025-12-20"
  },
  {
    id: 3,
    name: "龙之怒火 DPS",
    nameEn: "Dragon's Fury DPS",
    description: "为输出职业量身定制，伤害数据与技能监控完美结合",
    descriptionEn: "Customized for DPS classes with perfect damage tracking and ability monitoring",
    price: 27.99,
    originalPrice: 35.99,
    category: "PvE",
    quality: "epic",
    image: "/skins/dragon-fury.jpg",
    video: "/skins/dragon-fury-demo.mp4",
    featured: true,
    downloads: 18765,
    rating: 4.8,
    reviews: 421,
    tags: ["DPS", "输出", "数据", "监控"],
    features: [
      "实时DPS统计",
      "技能冷却监控",
      "资源优化显示",
      "炫酷伤害数字"
    ],
    compatibility: "10.2.x - 11.0.x",
    lastUpdate: "2025-12-18"
  },
  {
    id: 4,
    name: "坦克要塞",
    nameEn: "Tank Fortress",
    description: "专业坦克界面，威胁值与生存能力监控",
    descriptionEn: "Professional tank interface with threat and survivability monitoring",
    price: 31.99,
    category: "PvE",
    quality: "epic",
    image: "/skins/tank-fortress.jpg",
    featured: false,
    downloads: 12340,
    rating: 4.7,
    reviews: 289,
    tags: ["坦克", "团队", "PvE"],
    features: [
      "威胁值监控",
      "减伤技能追踪",
      "敌方施法条",
      "生存能力提示"
    ],
    compatibility: "10.2.x - 11.0.x",
    lastUpdate: "2025-12-10"
  },
  {
    id: 5,
    name: "竞技场大师",
    nameEn: "Arena Master",
    description: "竞技场专用UI，敌方技能CD一手掌握",
    descriptionEn: "Arena-specialized UI with enemy cooldown tracking at your fingertips",
    price: 39.99,
    category: "PvP",
    quality: "legendary",
    image: "/skins/arena-master.jpg",
    featured: true,
    downloads: 28900,
    rating: 4.9,
    reviews: 678,
    tags: ["PvP", "竞技场", "专业"],
    features: [
      "敌方技能CD追踪",
      "打断提醒",
      "DR（递减）追踪",
      "队友状态同步"
    ],
    compatibility: "10.2.x - 11.0.x",
    lastUpdate: "2025-12-22"
  },
  {
    id: 6,
    name: "极简主义",
    nameEn: "Minimalist Pro",
    description: "极致简约设计，让你专注于游戏本身",
    descriptionEn: "Ultra-minimalist design to keep you focused on the game",
    price: 19.99,
    category: "通用",
    quality: "rare",
    image: "/skins/minimalist.jpg",
    featured: false,
    downloads: 9870,
    rating: 4.6,
    reviews: 234,
    tags: ["极简", "通用", "清爽"],
    features: [
      "超简洁界面",
      "隐藏非必要元素",
      "快捷键优化",
      "沉浸式体验"
    ],
    compatibility: "10.2.x - 11.0.x",
    lastUpdate: "2025-12-05"
  }
];

export const designer = {
  name: "艾泽拉斯UI大师",
  nameEn: "Azeroth UI Master",
  title: "资深魔兽世界UI设计师",
  bio: "专注于魔兽世界用户界面设计已有8年时间，致力于为玩家打造最符合游戏体验的个性化界面。我的设计理念是：简洁、高效、美观。每一款皮肤都经过数百小时的精心打磨和实战测试，确保在各种场景下都能提供最佳体验。",
  avatar: "/designer-avatar.jpg",
  stats: {
    totalSkins: 15,
    totalDownloads: 125000,
    averageRating: 4.8,
    yearsExperience: 8
  },
  social: {
    discord: "https://discord.gg/wowui",
    twitter: "https://twitter.com/azerothui",
    youtube: "https://youtube.com/@wowuimaster",
    github: "https://github.com/wowuimaster"
  },
  achievements: [
    "2024年最受欢迎UI设计师",
    "超过12万次下载",
    "4.8星平均评分",
    "15款精品皮肤"
  ]
};

export const testimonials = [
  {
    id: 1,
    name: "暗影刺客",
    rating: 5,
    comment: "暗影之刃UI简直完美！PvP时技能监控非常清晰，帮我在竞技场提升了不少胜率。",
    avatar: "/avatars/user1.jpg",
    skin: "暗影之刃 UI",
    date: "2025-12-20"
  },
  {
    id: 2,
    name: "圣光使者",
    rating: 5,
    comment: "作为一名奶骑，圣光守护者让我的治疗效率提升了30%以上，团队框架设计太赞了！",
    avatar: "/avatars/user2.jpg",
    skin: "圣光守护者",
    date: "2025-12-18"
  },
  {
    id: 3,
    name: "龙炎法师",
    rating: 5,
    comment: "龙之怒火DPS的伤害统计功能帮我优化了输出手法，现在是团队的DPS第一！",
    avatar: "/avatars/user3.jpg",
    skin: "龙之怒火 DPS",
    date: "2025-12-15"
  },
  {
    id: 4,
    name: "竞技场传奇",
    rating: 5,
    comment: "竞技场大师是我用过最专业的PvP界面，敌方技能CD追踪太实用了！",
    avatar: "/avatars/user4.jpg",
    skin: "竞技场大师",
    date: "2025-12-22"
  }
];

export const features = [
  {
    icon: "Palette",
    title: "精美设计",
    description: "每个像素都经过精心打磨，为您带来视觉盛宴"
  },
  {
    icon: "Zap",
    title: "高性能",
    description: "优化的代码结构，确保流畅的游戏体验，不占用额外资源"
  },
  {
    icon: "Settings",
    title: "高度自定义",
    description: "丰富的配置选项，打造专属于你的独特界面"
  },
  {
    icon: "Shield",
    title: "稳定可靠",
    description: "经过严格测试，兼容最新游戏版本，持续更新维护"
  },
  {
    icon: "Users",
    title: "社区支持",
    description: "活跃的用户社区，随时获得帮助和建议"
  },
  {
    icon: "Award",
    title: "专业品质",
    description: "8年设计经验，超过12万玩家的信赖之选"
  }
];

export const installSteps = [
  {
    step: 1,
    title: "下载皮肤包",
    description: "购买后立即获得下载链接，支持多次下载",
    icon: "Download"
  },
  {
    step: 2,
    title: "解压到插件目录",
    description: "将文件解压到 World of Warcraft/_retail_/Interface/AddOns",
    icon: "FolderOpen"
  },
  {
    step: 3,
    title: "启用并享受",
    description: "进入游戏，在插件列表中启用，重载界面即可使用",
    icon: "Play"
  }
];

export const promoSlides = [
  {
    id: 'hero',
    title: "重新定义义你的战斗体验",
    titleEn: "Redefine Your Combat Experience",
    description: "专业设计 | 极致美观 | 简单易用",
    descriptionEn: "Professional Design | Ultimate Beauty | Easy to Use",
    image: "", // 使用Hero背景效果
    link: "/skins",
    linkText: "查看全部作品",
    linkTextEn: "View All Works",
    backgroundColor: "#000000",
    isHeroSlide: true // 标记为主Hero屏
  },
  {
    id: 1,
    title: "新年特惠活动",
    description: "全场界面皮肤限时7折优惠，新年新气象，给你的游戏界面换个新装！",
    image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=1920&h=600&fit=crop",
    link: "/skins",
    linkText: "立即选购",
    backgroundColor: "#1a0a2e"
  },
  {
    id: 2,
    title: "全新传说品质皮肤上架",
    description: "圣光守护者 - 为治疗职业打造的顶级界面，团队框架一目了然",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=600&fit=crop",
    link: "/skins/2",
    linkText: "查看详情",
    backgroundColor: "#16213e"
  },
  {
    id: 3,
    title: "社区设计师招募中",
    description: "加入我们的设计师团队，一起为玩家创造更好的游戏体验",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=600&fit=crop",
    link: "/about",
    linkText: "了解更多",
    backgroundColor: "#0f3460"
  }
];
