import Yoga from '@michael-3-141/react-pdf-yoga';
import { isNil, matchPercent } from '@michael-3-141/react-pdf-fns';

const checkPercents = (attr, value) => {
  const percent = matchPercent(value);

  if (percent) {
    throw new Error(`You can't pass percentage values to ${attr} property`);
  }
};

/**
 * Set rowGap value to node's Yoga instance
 *
 * @param {Number} gap value
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setRowGap = value => node => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    checkPercents('rowGap', value);
    yogaNode.setGap(Yoga.GUTTER_ROW, value);
  }

  return node;
};

/**
 * Set columnGap value to node's Yoga instance
 *
 * @param {Number} gap value
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setColumnGap = value => node => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    checkPercents('columnGap', value);
    yogaNode.setGap(Yoga.GUTTER_COLUMN, value);
  }

  return node;
};
