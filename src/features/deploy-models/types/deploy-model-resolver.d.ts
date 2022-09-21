interface IDeployModelResolver {
  resolve: (VersionService: IDeployModel) => Promise<IDeployModelResult>;
}
