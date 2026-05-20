// src/data/typeProfiles.ts
import type { MBTIType, TypeProfile } from '../types';

export const typeProfiles: Record<MBTIType, TypeProfile> = {
  INTJ: {
    type: 'INTJ', title: '建筑师 · The Architect',
    traits: ['理智冷静', '独立自主', '长远规划'],
    dominantFunction: 'Ni', auxiliaryFunction: 'Te',
  },
  INTP: {
    type: 'INTP', title: '逻辑学家 · The Logician',
    traits: ['思维深邃', '求知若渴', '创新独立'],
    dominantFunction: 'Ti', auxiliaryFunction: 'Ne',
  },
  INFJ: {
    type: 'INFJ', title: '提倡者 · The Advocate',
    traits: ['洞察人心', '理想主义', '温和坚定'],
    dominantFunction: 'Ni', auxiliaryFunction: 'Fe',
  },
  INFP: {
    type: 'INFP', title: '调停者 · The Mediator',
    traits: ['温柔诗意', '忠于自我', '同理心强'],
    dominantFunction: 'Fi', auxiliaryFunction: 'Ne',
  },
  ISTJ: {
    type: 'ISTJ', title: '检查员 · The Inspector',
    traits: ['严谨务实', '可靠守序', '一丝不苟'],
    dominantFunction: 'Si', auxiliaryFunction: 'Te',
  },
  ISFJ: {
    type: 'ISFJ', title: '守卫者 · The Defender',
    traits: ['温柔体贴', '默默付出', '忠诚可靠'],
    dominantFunction: 'Si', auxiliaryFunction: 'Fe',
  },
  ISTP: {
    type: 'ISTP', title: '鉴赏家 · The Virtuoso',
    traits: ['冷静务实', '动手能力强', '随性自由'],
    dominantFunction: 'Ti', auxiliaryFunction: 'Se',
  },
  ISFP: {
    type: 'ISFP', title: '艺术家 · The Adventurer',
    traits: ['随性自在', '审美敏锐', '温柔低调'],
    dominantFunction: 'Fi', auxiliaryFunction: 'Se',
  },
  ENTJ: {
    type: 'ENTJ', title: '指挥官 · The Commander',
    traits: ['果断强势', '领导力强', '目标驱动'],
    dominantFunction: 'Te', auxiliaryFunction: 'Ni',
  },
  ENTP: {
    type: 'ENTP', title: '辩论家 · The Debater',
    traits: ['机智善辩', '好奇心强', '不拘一格'],
    dominantFunction: 'Ne', auxiliaryFunction: 'Ti',
  },
  ENFJ: {
    type: 'ENFJ', title: '教育家 · The Protagonist',
    traits: ['温暖感染力', '善于引导', '理想主义'],
    dominantFunction: 'Fe', auxiliaryFunction: 'Ni',
  },
  ENFP: {
    type: 'ENFP', title: '快乐小狗 · The Campaigner',
    traits: ['热情洋溢', '创意无限', '自由奔放'],
    dominantFunction: 'Ne', auxiliaryFunction: 'Fi',
  },
  ESTJ: {
    type: 'ESTJ', title: '总经理 · The Executive',
    traits: ['高效务实', '组织力强', '公正严格'],
    dominantFunction: 'Te', auxiliaryFunction: 'Si',
  },
  ESFJ: {
    type: 'ESFJ', title: '执政官 · The Consul',
    traits: ['热情周到', '乐于助人', '善于协调'],
    dominantFunction: 'Fe', auxiliaryFunction: 'Si',
  },
  ESTP: {
    type: 'ESTP', title: '企业家 · The Entrepreneur',
    traits: ['行动力强', '随机应变', '精力充沛'],
    dominantFunction: 'Se', auxiliaryFunction: 'Ti',
  },
  ESFP: {
    type: 'ESFP', title: '表演者 · The Entertainer',
    traits: ['活力四射', '感染力强', '享受当下'],
    dominantFunction: 'Se', auxiliaryFunction: 'Fi',
  },
};
