import bidiFactory from 'bidi-js';
import { repeat } from '@michael-3-141/react-pdf-fns';

const bidi = bidiFactory();

const getBidiLevels = runs => {
  return runs.reduce((acc, run) => {
    const length = run.end - run.start;
    const levels = repeat(run.attributes.bidiLevel, length);
    return acc.concat(levels);
  }, []);
};

const mirrorString = () => attributedString => {
  const levels = getBidiLevels(attributedString.runs);

  let updatedString = '';
  attributedString.string.split('').forEach((char, index) => {
    const isRTL = levels[index] % 2 === 1;
    const mirroredChar = isRTL
      ? bidi.getMirroredCharacter(attributedString.string.charAt(index))
      : null;
    updatedString += mirroredChar || char;
  });

  return { ...attributedString, string: updatedString, levels };
};

export default mirrorString;
