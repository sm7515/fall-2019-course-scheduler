
import { Course } from './CourseData';

export class HouseBuilder {

    title: string;
    startDate: number;
    endDate: number;
    allDay: boolean;
    id: number;
    location: string;
  
  
    private _title: string;
    private _startDate: number = 0;
    private _endDate: number = 0;
    private _allDay: boolean = false;
    private _id: number = 0;
    private _location: string;

    constructor(title: string) {
        this._title = title;
    }

    setStartDate(startDate: number) {
        this._startDate = startDate;
        return this;
    }

    setEndDate(endDate: number) {
        this._endDate = endDate;
        return this;
    }

    setDay(allDay: boolean) {
        this._allDay = boolean;
        return this;
    }

    setId(id: number) {
        this._id = id;
        return this;
    }

    setLocal(location: string) {
        this._location = location;
    }

    build() {
        return new Course(this);
    }
    
    get startDate(){
      return this._startDate;
    }

    get endDate(){
      return this._endDate;
    }

    get location(){
      return this._allDay;
    }

    get Id(){
      return this._id;
    }

   

}
