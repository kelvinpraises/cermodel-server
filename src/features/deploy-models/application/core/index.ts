import { CeramicClient } from "@ceramicnetwork/http-client";
import { ModelManager } from "@glazed/devtools";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";

const deployModels = async ({
  didSeedKey,
  ceramicNode,
  modelDetails,
}: IDeployModelRequest) => {
  let result: IDeployModelResult;
  try {
    const seed = fromString(Buffer.from(didSeedKey).toString("hex"), "base16");

    // Create and authenticate the DID
    const did = new DID({
      provider: new Ed25519Provider(seed),
      resolver: getResolver(),
    });
    await did.authenticate();

    // Connect to the local Ceramic node
    const ceramic = new CeramicClient(
      ceramicNode || "https://ceramic-clay.3boxlabs.com"
    );
    ceramic.did = did;

    // Create a manager for the model

    // Return an array of deployed model aliases
    const modelArray = await Promise.all(
      modelDetails.map(
        async ({ schema, name, description, schemaAlias, definitionAlias }) => {
          const manager = new ModelManager({ ceramic });

          // Create the model schema
          const timelinesSchemaID = await manager.createSchema(
            schemaAlias,
            JSON.parse(JSON.stringify(schema))
          );

          // Create the definition using the created schema ID
          await manager.createDefinition(definitionAlias, {
            name,
            description,
            schema: manager.getSchemaURL(timelinesSchemaID)!,
          });

          // Deploy model to Ceramic node
          const model = await manager.deploy();
          console.log(model);
          return model;
        }
      )
    );

    result = { state: "successful", data: modelArray };
    return result;
  } catch (error) {
    console.error(error);
    result = { state: "failed", data: "An error occurred." };
    return result;
  }
};

export default deployModels;
