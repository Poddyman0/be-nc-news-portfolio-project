  const request = require('supertest')
  const app = require('../app.js')
  const seed = require('../db/seeds/seed.js');
  const testData = require('../db/data/test-data/index.js');
  const endpointsJSON = require('../endpoints.json')
  const db = require('../db/connection.js')

  beforeEach(() => {return seed(testData)})
  afterAll(() => db.end())

  describe("/api/topics", () => {
    test("get 200: when passed an array of objects returns an array of objects which arent mutated", () => {
        return request(app).get('/api/topics').expect(200)
        .then((res) => {
            const {topics} = res.body
            expect(Array.isArray(topics)).toEqual(true)
            expect(topics.length).toBe(3);
            expect(topics).toEqual(topics);
            topics.forEach(topic => {
                    expect(topic).toEqual(
                      expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String)
                      })
                    );
                  })
                })
        })
    test("get 200: when passed an array of objects returns an array of objects whith same properties", () => {
        return request(app).get('/api/topics').expect(200)
        .then((res) => {
            const {topics} = res.body
            expect(topics[0].hasOwnProperty('slug')).toBe(true);
            expect(topics[0].hasOwnProperty('description')).toBe(true);
            expect(topics[1].hasOwnProperty('slug')).toBe(true);
            expect(topics[1].hasOwnProperty('description')).toBe(true);
            expect(topics[2].hasOwnProperty('slug')).toBe(true);
            expect(topics[2].hasOwnProperty('description')).toBe(true);
        })
    })
    test("get 200: when given an array of objects, returns the same values", () => {
        return request(app).get('/api/topics').expect(200)
        .then((res) => {
            const {topics} = res.body    
            expect(topics[0].slug).toEqual('mitch');
            expect(topics[0].description).toEqual('The man, the Mitch, the legend');
            expect(topics[1].slug).toEqual('cats');
            expect(topics[1].description).toEqual('Not dogs',);
            expect(topics[2].slug).toEqual('paper');
            expect(topics[2].description).toEqual('what books are made of');
        })
    })
    //copy over to other tests where 400 is 404
    test('status:404, responds with an error message when passed a invalid topic path', () => {
        return request(app)
          .get('/api/banana')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('not found');
          });
      });
});
describe("GET /api", () => {
    test("200 GET: responds with a JSON object containing all endpoints", () => {
        return request(app).get('/api').expect(200)
            .then((res) => {
                const endpoints = res.body
                expect(endpoints).toEqual(endpointsJSON)
                expect(endpoints).toMatchObject(endpointsJSON)
            })
    })
    test('status:404, responds with an error message when passed a invalid api', () => {
        return request(app)
          .get('/banana')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('not found');
          });
      });
})

describe("GET /api/articles/:article_id", () => {
    test("200 GET: when passed an object returns an object", () => {
        return request(app).get('/api/articles/1').expect(200)
        .then((res) => {
            let {articles} = res.body;
            expect(typeof articles).toEqual('object');
        })
    })
    });

    test("200 GET: responds with an article object by article ID", () => {
        const result = {
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          }    
        return request(app).get('/api/articles/1').expect(200)
        .then((res) => {
            const {articles} = res.body;
            expect(articles).toMatchObject(result)
        })
    })
    test("200 GET: responds with an article object by article ID with properties author, title, article_id, body, topic, created_at, votes, article_img_url", () => {  
        return request(app).get('/api/articles/1').expect(200)
        .then((res) => {
            const {articles} = res.body;
            expect(typeof articles).toBe("object")
            expect(articles).toEqual(
                      expect.objectContaining({
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        created_at: expect.any(String),
                        article_img_url: expect.any(String),
                        article_id: expect.any(Number),
                        votes: expect.any(Number)
                      })
                    );
                })
            })

    test('status:400, responds with an error message when passed a invalid input_id input', () => {
            return request(app)
              .get('/api/articles/banana')
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe('Invalid input');
              });
          });
    test('status:404, responds with an error message when a valid input_ID which does not exist on the database', () => {
            return request(app)
              .get('/api/articles/900')
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).toBe('article_id does not exist in databse');
              });
          });

describe("GET /api/articles", () => {
    test("200 GET: responds with array of all article objects with comment_count added", () => {
    return request(app).get('/api/articles').expect(200)
    .then((res) => {
        const {articles} = res.body
            expect(Array.isArray(articles)).toEqual(true)
            expect(articles.length).toBe(13);
                articles.forEach(article => {
                      expect(article).toMatchObject({
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        article_img_url: expect.any(String),
                        article_id: expect.any(Number),
                        votes: expect.any(Number),
                        comment_count: expect.any(Number)
                      })
                    
                })
            })
    })
    test("200 GET: responds with array of all article objects sorted by date in descending order", () => {
        return request(app).get('/api/articles').expect(200)
        .then((response) => {
            const { articles } = response.body;
            const articleDateOrderedArr = articles.map(article => article.created_at);
          
            function isDescendingOrder(arr) {
              for (let i = 1; i < arr.length; i++) {
                if (arr[i] > arr[i - 1]) {
                  return false;
                }
              }
              return true;
            }
          
            expect(isDescendingOrder(articleDateOrderedArr)).toBe(true);
          });
    })

    test("200 GET: responds with array of all article object with body property removed", () => {
        return request(app).get('/api/articles').expect(200)
        .then((res) => {
        const {articles} = res.body
            articles.forEach(article => {
                expect(article.hasOwnProperty('body')).toBe(false);
            })
        })
    })
    test('status:404, responds with an error message when passed a article input', () => {
        return request(app)
          .get('/api/banana')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('not found');
          });
    });
})

describe("get /api/articles/:article_id/comments", () => {
    test("200 get: returns an array with properties of comment_id, cotes, created_at, author, body, article_id", () => {
    return request(app).get('/api/articles/1/comments').expect(200)
    .then(({body}) => {
        const comments = body.comments
        expect(Array.isArray(comments)).toBe(true)
            expect(comments.length).toBe(11);
                comments.forEach(comment => {
                    expect(comment).toEqual(
                      expect.objectContaining({
                        body: expect.any(String),
                        votes: expect.any(Number),
                        author: expect.any(String),
                        article_id: expect.any(Number),
                        created_at: expect.any(String),
                        comment_id: expect.any(Number)
                      })
                    );
                })
            })
    })

    test("200 get: responds with array of all comments objects sorted by date in descending order", () => {
        return request(app).get('/api/articles/1/comments').expect(200)
        .then((res) => {
            const {comments} = res.body
            expect(comments).toBeSortedBy("created_at", {descending: true})
            })
        })   
    test('status:404 get, responds with an error message when passed a invalid article input', () => {
            return request(app)
              .get('/api/banana/1/comments')
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).toBe('not found');
              });
    })

    test('status:404 get, responds with an error message when a valid input_ID which does not exist on the database', () => {
        return request(app)
          .get('/api/articles/900/comments')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('article_id does not exist in databse');
          });
    })
})
describe("post /api/articles/:article_id/comments", () => {
    test("200 post: requests an object with body and udername properties", () => {
    return request(app).post('/api/articles/1/comments').send({username: 'butter_bridge', body: 'gamer'}).expect(200)
    .then((request) => {
        const {comments} = request.body
        expect(typeof comments).toBe('object')
        expect(comments).toEqual(
            expect.objectContaining({
              body: expect.any(String),
              author: expect.any(String)
            })
            )
        })
    })
    test("200 post: respons with posted comment", () => {
        return request(app).post('/api/articles/1/comments').send({username: 'butter_bridge', body: 'gamer'}).expect(200)
        .then((respond) => {
            const {comments} = respond.body
            expect(typeof comments).toBe('object')
            expect(comments).toEqual(
                expect.objectContaining({
                  body: expect.any(String),
                  votes: expect.any(Number),
                  author: expect.any(String),
                  article_id: expect.any(Number),
                  created_at: expect.any(String),
                  comment_id: expect.any(Number)
                })
              );
            })
        })
    test('status:404 post, responds with an error message when passed a invalid article input', () => {
        return request(app)
          .post('/api/banana/1/comments')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('not found');
          });
    })
    test('status:404 post, responds with an error message when a valid input_ID which does not exist on the database', () => {
    return request(app)
      .post('/api/articles/900/comments')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('article_id does not exist in databse');
      });
    })

})

describe("patch /api/articles/:article_id", () => {

    test("200 patch: responds with an object with body and username properties", () => {
        return request(app).patch('/api/articles/1').send({inc_votes: -1 }).expect(200)
        .then((respond) => {
            const {articles} = respond.body
            expect(typeof articles).toBe('object')
            expect(articles).toEqual(
                    expect.objectContaining({
                      title: expect.any(String),
                      topic: expect.any(String),
                      author: expect.any(String),
                      body: expect.any(String),
                      created_at: expect.any(String),
                      article_img_url: expect.any(String),
                      article_id: expect.any(Number),
                      votes: expect.any(Number)
                    })
                  );
            })
        })

})

    test('status:404 patch, responds with an error message when passed a invalid article input', () => {
        return request(app)
          .patch('/api/banana/comments')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('not found');
          });
    })

    test('status:404 get, responds with an error message when a valid input_ID which does not exist on the database', () => {
    return request(app)
      .patch('/api/articles/900')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('article_id does not exist in databse');
      });
})

describe("DELETE /api/articles/:article_id", () => {
    test("204 delete: deletes comment by id", () => {
    return request(app).delete('/api/comments/5').expect(204)
    })
})
// add in 404 test = 'article does not exist in database'
describe("/api/users", () => {
    test("get 200: when passed an array of objects returns an array of objects which arent mutated and have same properties", () => {
        return request(app).get('/api/users').expect(200)
        .then((res) => {
            const {articles} = res.body
            expect(Array.isArray(articles)).toEqual(true)
            expect(articles.length).toBe(4);
            expect(articles).toEqual(articles);
            articles.forEach(article => {
                    expect(article).toEqual(
                      expect.objectContaining({
                        username: expect.any(String),
                        name: expect.any(String),
                        avatar_url: expect.any(String)
                      })
                    );
                  })
                })
        })

    test("get 200: when given an array of objects, returns the same values", () => {
        return request(app).get('/api/users').expect(200)
        .then((res) => {
            const {articles} = res.body    
            expect(articles[0].username).toEqual('butter_bridge');
            expect(articles[0].name).toEqual('jonny');
            expect(articles[0].avatar_url).toEqual('https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg');
            expect(articles[1].username).toEqual('icellusedkars');
            expect(articles[1].name).toEqual('sam');
            expect(articles[1].avatar_url).toEqual('https://avatars2.githubusercontent.com/u/24604688?s=460&v=4');
            expect(articles[2].username).toEqual('rogersop');
            expect(articles[2].name).toEqual('paul');
            expect(articles[2].avatar_url).toEqual('https://avatars2.githubusercontent.com/u/24394918?s=400&v=4');
            expect(articles[3].username).toEqual('lurker');
            expect(articles[3].name).toEqual('do_nothing');
            expect(articles[3].avatar_url).toEqual('https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png');
        })
    })

    //copy over to other tests where 400 is 404
    test('status:404, responds with an error message when passed a invalid topic path', () => {
        return request(app)
          .get('/api/banana')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('not found');
          });
      });
});
//task 7: adds a comment to article
//change patch -  responds with posted comment

/*
task 9:
404
400 error msgs

task 10:
404
400

*/
