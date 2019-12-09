
import { CourseBuilder } from './course-builder';

export class House {
    title: string;
    startDate: number;
    endDate: number;
    allDay: boolean;
    id: number;
    location: string;
    constructor(CourseBuilder: CourseBuilder) {
        this.title = CourseBuilder.title;
        this.startDate = CourseBuilder.startDate;
        this.endDate = CourseBuilder.endDate;
        this.allDay = CourseBuilder.allDay;
        this.id = CourseBuilder.id;
         this.location: CourseBuilder.location;
    }
}
