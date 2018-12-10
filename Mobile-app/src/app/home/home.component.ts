import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrays: string[] = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];
  protectAll: object = {
    'aaa': ['product0', "product1", "product2", "product3", "product4", "product5", "product6"],
    'bbb': ['goods0', "goods1", "goods2", "goods3", "goods4", "goods5", "goods6"],
    'ccc': ['food0', "food1", "food2", "food3", "food4", "food5", "food6"],
    'ddd': ['book0', "book1", "book2", "book3", "book4", "book5", "book6"],
    'eee': ['image0', "image1", "image2", "image3", "image4", "image5", "product6"]
  };
  protects: string[];
  seller: string;
  searchValue:string = '';
  constructor() { }

  ngOnInit() {
    this.protects = this.protectAll[this.arrays[0]];
    this.seller = this.arrays[0];
  }

  onSearchSeller(index: number){
    this.seller = this.arrays[index];
    this.protects = this.protectAll[this.seller]
  }

  onSearchType(value: any) {
    // 后期要和商家id一起过滤产品信息
    console.log('商品类型：' + value);
    console.log('商家信息' + this.seller);
    this.searchValue = null;
  }


}
