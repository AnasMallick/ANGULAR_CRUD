import { Component, OnInit } from "@angular/core";
import { Student } from "../Models/Student";
import { MyServiceService } from "../Service/my-service.service";


// 

@Component({
    selector: 'std_api',
    template: `
    <h1>Student Page</h1>
    <p>{{ stud | json}}</p>
    <input type="text" name="" id="" class="form-control mt-3 w-50" placeholder="Enter Your Name" [(ngModel)]="stud.std_name">
    <input type="email" name="" id="" class="form-control mt-3 w-50" placeholder="Enter Your Email" [(ngModel)]="stud.std_email">
    <input type="text" name="" id="" class="form-control mt-3 w-50" placeholder="Enter Your Password" [(ngModel)]="stud.std_password">

    <ng-container *ngIf="!is_update else error">
    <button class="btn btn-primary mt-3" (click)="form_submit()">Submit</button>
    </ng-container>

    <ng-template #error>
    <button class="btn btn-warning mt-3" (click)="final_upd()">Submit</button>
    <button class="btn btn-primary ms-3" (click)="cancel_upd()">Cancel</button>
    </ng-template>
    




    <br>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIl</th>
                <th>PASSWORD</th>
            </tr>
            </thead>
            <tbody>
                <tr *ngFor="let item of stud_list">
                    <td>{{ item.std_id}}</td>
                    <td>{{ item.std_name}}</td>
                    <td>{{ item.std_email}}</td>
                    <td>{{ item.std_password}}</td>
                    <td><button (click)="delete_std(item.std_id)" class="btn btn-danger">DELETE</button>
                    <button (click)="upda_std(item.std_id)" class="btn btn-warning ms-2">UPDATE</button>                
                </td>
                </tr>
        
            </tbody>
       
    </table>
    `,
    styles: []
})

export class StudentComponent implements OnInit{

    stud : Student = new Student(0,"","","")
    stud_list : Student[] = []
    is_update : boolean = false

    constructor(private api: MyServiceService){}

    ngOnInit(): void {
    this.get_student()
    
    }
form_submit() {
    this.api.add_std(this.stud).subscribe((data)=>{
        this.stud = new Student(0,"","","")
        this.get_student()
    })
}
get_student(){
    this.api.get_data().subscribe((data)=>{
        this.stud_list = data
    })
}
delete_std(id : number){
    this.api.delete_std(id).subscribe((data)=>{
       this.get_student()
    })
}
upda_std(id : number){
    this.api.get_by_id(id).subscribe((data)=>{
        this.stud = data
        this.is_update = true;
    })
}
cancel_upd(){
    this.stud = new Student(0,"","","")
    this.is_update = false
}
final_upd(){
    this.api.upd_std(this.stud).subscribe((data)=>{
        this.get_student()
        this.cancel_upd()
    })
}
}