import type { MBTIType } from '../../types';
import type { FC } from 'react';

import PortraitINTJ from './PortraitINTJ';
import PortraitINTP from './PortraitINTP';
import PortraitINFJ from './PortraitINFJ';
import PortraitINFP from './PortraitINFP';
import PortraitISTJ from './PortraitISTJ';
import PortraitISFJ from './PortraitISFJ';
import PortraitISTP from './PortraitISTP';
import PortraitISFP from './PortraitISFP';
import PortraitENTJ from './PortraitENTJ';
import PortraitENTP from './PortraitENTP';
import PortraitENFJ from './PortraitENFJ';
import PortraitENFP from './PortraitENFP';
import PortraitESTJ from './PortraitESTJ';
import PortraitESFJ from './PortraitESFJ';
import PortraitESTP from './PortraitESTP';
import PortraitESFP from './PortraitESFP';

export const portraitMap: Record<MBTIType, FC<{ size?: number }>> = {
  INTJ: PortraitINTJ, INTP: PortraitINTP, INFJ: PortraitINFJ, INFP: PortraitINFP,
  ISTJ: PortraitISTJ, ISFJ: PortraitISFJ, ISTP: PortraitISTP, ISFP: PortraitISFP,
  ENTJ: PortraitENTJ, ENTP: PortraitENTP, ENFJ: PortraitENFJ, ENFP: PortraitENFP,
  ESTJ: PortraitESTJ, ESFJ: PortraitESFJ, ESTP: PortraitESTP, ESFP: PortraitESFP,
};
