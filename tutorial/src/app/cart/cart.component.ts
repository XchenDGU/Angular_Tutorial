import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {
  items;
  checkoutForm;
  totalPrice = 0;
  constructor(
    private cartService:CartService,
    private formBuilder:FormBuilder,
  ) { 
    this.items = cartService.getItems();
    this.calc_total();
    //console.warn(this.totalPrice);
    this.checkoutForm = this.formBuilder.group({
      name:['',Validators.required],
      address:['',Validators.required],
    });
  }

  ngOnInit() {
    console.log("cart loaded");
  }
  calc_total(){
    this.totalPrice = this.items.reduce((sum,current)=>sum+current.price,0);
  }

  onSubmit(customerData){
    window.alert('Your order has been submitted');
    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
    this.totalPrice = 0;
  }

  removeItem(itemId){
    window.alert(`Item ${this.items[itemId].name} has been removed :`);
    this.cartService.removeItem(itemId);
    this.calc_total();
  }
}
