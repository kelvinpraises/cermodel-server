 interface IDeployModelRequest {
  didSeedKey: string;
  ceramicNode: string;
  modelDetails: {
    schema: string;
    name: string;
    description: string;
    schemaAlias: string;
    definitionAlias: string;
  }[];
}
