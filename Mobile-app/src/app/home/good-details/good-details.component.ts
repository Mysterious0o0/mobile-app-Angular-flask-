import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HomeService} from "../../services/home.service";

@Component({
  selector: 'app-good-details',
  templateUrl: './good-details.component.html',
  styleUrls: ['./good-details.component.css']
})
export class GoodDetailsComponent implements OnInit {

  goodsId: string;
  goods= {};

  constructor(private router: ActivatedRoute, private homeService: HomeService) {
    this.goodsId = router.snapshot.params['id'];
    this.homeService.showGoodsInfo(this.goodsId).then(response => {
      // console.log(response);
      this.goods = response
    }).catch(err => {
      alert('服务器请求失败，请重试')
    })
  }

  ngOnInit() {
  }

  addCart(){
    this.homeService.addGoods2cart(this.goodsId).then(response => {
      if(response['status'] == 200){
        // alert(response['success'])
      }else {
        alert(response['error'])
      }
    }).catch(err => {
      alert('服务器请求失败，请重试')
    })
  }

}
