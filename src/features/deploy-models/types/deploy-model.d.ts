interface IDeployModel {
  resolver: INewPairWalletResolver;
  apiVersion: string | undefined;
  _callVersion: (
    resolvedVersion: (args: IDeployModelVersion) => Promise<IDeployModelResult>
  ) => Promise<IDeployModelResult>;
  resolveVersion: () => Promise<IDeployModelResult>;
}
