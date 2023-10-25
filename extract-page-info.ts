import type { PageInfoContext } from "./page-info";
import { findPaginatedResourcePath, get } from "./object-helpers";

const extractPageInfos = (responseData: any): PageInfoContext => {
  const pageInfoPath = findPaginatedResourcePath(responseData);

  return {
    pathInQuery: pageInfoPath,
    pageInfo: get(responseData, [...pageInfoPath, "pageInfo"]),
  };
};

export { extractPageInfos };
