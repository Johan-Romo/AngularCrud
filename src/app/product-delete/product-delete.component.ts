import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-delete',
  standalone: true,
  providers: [ProductService],
  imports: [FormsModule, FormsModule, CommonModule],
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css'
})
export class ProductDeleteComponent {
  product: Product | null = null;

  constructor(
    private productService: ProductService,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe((data: Product) => {
      this.product = data;
    });
  }

  deleteProduct(): void {
    if (this.product) {
      this.productService.deleteProduct(this.product.id).subscribe(() => {
        this.router.navigate(['/product-list']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}