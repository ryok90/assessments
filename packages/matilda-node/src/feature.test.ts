import request from 'supertest';
import { createServer } from './config';
import names from '../names.json';
import { client } from './db';

describe('e2e', () => {
  const app = createServer();
  const entries = Object.entries(names);

  describe('GET - /typeahead/:prefix?', () => {
    it('should successfully retrieve list for prefix', async () => {
      const [name, times] = entries[0];
      const { body, status } = await request(app).get(`/typeahead/${name}`);

      expect(status).toEqual(200);
      expect(body).toEqual(expect.arrayContaining([{ name, times }]));
    });

    it('should successfully retrieve list with no prefix', async () => {
      const { body, status } = await request(app).get('/typeahead');

      expect(status).toEqual(200);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            times: expect.any(Number),
          }),
        ]),
      );
    });

    it('should respond empty array on nonexistent name', async () => {
      const { body, status } = await request(app).get('/typeahead/asdfasdf');

      expect(status).toEqual(200);
      expect(body).toEqual([]);
    });
  });

  describe('POST - /typeahead', () => {
    it("should successfully increment a name's popularity", async () => {
      const [name, times] = entries[0];
      const { body, status } = await request(app)
        .post(`/typeahead`)
        .send({ name });

      expect(status).toEqual(201);
      expect(body).toEqual({ name, times: times + 1 });
    });

    it('should respond with 400 when the name is not found', async () => {
      const { status, text } = await request(app)
        .post(`/typeahead`)
        .send({ name: 'asdfasdf' });

      expect(status).toEqual(400);
      expect(text).toEqual('Bad request');
    });

    it('should respond with 400 if the request body is not properly formed', async () => {
      const { status, text } = await request(app)
        .post(`/typeahead`)
        .send({ asdf: 'asdfasdf' });

      expect(status).toEqual(400);
      expect(text).toEqual('Bad request');
    });

    it('should respond with 500 on unexpected error', async () => {
      jest.spyOn(client, 'bumpTimes').mockImplementationOnce(() => {
        throw new Error();
      });
      jest.spyOn(console, 'error').mockImplementationOnce(() => null);

      const { status, text } = await request(app)
        .post(`/typeahead`)
        .send({ name: 'test' });

      expect(status).toEqual(500);
      expect(text).toEqual('Internal server error');
    });
  });
});
