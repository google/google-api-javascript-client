// ************************************************************
// THIS CODE IS NOT EXECUTED. IT IS JUST FOR TYPECHECKING
// ************************************************************

import { Octokit } from "@octokit/core";
import { paginateGraphql, PageInfoBackward, PageInfoForward } from "../src";
import { TestResponseType } from "./testHelpers/mock-response";

const MyOctokit = Octokit.plugin(paginateGraphql);
const octokit = new MyOctokit();

const query = `
query paginate ($cursor: String) {
  repository(owner: "octokit", name: "rest.js") {
    issues(first: 10, after: $cursor) {
      nodes {
        title
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;
export async function typedPaginate() {
  const response = await octokit.graphql.paginate<TestResponseType>(query);

  console.log(response.repository.issues.nodes?.length);
}

export async function typedIterator() {
  const iterator = octokit.graphql.paginate.iterator<TestResponseType>(query);
  for await (const response of iterator) {
    console.log(response.repository.issues.nodes?.length);
  }
}

export function pageInfoBackwaredExported(): PageInfoBackward {
  return {
    hasPreviousPage: true,
    startCursor: "startCursor",
  };
}

export function pageInfoForwardExported(): PageInfoForward {
  return {
    hasNextPage: true,
    endCursor: "endCursor",
  };
}
