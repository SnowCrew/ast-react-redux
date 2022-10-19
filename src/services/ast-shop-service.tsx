//https://fakestoreapi.com/docs

import { IProduct } from '../redux/reducers/reducer';

export interface IUser{
  id:number,
  email:string,
  username:string,
  password:string
};

export default class AstService {
  _apiBase:string = "https://fakestoreapi.com";

  async getResource(url:string):Promise<IProduct[] | IUser[]> {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json();
  }

  async getAllProducts() {
    return await this.getResource('/products') as IProduct[]

  }
  
  async getAllUsers(){
    return await this.getResource('/users') as IUser[]
  }
}
