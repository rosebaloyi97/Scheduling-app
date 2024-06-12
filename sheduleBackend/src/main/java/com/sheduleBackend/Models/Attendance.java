package com.sheduleBackend.Models;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table
@Data
public class Attendance {
    @Id
    @GeneratedValue
    private  Long Id;
    @ManyToOne
    @JoinColumn(name="student_subject")
    private RegistrationSubject registrationSubject;
    private Date date;
    private String record;

    public  Attendance populateAttendance(RegistrationSubject reg ,String record){
        this.setDate(new Date());
        this.setRegistrationSubject(reg);
        this.setRecord(record);

        return this;
    }

}
