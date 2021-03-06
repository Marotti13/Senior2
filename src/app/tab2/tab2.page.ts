import { Component,OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';





@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  
  tests:any;
  test:string;

  constructor(public userService: UserService, public afAuth :AngularFireAuth,private router: Router) {}

  ngOnInit() {

    if(this.afAuth.auth.currentUser){
      this.userService.read_Workouts().subscribe(data =>{
        this.tests = data.map(e => {
          return{
            id: e.payload.doc.id,
            isEdit: false,
            Description: e.payload.doc.data()['description'],
            EndTime: new Date(e.payload.doc.data()['endTime']).toLocaleString(),
            StartTime: new Date(e.payload.doc.data()['startTime']).toLocaleString(),
            Title: e.payload.doc.data()['title'],
            Add: e.payload.doc.data()['address']
  
          };
        })
      });
      //this.userService.setId("JpXGJaIsZodIm91GrGow");
    }
    
  }
  items(id:string){
    this.userService.setId(id);
    this.router.navigateByUrl('/items');
  }
  refresh(){
    this.ngOnInit();
  }

  exists(item){
    var current = new Date()
    var end = new Date(item.EndTime)

    if(current<= end){
      return true
    }else{
      return false 
    }
  }
}