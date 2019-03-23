//import fetch from 'isomorphic-fetch'
//import { users, departments } from '../mock'

const usersURL = 'http://www.mocky.io/v2/5c9585843600001818941f68';
const departmentsURL = 'http://www.mocky.io/v2/5c9585ce3600006c15941f6a';

// OLD METHODS WITH MOCK API
/*
export const getUsers = async (start = 0, size = users.length) => {
  return new Promise(resolve => setTimeout(() =>{
    resolve(users.slice(start, (start + size)))
  }, 2000))
};

export const getDepartments = async (start = 0, size = users.length) => {
  return new Promise(resolve => setTimeout(() => {
    resolve(departments.slice(start, (start + size)))
  }, 1500))
};
*/

export const getUsersNew = async () => {
  try{
    const request = await fetch(usersURL);
    const data = await request.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getDepartmentsNew = async () => {
  try{
    const request = await fetch(departmentsURL);
    const data = await request.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};