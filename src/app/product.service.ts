import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, tap } from 'rxjs';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  private products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this.products = products)
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.getProducts().pipe(
      map(products => {
        const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
        product.id = maxId + 1;
        return product;
      }),
      switchMap(newProduct => this.http.post<Product>(this.apiUrl, newProduct)),
      tap(addedProduct => {
        this.products.push(addedProduct);
      })
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}