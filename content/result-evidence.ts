import { publicAsset } from '@/lib/public-asset';
export type EvidenceCategory = 'beauty' | 'home' | 'export';
export type EvidenceItem = {id:string; category:EvidenceCategory; src:string; title:{zh:string;en:string}; alt:{zh:string;en:string}; caseSlug:string};
export const evidenceItems: EvidenceItem[] = [
  {
    "id": "beauty-account",
    "category": "beauty",
    "src": publicAsset("/images/cynthia/beauty-overview.jpg"),
    "title": {
      "zh": "个护账号的 90 天记录",
      "en": "Personal care: 90-day account view"
    },
    "alt": {
      "zh": "过去90天浏览量72.9万、观看人数48.2万；截图未显示账号名和起止日期。",
      "en": "Past 90 days: 729K views and 482K viewers; the account name and exact dates are not shown."
    },
    "caseSlug": "personal-care"
  },
  {
    "id": "beauty-reel",
    "category": "beauty",
    "src": publicAsset("/images/cynthia/beauty-reel.png"),
    "title": {
      "zh": "一条 Reels 的内容表现",
      "en": "One Reel, in detail"
    },
    "alt": {
      "zh": "单条Reels：浏览量613,533、观看人数437,967、平均观看30秒、关注2,512；截图未显示年份。",
      "en": "One Reel: 613,533 views, 437,967 viewers, a 30-second average view time and 2,512 follows. The year is not shown."
    },
    "caseSlug": "personal-care"
  },
  {
    "id": "beauty-interaction",
    "category": "beauty",
    "src": publicAsset("/images/cynthia/beauty-engagement.jpg"),
    "title": {
      "zh": "内容互动与账号快照",
      "en": "Engagement and account snapshot"
    },
    "alt": {
      "zh": "互动次数6.1万、互动账户3.8万、粉丝总数2,845；具体统计周期未显示。",
      "en": "61K interactions, 38K interacting accounts and 2,845 total followers. The reporting period is not shown."
    },
    "caseSlug": "personal-care"
  },
  {
    "id": "cleaner-account",
    "category": "home",
    "src": publicAsset("/images/cynthia/cleaner-overview.png"),
    "title": {
      "zh": "清洁家电账号的 28 天",
      "en": "Home cleaning: 28-day account view"
    },
    "alt": {
      "zh": "Steam cleaner账号：28天浏览量303,335、互动1,877、净粉丝410。",
      "en": "Steam cleaner: 303,335 views, 1,877 interactions and 410 net followers over 28 days."
    },
    "caseSlug": "steam-cleaner"
  },
  {
    "id": "cleaner-content",
    "category": "home",
    "src": publicAsset("/images/cynthia/cleaner-content.png"),
    "title": {
      "zh": "持续发布的清洁演示",
      "en": "A series of cleaning demonstrations"
    },
    "alt": {
      "zh": "Steam cleaner Reels内容列表，包含约5万、6.4万、7万、6.5万浏览的内容快照。",
      "en": "Steam cleaner Reels grid, including content snapshots around 50K, 64K, 70K and 65K views."
    },
    "caseSlug": "steam-cleaner"
  },
  {
    "id": "export-localized",
    "category": "export",
    "src": publicAsset("/images/cynthia/export-content.png"),
    "title": {
      "zh": "同一产品，不同语言",
      "en": "One product, several languages"
    },
    "alt": {
      "zh": "胸贴制造过程内容列表，包含英语、西班牙语和泰语文案；为作品集截图。",
      "en": "A portfolio content list for nipple-cover manufacturing with English, Spanish and Thai copy."
    },
    "caseSlug": "export-content"
  },
  {
    "id": "export-reel",
    "category": "export",
    "src": publicAsset("/images/cynthia/export-featured.png"),
    "title": {
      "zh": "制造过程的内容表达",
      "en": "Manufacturing as content"
    },
    "alt": {
      "zh": "作品集内容列表包含1.5M与783.4K浏览快照；保留平台列表的原始统计口径。",
      "en": "Portfolio content list includes 1.5M and 783.4K view snapshots, retaining the source platform’s scope."
    },
    "caseSlug": "export-content"
  },
  {
    "id": "export-account",
    "category": "export",
    "src": publicAsset("/images/cynthia/export-overview.png"),
    "title": {
      "zh": "项目账号面板",
      "en": "A project account dashboard"
    },
    "alt": {
      "zh": "胸贴项目面板：4.6M总播放、63条发布、9个运营账号；属于项目面板记录，不等同个人累计成果。",
      "en": "Nipple-cover project panel: 4.6M plays, 63 posts and nine accounts. This is a project-level record, not a personal cumulative total."
    },
    "caseSlug": "export-content"
  }
];
export const evidenceCopy = {
  "zh": {
    "eyebrow": "成果记录",
    "title": "让工作，被看见。",
    "all": "全部",
    "beauty": "美妆个护",
    "home": "家居清洁",
    "export": "出口制造",
    "pending": "图片暂不可用",
    "zoom": "放大查看",
    "close": "关闭图片",
    "count": "份记录"
  },
  "en": {
    "eyebrow": "EVIDENCE",
    "title": "The work, in view.",
    "all": "All",
    "beauty": "Personal care",
    "home": "Home cleaning",
    "export": "Export content",
    "pending": "Image unavailable",
    "zoom": "View image",
    "close": "Close image",
    "count": "records"
  }
};
export const projectSummaries: Record<string,{zh:string;en:string}> = {
  "personal-care": {
    "zh": "围绕产品拍摄、短视频制作、发布及海外达人沟通推进内容工作。",
    "en": "Product shoots, short-video production, publishing and overseas creator communication."
  },
  "steam-cleaner": {
    "zh": "产品拍摄、内容策划、剪辑与平台发布，涵盖清洁过程和产品细节呈现。",
    "en": "Product shooting, planning, editing and publication, covering the cleaning process and product details."
  },
  "export-content": {
    "zh": "海外账号运营、内容策划、拍摄剪辑，以及通过 AI 辅助完成多语种内容。",
    "en": "Social operations, content planning, shooting, editing and AI-assisted multilingual content."
  },
  "visual-storytelling": {
    "zh": "商业项目的需求沟通、方案策划与落地执行，以及自主烘焙品牌的内容和视觉物料。",
    "en": "Client communication, concepts and delivery for commercial visuals, alongside content for an independently operated baking brand."
  }
};
