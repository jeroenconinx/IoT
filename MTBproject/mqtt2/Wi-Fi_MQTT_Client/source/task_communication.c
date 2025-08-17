#include "task_communication.h"



int target_x = 122;
int target_y = 92;

uint32_t pack_coordinates(int x, int y)
{
	uint32_t packed_coordinates = (x << 16) | y;
	return packed_coordinates;
}

void unpack_coordinate(uint32_t packed_coordinate, int *x, int *y)
{
	*x = (packed_coordinate >> 16) & 0xFFFF;
	*y = packed_coordinate & 0xFFFF;
}
