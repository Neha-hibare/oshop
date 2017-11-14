import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  

  create(category) { 
    return this.db.list('/categories').push(category);
  }

  getAll() { 
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  get(categoryId) { 
    return this.db.object('/categories/' + categoryId);
  }

  update(categoryId, category) { 
    return this.db.object('/categories/' + categoryId).update(category);
  }

  delete(categoryId) { 
    return this.db.object('/categories/' + categoryId).remove();
  }
}
