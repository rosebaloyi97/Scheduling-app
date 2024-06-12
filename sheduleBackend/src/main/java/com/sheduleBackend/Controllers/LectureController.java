package com.sheduleBackend.Controllers;


import com.sheduleBackend.Api.Response.CourseDetails;
import com.sheduleBackend.Api.Response.TimeSlotsResponse;
import com.sheduleBackend.BusinessServices.Interface.LecturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("/lecture")
public class LectureController {

    @Autowired
    private LecturerService lecturerService;

    @GetMapping("/timeTable/{id}")
    public ResponseEntity<List<TimeSlotsResponse>> getTimeTable(@PathVariable Long id) {
        List<TimeSlotsResponse> timeSlotsResponses = lecturerService.getTimeTable( id);
        if (timeSlotsResponses != null) {
            return new ResponseEntity<>(timeSlotsResponses, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
}
