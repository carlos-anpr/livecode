import { manual } from '../data/manual';

export const manualFiles = [
  { id: '1', name: 'index.html', language: 'html', content: manual[0].content },
  { id: '2', name: 'styles.css', language: 'css', content: manual[1].content },
  {
    id: '3',
    name: 'script.js',
    language: 'javascript',
    content: manual[2].content,
  },
  { id: '4', name: 'images', language: 'images', content: '', images: [] },
];

export const INITIAL_SPLIT_SIZES = [35, 65];
