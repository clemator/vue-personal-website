import client from '@/repositories/client';

const resource = '/authentication';
const loginResource = '/login';

export default {
  login(payload) {
    return client.post(`${resource}${loginResource}`, payload);
  }
};