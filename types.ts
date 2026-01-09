
export type NodeType = 'goal' | 'logic' | 'counter' | 'evidence';

export interface LogicNode {
  id: string;
  type: NodeType;
  content: string;
  children: string[]; // IDs of child nodes
  parentId?: string;
  isExpanded?: boolean;
}

export interface LogicTree {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    omScore: number;
  };
  conclusion: string;
  nodes: Record<string, LogicNode>;
  rootId: string;
  createdAt: string;
  likes: number;
  debates: number;
}

export enum AppView {
  EXPLORE = 'explore',
  CREATE = 'create',
  INSIGHTS = 'insights',
  MINDSET = 'mindset',
  DEBATE = 'debate'
}
