

#ifndef SOURCE_TASK_COMMUNICATION_H_
#define SOURCE_TASK_COMMUNICATION_H_


#include "FreeRTOS.h"
#include "queue.h"


extern uint32_t target_coordinate;
extern int target_x;
extern int target_y;



uint32_t pack_coordinates(int x, int y);
void unpack_coordinate(uint32_t packed_coordinate, int *x, int *y);


#endif /* SOURCE_TASK_COMMUNICATION_H_ */
