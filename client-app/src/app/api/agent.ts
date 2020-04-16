import axios, { AxiosResponse } from 'axios';
import { IActivity } from "../models/activity";
import { promises, resolve } from 'dns';
axios.defaults.baseURL='https://localhost:5001/api';
const responseBody=(response:AxiosResponse)=>response.data;
const sleep=(ms:number)=>(response:AxiosResponse)=>
   new Promise<AxiosResponse>(resolve => setTimeout(()=>resolve(response),ms));
const requests={
    get:(url:string)=>axios.get(url).then(sleep(1000)).then(responseBody),
    post:(url:string,body:{},header:{})=>axios.post(url,body,header).then(sleep(1000)).then(responseBody),
    put:(url:string,body:{},header:{})=>axios.put(url,body,header).then(sleep(1000)).then(responseBody),
    delete:(url:string)=>axios.post(url).then(sleep(1000)).then(responseBody)
}
//axios.post(`https://localhost:44326/api/Activities/Edit/${activity.id}`,activity,{headers:headers})
const header = {
    'Content-Type': 'application/json'
    //'Authorization': 'JWT fefege...'
  }
const Activities={
    list:(): Promise<IActivity[]>=>requests.get('/Activities/List'),
    details:(id:string)=>requests.get(`/activities/Details/${id}`),
    create:(activity:IActivity) => requests.post('/Activities/Create',activity,header),
  // create:(id:string) => requests.get(`/Activities/Create/${id}`),
    update :(activity:IActivity)=> requests.post(`/Activities/Edit/${activity.id}`,activity,header),
    delete :(id:string)=> requests.get(`/Activities/Delete/${id}`)
}
export default{
    Activities
}