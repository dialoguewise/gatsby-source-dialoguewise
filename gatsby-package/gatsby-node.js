const fetch = require("node-fetch");
const DIALOGUE_NODE_TYPE = `DialogueWise`;

function isValid(param) {
  return !(param == null || String(param).trim() == "");
}

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  pluginOptions
) => {
  const { createNode } = actions;

  const requests = {
    ...{
      accessToken: "",
      dialogues: [],
    },
    ...pluginOptions,
  };
  const apiBaseUrl =
    (typeof requests.apiBaseUrl !== "undefined"
      ? requests.apiBaseUrl
      : "https://api.dialoguewise.com") + "/api/";

  var nodes = [];

  for (const dialogue of requests.dialogues) {
    if (!isValid(dialogue.slug)) {
      throw "Please provide a slug";
    }

    //The page flag allows you to get paginated data. If not passed it will return all data.
    if (
      (!isValid(dialogue.pageSize) && isValid(dialogue.pageIndex)) ||
      (isValid(dialogue.pageSize) && !isValid(dialogue.pageIndex))
    ) {
      throw "Please set both pageSize and pageIndex";
    }

    const request = {
      slug: dialogue.slug,
      isPilotVersion: dialogue.isPilot,
      variables: dialogue.variableList,
      pageSize: dialogue.pageSize,
      pageIndex: dialogue.pageIndex,
    };

    const apiUrl = apiBaseUrl + "dialogue/getContents";

    const headers = {
      "Content-Type": "application/json",
      "Access-Token": requests.accessToken,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "Content-Type, Access-Token",
    };

    var nodeDialogueData = {
      slug: request.slug,
      content: "",
      error: "",
    };
    try {
      const response = await fetch(apiUrl, {
        method: "post",
        headers: headers,
        body: JSON.stringify(request),
      });

      if (response.status !== 200) {
        nodeDialogueData.error = response.statusText;
      } else {
        const respJson = await response.json();
        nodeDialogueData.content = respJson.data
          ? JSON.stringify(respJson.data.contents)
          : "";
      }
    } catch (err) {
      nodeDialogueData.error = err.message;
    }
    nodes.push(nodeDialogueData);
  }

  // loop through data and create Gatsby nodes
  nodes.forEach((node) =>
    createNode({
      ...node,
      id: createNodeId(`${DIALOGUE_NODE_TYPE}-${node.slug}`),
      parent: null,
      children: [],
      internal: {
        type: DIALOGUE_NODE_TYPE,
        content: JSON.stringify(node),
        contentDigest: createContentDigest(node),
      },
    })
  );

  return;
};

exports.onPreInit = () => console.log("Loaded dialoguewise-source-plugin");
