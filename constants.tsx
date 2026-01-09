
import { LogicTree } from './types';

export const COLORS = {
  forest: '#1a2f23',
  cream: '#fefaf0',
  sage: '#4a6741',
  gold: '#c5a059',
  clay: '#8c5e58'
};

export const INITIAL_TREES: LogicTree[] = [
  {
    id: 'tree-1',
    author: {
      name: 'Dr. Aris Thorne',
      handle: '@aris_logic',
      avatar: 'https://picsum.photos/seed/aris/100/100',
      omScore: 924
    },
    conclusion: 'AI should be regulated like civil infrastructure, not commercial software.',
    rootId: 'n1',
    nodes: {
      'n1': { id: 'n1', type: 'goal', content: 'Establish systemic AI safety protocols', children: ['n2', 'n3'] },
      'n2': { id: 'n2', type: 'logic', content: 'Impact is planetary and cross-sectoral', parentId: 'n1', children: ['n4'] },
      'n3': { id: 'n3', type: 'counter', content: 'Innovation might slow down significantly', parentId: 'n1', children: ['n5'] },
      'n4': { id: 'n4', type: 'evidence', content: 'Data shows LLM integration in 60% of critical energy grids', parentId: 'n2', children: [] },
      'n5': { id: 'n5', type: 'evidence', content: 'Historical precedent: Aviation regulations didn\'t stop flight growth', parentId: 'n3', children: [] },
    },
    createdAt: '2024-05-15T10:00:00Z',
    likes: 1240,
    debates: 42
  },
  {
    id: 'tree-2',
    author: {
      name: 'Maya Zen',
      handle: '@mayamind',
      avatar: 'https://picsum.photos/seed/maya/100/100',
      omScore: 885
    },
    conclusion: 'Universal Basic Income is necessary for the psychological health of the 21st century.',
    rootId: 'r1',
    nodes: {
      'r1': { id: 'r1', type: 'goal', content: 'Decouple survival from traditional labor', children: ['r2', 'r3'] },
      'r2': { id: 'r2', type: 'logic', content: 'Automation is removing task-based value', parentId: 'r1', children: [] },
      'r3': { id: 'r3', type: 'counter', content: 'Risk of inflation and reduced workforce participation', parentId: 'r1', children: ['r4'] },
      'r4': { id: 'r4', type: 'evidence', content: 'Stockton, CA pilot study showed 12% increase in full-time employment', parentId: 'r3', children: [] },
    },
    createdAt: '2024-05-16T14:30:00Z',
    likes: 842,
    debates: 15
  }
];
