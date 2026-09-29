export const pageVisuals = {
  "home": {
    "src": "/images/cynthia/astronaut.png",
    "altZh": "宇航员与星空插画",
    "altEn": "An astronaut beneath a hand-drawn sky",
    "objectPositionDesktop": "50% 50%",
    "objectPositionMobile": "50% 50%",
    "focalPoint": {
      "x": 0.5,
      "y": 0.5
    },
    "width": 1672,
    "height": 941,
    "fragmentationSource": ""
  },
  "capabilities": {
    "src": "/images/cynthia/wind.jpg",
    "altZh": "风中的女孩插画",
    "altEn": "Girls in the wind",
    "objectPositionDesktop": "50% 45%",
    "objectPositionMobile": "50% 45%",
    "focalPoint": {
      "x": 0.5,
      "y": 0.5
    },
    "width": 971,
    "height": 1619
  },
  "results": {
    "src": "/images/cynthia/cardboard-castle.jpg",
    "altZh": "猫咪与纸箱城堡插画",
    "altEn": "Cats and a cardboard castle",
    "objectPositionDesktop": "50% 50%",
    "objectPositionMobile": "50% 50%",
    "focalPoint": {
      "x": 0.5,
      "y": 0.5
    },
    "width": 1690,
    "height": 931
  },
  "methodology": {
    "src": "/images/cynthia/cat-post.jpg",
    "altZh": "猫咪邮局插画",
    "altEn": "An illustrated cat post office",
    "objectPositionDesktop": "50% 50%",
    "objectPositionMobile": "50% 50%",
    "focalPoint": {
      "x": 0.5,
      "y": 0.5
    },
    "width": 1489,
    "height": 1056
  },
  "contact": {
    "src": "/images/cynthia/fountain.jpg",
    "altZh": "喷泉边的女孩插画",
    "altEn": "A girl beside a fountain",
    "objectPositionDesktop": "50% 60%",
    "objectPositionMobile": "50% 60%",
    "focalPoint": {
      "x": 0.5,
      "y": 0.5
    },
    "width": 971,
    "height": 1619
  }
} as const;
export type PageKey = keyof typeof pageVisuals;
export const routes: {key: PageKey | 'illustrations'; href: string}[] = [{"key":"home","href":"/"},{"key":"capabilities","href":"/capabilities"},{"key":"results","href":"/results"},{"key":"methodology","href":"/methodology"},{"key":"illustrations","href":"/illustrations"},{"key":"contact","href":"/contact"}];
export const resume = { href: '/downloads/Cynthia_Resume_Portfolio_ZH.docx', filename: 'Cynthia_Resume_Portfolio_ZH.docx' };
export const contact = {phone: '+86 155 2787 1638', email: '975742045@qq.com'};
