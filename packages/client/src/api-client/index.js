import axios from "axios";

export const baseURL = "https://api-like-rate.herokuapp.com";
// export const baseURL = "http://localhost:3000";

const client = axios.create({
  baseURL
});

export const addLikes = async (page_url, delay) => {
  const { data } = await client.post(`/likes`, {
    page_url,
    delay
  });

  return data;
};

export const createCreds = async body => {
  const { data } = await client.post("/creds", body);
  return data;
};

export const getAllCreds = async (page, perPage) => {
  const { data } = await client.get(`/creds?page=${page}&perPage=${perPage}`);
  return data;
};

export const getCreds = async id => {
  const { data } = await client.get(`/creds/${id}`);
  return data;
};

export const patchCreds = async (id, body) => {
  await client.patch(`/creds/${id}`, body);
};

export const deleteCreds = async id => {
  await client.delete(`/creds/${id}`);
};

export const getAllLikes = async () => {
  const { data } = await client.get("/likes");
  return data;
};

export const getLikes = async id => {
  const { data } = await client.get(`/likes/${id}`);
  return data;
};

export const deleteLikes = async id => {
  await client.delete(`/likes/${id}`);
};

export const getCurrentProxy = async () => {
  const { data } = await client.get("/proxy");
  return data.currentProxy;
};

export const setCurrentProxy = async proxy => {
  const data = await client.post(`/proxy?proxy=${proxy}`);

  return data.currentProxy;
};
