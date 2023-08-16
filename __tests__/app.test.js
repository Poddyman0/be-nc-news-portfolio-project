/*const {
    getApiTopics,
    readArticleID,
  } = require("../db/seeds/utils");*/
  const request = require('supertest')
  const app = require('../db/app.js')
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
});
describe("GET /api", () => {
    test("200 GET: responds with a JSON object containing all endpoints", () => {
        return request(app).get('/api').expect(200)
            .then((res) => {
                const {endpoints} = res.body
                expect(endpoints).toEqual(endpointsJSON)
                expect(endpoints).toMatchObject(endpointsJSON)
            })
    })
})
/*
describe("GET /api/articles/:article_id", () => {
    test("200 GET: when passed an object returns an object", () => {
        return request(app).get('/api/articles/1').expect(200)
        .then((res) => {
            let {articles} = res.body;
            expect(typeof articles).toEqual('object');
        })
    })
    });
*/
    /*test("200 GET: responds with an article object by article ID", () => {
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
    */
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
    //additional tests: 400 invalid ID e.g. banana, 404 non-existant ID e.g. 900
/*
  describe('GET /api/articles/:article_id', () => {
    it('supertest - responds with object containing article by requested ID', () => {
      return request(app).get('/api/articles/:article_id');
    })
    it('supertest - responds with error codes tests of HTTP status, header fields and values', () => {
      return request(app)
        .get('/api/articles/:article_id')
        .expect(200)
        .expect('Content-Type', 'application/json');
    })
    it('supertest - response text', () => {
      let result = readArticleID(JSON.parse(testGetAPI))
      return request(app)
        .get('/api/articles/:article_id')
        .expect(200)
        .then ((res) => {
          expect(res).toEqual(result);
          expect(res).not.toBe(result);
          expect(res.length).toBe(4);
    })
  })
  describe("articleDateSortAndBodyDeletion", () => {
    test("when passed an objects returns an object", () => {
      let result = articleDateSortAndBodyDeletion(JSON.parse(testGetAPI))
      expect(typeof result).toEqual('object');
    })
    test(`when given multiple articles objects (noted by ${i}), returns the same properties`, () => {
      let result = articleDateSortAndBodyDeletion(JSON.parse(testGetAPI))
      result.exampleResponse.articles.forEach((article, i) => {
            expect(article.hasOwnProperty('author')).toBe(true);
            expect(article.hasOwnProperty('title')).toBe(true);
            expect(article.hasOwnProperty('article_id')).toBe(true);
            expect(article.hasOwnProperty('body')).toBe(true);
            expect(article.hasOwnProperty('topic')).toBe(true);
            expect(article.hasOwnProperty('created_at')).toBe(true);
            expect(article.hasOwnProperty('votes')).toBe(true);
            expect(article.hasOwnProperty('article_img_url')).toBe(true);
        });
    });
    });
    test("when passed object containing object, does not mutate original object", () => {
      let result = articleDateSortAndBodyDeletion(JSON.parse(testGetAPI))
      expect(result).not.toBe(testGetAPI);
      expect(result.length).toBe(4);
  })
  describe('GET /api/articles', () => {
    it('supertest - responds with object containing all articles', () => {
      return request(app).get('/api/articles');
    })
    it('supertest - responds with error codes tests of HTTP status, header fields and values', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .expect('Content-Type', 'application/json');
    })
    it('supertest - response text', () => {
      let result = articleDateSortAndBodyDeletion(JSON.parse(testGetAPI))
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then ((res) => {
          expect(res).toEqual(result);
          expect(res).not.toBe(result);
          expect(res.length).toBe(result.length);
    })
  })
  })
  })
  */