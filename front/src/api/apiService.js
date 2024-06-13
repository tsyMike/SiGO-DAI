import axiosInstance from './axiosConfig';
import { createSuspender } from "./fetcher";

export function fetchData(url) {
  return createSuspender(axiosInstance.get(url).then((response) => response.data));
}

export function postData(url, data) {
  return createSuspender(axiosInstance.post(url, data).then((response) => response.data));
}

export function putData(url, data) {
  return createSuspender(axiosInstance.put(url, data).then((response) => response.data));
}

export function deleteData(url) {
  return createSuspender(axiosInstance.delete(url).then((response) => response.data));
}
