import {Component} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Order} from "../../entities/order";
import {ActivatedRoute} from "@angular/router";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent {
  showTableClicked: boolean = false;

  orders: Order[];

  newOrders: Order[] = [];
  inProcessOrders: Order[] = [];
  waitingPaymentOrders: Order[] = [];

  constructor(private service: OrderService,
              public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  showTable() {
    this.showTableClicked = true;
    this.fetchOrders();
  }

  showAll() {
    this.showTableClicked = false;
    this.getAllOrders();
  }

  private getAllOrders() {
    this.service
      .getAllOrders()
      .subscribe(response => {
        this.orders = response;
      });
  }

  private fetchOrders() {
    this.service.getNewOrders().subscribe((data) => {
      this.newOrders = data;
    });

    this.service.getInProcessOrders().subscribe((data) => {
      this.inProcessOrders = data;
    });

    this.service.getWaitingPaymentOrders().subscribe((data) => {
      this.waitingPaymentOrders = data;
    });
  }

  drop(event: CdkDragDrop<Order[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      let index: number = event.currentIndex;
      let order: Order = event.container.data.at(index)!;
      let status: string = event.container.id;
      let newStatus: string;

      if (status == 'inProcess') {
        newStatus = 'IN PROCESS'
      } else if (status == 'waitingForPayment') {
        newStatus = 'WAITING PAYMENT'
      } else {
        newStatus = 'NEW';
      }

      this.updateOrder(order, newStatus);
    }
  }

  moveToArchive(order: Order) {
    let newStatus: string = 'ARCHIVE';
    this.updateOrder(order, newStatus);

    const index = this.waitingPaymentOrders.indexOf(order);
    if (index > -1) {
      this.waitingPaymentOrders.splice(index, 1);
    }
  }

  updateOrder(order: Order, newStatus: string) {
    this.service.update(order.id, newStatus).subscribe(
      (updatedOrder) => {
        console.log('Order status updated:', updatedOrder.status);
        order.status = newStatus;
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );
  }

}
