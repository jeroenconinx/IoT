

#ifndef SOURCE_SERVO_TASK_H_
#define SOURCE_SERVO_TASK_H_

#include "FreeRTOS.h"
#include "queue.h"

extern QueueHandle_t servo_angles_q;

typedef struct{
    int angle1;
    int angle2;
    int angle3;
} servo_angles_q_data_t;

void servo_task(void *pvParameters);



#endif /* SOURCE_SERVO_TASK_H_ */
