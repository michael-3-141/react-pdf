import Yoga from '@michael-3-141/react-pdf-yoga';
import { isNil } from '@michael-3-141/react-pdf-fns';

/**
 * Set position type attribute to node's Yoga instance
 *
 * @param {String} position type
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setPositionType = value => node => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    yogaNode.setPositionType(
      value === 'absolute'
        ? Yoga.POSITION_TYPE_ABSOLUTE
        : Yoga.POSITION_TYPE_RELATIVE,
    );
  }

  return node;
};

export default setPositionType;
