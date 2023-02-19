export interface KnowledgeModel {
  readonly id: string;
  title: string;
  items: KnowledgeItem[];
}

export interface KnowledgeItem {
  title: string;
  url: string;
}

export interface CreateKnowledgeModel {
  id: string;
  title: string;
  items: KnowledgeItem[];
}
