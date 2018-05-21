import d from 'debug';
import mongoDb from '../db/mongoDb.mjs';
import rd from '../data/referenceData.mjs';

const collectionName = 'referencedata';
const debug = d('app:referenceDataService');

const rdService = {

  collection() {
    return mongoDb.db().collection(collectionName);
  },

  async reload() {
    await rdService.collection().deleteMany();
    rdService.data = undefined;
    return rdService.collection().insertOne(rd);
  },

  async get() {
    if (!rdService.data) {
      // Cache the RD as it should not change often
      debug('Caching Reference Data from database');
      rdService.data = await rdService.collection().findOne();
    }
    return rdService.data;
  },
};

export default rdService;
