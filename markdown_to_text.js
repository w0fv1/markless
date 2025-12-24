const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

export function isPureWhitespace(str) {
  return /^[\s\uFEFF\xA0]*$/.test(str);
}

function normalizeLineEndings(text) {
  return text.replace(/\r\n?/g, '\n');
}

function normalizeWhitespacePreserveNewlines(text) {
  let normalized = normalizeLineEndings(text);
  normalized = normalized.replace(/^\n+/, '');
  const withoutNewlineSpaces = normalized
    .replace(/[ \t\f\v]+\n/g, '\n')
    .replace(/\n[ \t\f\v]+/g, '\n');
  return withoutNewlineSpaces.replace(/[ \t\f\v]+/g, ' ');
}

function normalizeInlineText(text) {
  return text
    .split('\n')
    .map(line => line.replace(/\s+/g, ' ').trim())
    .join('\n')
    .trim();
}

function formatListItem(text, listIndex, listDepth) {
  const indent = '  '.repeat(listDepth);
  const prefix = (listIndex > 0) ? `${listIndex}. ` : '\u2022 ';
  const lines = text ? text.split('\n') : [''];
  const firstLine = `${indent}${prefix}${lines[0].trim()}`;
  const continuationIndent = indent + ' '.repeat(prefix.length);
  const restLines = lines.slice(1).map(line => `${continuationIndent}${line.trim()}`);
  return [firstLine, ...restLines].join('\n').trimEnd();
}

export function domToText(node, options = {}) {
  const {
    inList = false,
    listIndex = 0,
    listDepth = 0,
    inPre = false,
    inline = false,
  } = options;

  let result = '';

  if (node.nodeType === TEXT_NODE) {
    if (isPureWhitespace(node.nodeValue)) {
      return '';
    }
    if (inPre) {
      return normalizeLineEndings(node.nodeValue);
    }
    return normalizeWhitespacePreserveNewlines(node.nodeValue);
  }

  if (node.nodeType === ELEMENT_NODE) {
    const tagName = node.tagName.toLowerCase();

    if (tagName === 'br') {
      return '\n';
    }

    if (tagName === 'pre') {
      let codeText = '';
      node.childNodes.forEach(child => {
        codeText += domToText(child, {
          inList,
          listDepth,
          inPre: true,
          inline: false,
        });
      });
      codeText = normalizeLineEndings(codeText).replace(/\n$/, '');
      return codeText + '\n\n';
    }

    if (tagName === 'code') {
      let codeText = '';
      node.childNodes.forEach(child => {
        codeText += domToText(child, {
          inList,
          listDepth,
          inPre: true,
          inline: true,
        });
      });
      return codeText;
    }

    if (tagName === 'a') {
      const href = node.getAttribute('href') || '';
      let linkText = '';
      node.childNodes.forEach(child => {
        linkText += domToText(child, {
          inList,
          listDepth,
          inPre,
          inline: true,
        });
      });
      const label = normalizeInlineText(linkText) || href;
      if (!href) {
        return label;
      }
      if (label === href) {
        return href;
      }
      return `${label} (${href})`;
    }

    if (tagName === 'img') {
      const alt = node.getAttribute('alt') || '';
      const src = node.getAttribute('src') || '';
      const label = alt ? `Image: ${alt}` : 'Image';
      if (!src) {
        return label;
      }
      return `${label} (${src})`;
    }

    if (tagName === 'table') {
      const rows = [];
      const rowNodes = node.querySelectorAll('tr');
      rowNodes.forEach(row => {
        const cells = [];
        row.childNodes.forEach(cell => {
          if (cell.nodeType !== ELEMENT_NODE) {
            return;
          }
          const cellTag = cell.tagName.toLowerCase();
          if (cellTag !== 'th' && cellTag !== 'td') {
            return;
          }
          const cellText = normalizeInlineText(domToText(cell, {
            inList: false,
            listDepth: 0,
            inPre: false,
            inline: true,
          }));
          cells.push(cellText);
        });
        if (cells.length > 0) {
          rows.push(cells.join(' | '));
        }
      });
      if (rows.length === 0) {
        return '';
      }
      return rows.join('\n') + '\n\n';
    }

    if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
      let textContent = '';
      node.childNodes.forEach(child => {
        textContent += domToText(child, { inList, listDepth, inPre, inline });
      });
      if (inline) {
        return textContent.trim();
      }
      return textContent.trim() + '\n\n';
    }

    if (tagName === 'ol') {
      let localIndex = 1;
      const items = [];
      node.childNodes.forEach(child => {
        if (child.nodeType === ELEMENT_NODE && child.tagName.toLowerCase() === 'li') {
          items.push(domToText(child, {
            inList: true,
            listIndex: localIndex,
            listDepth,
          }));
          localIndex++;
        }
      });
      const listText = items.filter(Boolean).join('\n');
      if (!listText) {
        return '';
      }
      return listDepth === 0 ? listText + '\n\n' : listText;
    }

    if (tagName === 'ul') {
      const items = [];
      node.childNodes.forEach(child => {
        if (child.nodeType === ELEMENT_NODE && child.tagName.toLowerCase() === 'li') {
          items.push(domToText(child, {
            inList: true,
            listIndex: 0,
            listDepth,
          }));
        }
      });
      const listText = items.filter(Boolean).join('\n');
      if (!listText) {
        return '';
      }
      return listDepth === 0 ? listText + '\n\n' : listText;
    }

    if (tagName === 'li') {
      let lineText = '';
      let nestedText = '';
      node.childNodes.forEach(child => {
        if (child.nodeType === ELEMENT_NODE) {
          const childTag = child.tagName.toLowerCase();
          if (childTag === 'ul' || childTag === 'ol') {
            const listText = domToText(child, {
              inList: true,
              listDepth: listDepth + 1,
              listIndex: 0,
            });
            if (listText) {
              nestedText += listText;
            }
            return;
          }
        }
        lineText += domToText(child, {
          inList: true,
          listDepth,
          listIndex,
          inPre,
          inline: true,
        });
      });
      const formattedLine = formatListItem(normalizeInlineText(lineText), listIndex, listDepth);
      if (nestedText) {
        return `${formattedLine}\n${nestedText}`.trimEnd();
      }
      return formattedLine;
    }

    if (['div', 'section', 'article', 'blockquote'].includes(tagName)) {
      let blockText = '';
      node.childNodes.forEach(child => {
        blockText += domToText(child, { inList, listDepth, inPre, inline });
      });
      if (inline) {
        return blockText.trim();
      }
      return blockText.trimEnd() + '\n\n';
    }

    let inlineText = '';
    node.childNodes.forEach(child => {
      inlineText += domToText(child, { inList, listDepth, inPre, inline });
    });
    return inlineText;
  }

  return '';
}

export function htmlToPlainText(html, doc) {
  const activeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!activeDoc) {
    throw new Error('document is required');
  }

  const tempDiv = activeDoc.createElement('div');
  tempDiv.innerHTML = html;

  let finalText = '';
  tempDiv.childNodes.forEach(child => {
    finalText += domToText(child, { inList: false });
  });

  const trimmedText = finalText.replace(/^\n+/, '').replace(/\s+$/, '');
  return trimmedText + '\n';
}

export function markdownToPlainText(markdownText, md, doc) {
  if (!md || typeof md.render !== 'function') {
    throw new Error('markdown-it instance is required');
  }

  const renderedHtml = md.render(markdownText);
  return htmlToPlainText(renderedHtml, doc);
}
