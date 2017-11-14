import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take'; 

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  //styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categories$;
  category = {}; 
  id;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.categoryService.get(this.id).take(1).subscribe(p => this.category = p);
  }

  save(category) { 
    
    if (this.id) this.categoryService.update(this.id, category);
    else this.categoryService.create(category);
    
    this.router.navigate(['/admin/category']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    this.categoryService.delete(this.id);
    this.router.navigate(['/admin/category']);
  }

  ngOnInit() {
  }

}
