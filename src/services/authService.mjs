import d from 'debug';
import mongoDb from '../db/mongoDb.mjs';

const debug = d('app:authService');

const collectionName = 'users';

const authService = {

  collection() {
    return mongoDb.db().collection(collectionName);
  },

  async create(user) {
    debug(`Creating User ${user.username}`);
    const existingUser = await authService.collection().findOne({ username: user.username });
    debug(existingUser);
    if (!existingUser) {
      const results = await authService.collection().insertOne(user);
      return results.ops[0];
    }
    const error = `The username ${user.username} already exists in the database`;
    debug(error);
    return { error };
  },

  getById(id) {
    return authService.collection().findOne({ _id: mongoDb.objectID(id) });
  },
};

export default authService;
