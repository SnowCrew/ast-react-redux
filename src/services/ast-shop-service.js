//https://fakestoreapi.com/docs

export default class AstService {
  _apiBase = "https://fakestoreapi.com";

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json();
  }

  async getAllProducts() {
    return await this.getResource('/products')

  }
  async getSingleProduct(id) {
    return await this.getResource(`/products/${id}`)

  }
}
