import API from "./axios";

export const getTransactions = async (email) => {
  const response = await API.get(`/transactions?email=${email}`);
  return response.data;
};

export const getTransaction = async (id) => {
  const response = await API.get(`/transactions/${id}`);
  return response.data;
};

export const createTransaction = async (transaction) => {
  const response = await API.post("/transactions", transaction);
  return response.data;
};

export const updateTransaction = async (id, transaction) => {
  const response = await API.put(`/transactions/${id}`, transaction);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await API.delete(`/transactions/${id}`);
  return response.data;
};
