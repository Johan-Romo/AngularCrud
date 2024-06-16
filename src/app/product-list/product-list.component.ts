import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {
  
  deleteProduct(id: number): void {
    this.router.navigate(['/product-delete', id]);
  }

  editProduct(id: number): void {
    this.router.navigate(['/product-edit', id]);
  }
  products: Product[] = [];
  
  constructor(private productService: ProductService, private router: Router) {}


  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
}