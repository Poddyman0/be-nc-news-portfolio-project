exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};

exports.getApiTopics = (topics) => {
  let copyTopics = [...topics]
  return copyTopics;
};

/*
if (Array.isArray(copyObj)) {
    return copyObj.map(item => filterProperties(item));
}

return Object.entries(copyObj)
    .filter(([key]) => ['description', 'queries', 'example response'].includes(key))
    .reduce((filteredObj, [key, value]) => {
        filteredObj[key] = filterProperties(value);
        return filteredObj;
    }, {});
}
/*
exports.readArticleID = (inputData, targetArticleId) => {
    const articles = [];
    function extractArticles(obj) {
        for (const key in obj) {
            if (key === 'articles') {
                articles.push(...obj[key]);
            } else if (typeof obj[key] === 'object') {
                extractExamples(obj[key]);
            }
        }
    }

    extractExamples(inputData);

    const result = exampleResponses
        .filter(response => response.articles.article_id === targetArticleId);

    return result;
}
exports.articleDateSortAndBodyDeletion = () => {
  const endpoint = processedArticles();
  const allArticles = endpoint.exampleResponse.flatMap(response => {
    if (!response.articles) return []; 

    return response.articles.map(article => {
        const { body, ...articleWithoutBody } = article;
        return articleWithoutBody;
    });
}).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

return allArticles;

}
*/
