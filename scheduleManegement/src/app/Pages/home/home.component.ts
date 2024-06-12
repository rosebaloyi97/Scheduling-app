import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestSenderService } from '../../Services/request-sender.service';
interface TimeSlot {
  id: number;
  timeRange: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private _router :Router,private httpSender:RequestSenderService){

  }
  subjectList:any[] =[];
  timeTable:any[]=[];

  stuff:any;
  ngOnInit(): void {
    this.stuff =this.getUserData()
    console.log(this.stuff)
    if(this.stuff==null){
      sessionStorage.clear();
    }
    this.GetSubject(this.stuff.staffNo)
    this.getSubjectList();
  }


  getUserData(): any {
    const userDataString = sessionStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  }
  logout(){

    sessionStorage.clear();
    this._router.navigateByUrl('login')
  }

  
  timeSlots: TimeSlot[] = [
    { id: 0, timeRange: '08:00 - 09:00' },
    { id: 1, timeRange: '09:00 - 10:00' },
    { id: 2, timeRange: '10:00 - 11:00' },
    { id: 3, timeRange: '11:00 - 12:00' },
    { id: 4, timeRange: '12:00 - 13:00' },
    { id: 5, timeRange: '13:00 - 14:00' },
    { id: 6, timeRange: '14:00 - 15:00' },
    { id: 7, timeRange: '15:00 - 16:00' }
  ];

  GetSubject(id: number): void {
    this.httpSender.sendGet<any>('admin/all-user-subjects/' + id)
      .subscribe(
        (response) => {
          // Handle successful response
          console.log('data:', response.body);
  
          this.subjectList=response.body;
       
        },
        (error) => {
          // Handle error
          console.error('Error:', error);
        }
      );
  }

  getSubjectList(){
    this.httpSender.sendGet<any>("lecture/timeTable/"+this.stuff.staffNo).subscribe(
      (res)=>{
        this.timeTable = res.body
        console.log("Regsiter",this.subjectList)
      }
    )
  }
  
}
