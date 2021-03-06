import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './../user.service';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Router } from '@angular/router';






interface newItem{
  name?:string;
  qty?:number;
}

@Component({
  selector: 'app-additems',
  templateUrl: './additems.page.html',
  styleUrls: ['./additems.page.scss'],
})
export class AdditemsPage implements OnInit {

  item:newItem={};


  constructor(
    public store:AngularFirestore,
    public afAuth :AngularFireAuth, 
    public userService: UserService, 
    private router: Router



  ) { }

  ngOnInit() {
  }

  createItem(){
        var record ={};
        record['name'] = this.item.name;
        record['qty'] = this.item.qty;
        
        var selectedFile = (<HTMLInputElement>document.getElementById('input')).files[0];
        
        
        if(record['name']==undefined || record['qty']==undefined){
          alert("Name and Quantity are Required")
        }

        else if(selectedFile==undefined){




          // this.store.collection('sales').doc(this.userService.getSaleID()).collection('items').doc('item1').ref.get().
          // then(doc => {
          //   if(doc.exists){
          //     this.store.collection('sales').doc(this.userService.getSaleID()).collection('items').doc('item1').delete();
          //   }else{
          //     console.log("already has items");
          //   }
    
            
          // }).catch(function(error) {
          //   console.log("Error removing placeholder:", error);
          // });


            record['picture']="";
            record['storage'] = "";

            this.store.collection('sales').doc(this.userService.getSaleID()).collection('items').add(record).catch(error => {
            
            });
            alert("Success!")

              this.item.name="";
              this.item.qty=null;
        
            (<HTMLInputElement>document.getElementById('input')).value="";
        }
        else{
          console.log("getting there safsad")

          this.store.collection('sales').doc(this.userService.getSaleID()).collection('items').doc('item1').ref.get().
          then(doc => {
            if(doc.exists){
              this.store.collection('sales').doc(this.userService.getSaleID()).collection('items').doc('item1').delete();
            }else{
              console.log("already has items");
            }
    
            
          }).catch(function(error) {
            console.log("Error removing placeholder:", error);
          });

              firebase.storage().ref('img').child(selectedFile.name).put(selectedFile).then(doc =>{
              

                
                firebase.storage().ref().child(doc.ref.fullPath).getDownloadURL().then(url => {
                  record['picture'] = url;
                  record['storage'] = doc.ref.fullPath;
      
      
                this.store.collection('sales').doc(this.userService.getSaleID()).collection('items').add(record).then(doc =>{

                })
              .catch(function(error) {
                  console.error("Error adding item: ", error);
              });
                                
              }).catch(function(error){
                alert("Picture Error");
              });
            });
              alert("Success!")
              this.item.name="";
              this.item.qty=null;
          
          (<HTMLInputElement>document.getElementById('input')).value="";
        }




        



  }
  goBack(){
    this.router.navigateByUrl('/tabs/tab1');
  }
  
  

}


