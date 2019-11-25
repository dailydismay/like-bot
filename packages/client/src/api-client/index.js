import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000"
});

export const addLikes = async (page_url, total) => {
  await client.post(`/likes`, {
    page_url,
    total
  });
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
