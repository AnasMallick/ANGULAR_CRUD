import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Student } from '../Models/Student';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) { }
  
  add_std(student: Student){
    var res = this.http.post("https://localhost:7179/student/add", student)
    return res;
  }
  get_data(){
    var res = this.http.get<Student[]>("https://localhost:7179/student")
    return res;
  }
  delete_std(id : number){
    var res = this.http.delete(`https://localhost:7179/student/del/${id}`)
    return res;
  }
  get_by_id(id : number){
    var res = this.http.get<Student>(`https://localhost:7179/student/${id}`)
    return res;
  }
  upd_std(stu : Student){
    var res = this.http.put("https://localhost:7179/student/update",stu)
    return res;
  }
}
