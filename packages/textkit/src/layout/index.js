import { compose } from '@michael-3-141/react-pdf-fns';

import wrapWords from './wrapWords';
import typesetter from './typesetter';
import bidiReordering from './bidiReordering';
import generateGlyphs from './generateGlyphs';
import resolveYOffset from './resolveYOffset';
import preprocessRuns from './preprocessRuns';
import splitParagraphs from './splitParagraphs';
import finalizeFragments from './finalizeFragments';
import resolveAttachments from './resolveAttachments';
import applyDefaultStyles from './applyDefaultStyles';
import bidiMirroring from './bidiMirroring';
import verticalAlignment from './verticalAlign';

/**
 * A LayoutEngine is the main object that performs text layout.
 * It accepts an AttributedString and a Container object
 * to layout text into, and uses several helper objects to perform
 * various layout tasks. These objects can be overridden to customize
 * layout behavior.
 *
 * @param  {Object}  engines
 * @param  {Object}  attributed string
 * @param  {Object}  container rect
 * @param  {Object}  layout options
 * @return {Array} paragraph blocks
 */
const layoutEngine = engines => (attributedString, container, options = {}) => {
  const processParagraph = compose(
    resolveYOffset(engines, options),
    resolveAttachments(engines, options),
    generateGlyphs(engines, options),
    verticalAlignment(options),
    wrapWords(engines, options),
    generateGlyphs(engines, options),
    bidiMirroring(engines, options),
    preprocessRuns(engines, options),
  );

  const processParagraphs = paragraphs => paragraphs.map(processParagraph);

  return compose(
    finalizeFragments(engines, options),
    bidiReordering(engines, options),
    typesetter(engines, options, container),
    processParagraphs,
    splitParagraphs(engines, options),
    applyDefaultStyles(engines, options),
  )(attributedString);
};

export default layoutEngine;
