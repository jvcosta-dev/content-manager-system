export interface IContent extends Document {
  type: string;
  data: Map<string, string>;
}

export interface IContentInput {
  type: string;
  data: Map<string, string>;
}
