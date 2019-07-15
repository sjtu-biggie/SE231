package com.se.activityservice;

import com.se.activityservice.entity.Activity;
import com.se.activityservice.entity.Progress;
import org.springframework.http.ResponseEntity;

public interface ActivityService {
    Activity postActivity(Activity Activity);

    Iterable<Activity> selectAll();

    Activity selectById(Long id);

    Iterable<Activity> selectByUserId(Long id);

    Iterable<Activity> selectByItemId(Long id);

    Activity selectByUserIdAndItemId(Long userId, Long itemId);

    Progress selectProgress(Long userId, Long itemId);

    ResponseEntity<?> deleteActivityById(Long id);

    ResponseEntity<?> deleteActivityByUserId(Long id);

    ResponseEntity<?> deleteActivityByItemId(Long id);

    Progress updateProgress(Progress progress);
}
